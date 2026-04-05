import { useQuery } from '@tanstack/react-query';

// ── USGS Live Earthquake Feed ──
export interface USGSFeature {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    url: string;
    title: string;
    alert: string | null;
    tsunami: number;
  };
  geometry: {
    coordinates: [number, number, number]; // lng, lat, depth
  };
}

export interface USGSResponse {
  type: string;
  metadata: { generated: number; count: number; title: string };
  features: USGSFeature[];
}

export function useLiveEarthquakes() {
  return useQuery<USGSFeature[]>({
    queryKey: ['earthquakes'],
    queryFn: async () => {
      const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');
      if (!res.ok) throw new Error('USGS API error');
      const data: USGSResponse = await res.json();
      return data.features.sort((a, b) => b.properties.time - a.properties.time);
    },
    refetchInterval: 60000, // every 60s
    staleTime: 30000,
  });
}

export function useLiveSignificantQuakes() {
  return useQuery<USGSFeature[]>({
    queryKey: ['significant-quakes'],
    queryFn: async () => {
      const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson');
      if (!res.ok) throw new Error('USGS API error');
      const data: USGSResponse = await res.json();
      return data.features.sort((a, b) => b.properties.time - a.properties.time);
    },
    refetchInterval: 300000,
    staleTime: 120000,
  });
}

// ── Live News via RSS-to-JSON proxy ──
export interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  source?: string;
}

// We'll use multiple free RSS feeds via a public CORS proxy
const RSS_FEEDS = [
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', source: 'BBC World' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', source: 'NY Times' },
];

export interface LiveNewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: Date;
  source: string;
  description: string;
}

async function fetchRSSFeed(feedUrl: string, source: string): Promise<LiveNewsItem[]> {
  try {
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
    const res = await fetch(proxyUrl);
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== 'ok') return [];
    return (data.items || []).slice(0, 8).map((item: any, i: number) => ({
      id: `${source}-${i}`,
      title: item.title || '',
      link: item.link || '',
      pubDate: new Date(item.pubDate || Date.now()),
      source,
      description: (item.description || '').replace(/<[^>]*>/g, '').slice(0, 200),
    }));
  } catch {
    return [];
  }
}

export function useLiveNews() {
  return useQuery<LiveNewsItem[]>({
    queryKey: ['live-news'],
    queryFn: async () => {
      const results = await Promise.allSettled(
        RSS_FEEDS.map(f => fetchRSSFeed(f.url, f.source))
      );
      const allItems: LiveNewsItem[] = [];
      for (const r of results) {
        if (r.status === 'fulfilled') allItems.push(...r.value);
      }
      return allItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
    },
    refetchInterval: 120000,
    staleTime: 60000,
  });
}
