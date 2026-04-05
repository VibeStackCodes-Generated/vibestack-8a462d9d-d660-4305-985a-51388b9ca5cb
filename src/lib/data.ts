export interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: 'geopolitical' | 'military' | 'economic' | 'cyber' | 'disaster' | 'infrastructure';
  severity: 'critical' | 'high' | 'medium' | 'low';
  region: string;
  timestamp: Date;
  summary: string;
  aiAnalysis?: string;
}

export interface ThreatEvent {
  id: string;
  type: string;
  location: string;
  lat: number;
  lng: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  timestamp: Date;
}

export interface MarketData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface CountryRisk {
  country: string;
  code: string;
  score: number;
  trend: 'rising' | 'stable' | 'declining';
  factors: string[];
}

export interface CyberThreat {
  id: string;
  type: string;
  target: string;
  origin: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'mitigated' | 'investigating';
  timestamp: Date;
}

export interface SeismicEvent {
  id: string;
  magnitude: number;
  location: string;
  depth: number;
  lat: number;
  lng: number;
  timestamp: Date;
}

export interface MilitaryActivity {
  id: string;
  type: string;
  region: string;
  description: string;
  forces: string;
  timestamp: Date;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export const newsItems: NewsItem[] = [
  {
    id: 'n1',
    title: 'NATO Increases Baltic Air Patrols Amid Rising Tensions',
    source: 'Reuters',
    category: 'military',
    severity: 'high',
    region: 'Europe',
    timestamp: new Date(Date.now() - 12 * 60000),
    summary: 'NATO has deployed additional fighter jets to patrol Baltic airspace following multiple incursions detected over the past 72 hours.',
    aiAnalysis: 'Pattern consistent with escalatory posturing. 78% probability of continued provocations over next 14 days.'
  },
  {
    id: 'n2',
    title: 'Major Undersea Cable Disruption in Red Sea Corridor',
    source: 'Bloomberg',
    category: 'infrastructure',
    severity: 'critical',
    region: 'Middle East',
    timestamp: new Date(Date.now() - 28 * 60000),
    summary: 'Three undersea fiber optic cables in the Red Sea have been severed, disrupting 25% of data traffic between Europe and Asia.',
    aiAnalysis: 'Infrastructure vulnerability assessment: HIGH. Estimated repair timeline 4-6 weeks. Rerouting capacity at 68%.'
  },
  {
    id: 'n3',
    title: 'South China Sea: Philippine Coast Guard Reports Laser Incident',
    source: 'AP News',
    category: 'geopolitical',
    severity: 'high',
    region: 'Asia-Pacific',
    timestamp: new Date(Date.now() - 45 * 60000),
    summary: 'Philippine Coast Guard vessel reports military-grade laser directed at crew near Second Thomas Shoal.',
    aiAnalysis: 'Escalation index: 7.2/10. Similar incidents have preceded diplomatic deterioration in 82% of historical cases.'
  },
  {
    id: 'n4',
    title: 'Central Bank of Turkey Emergency Rate Decision',
    source: 'Financial Times',
    category: 'economic',
    severity: 'medium',
    region: 'Middle East',
    timestamp: new Date(Date.now() - 67 * 60000),
    summary: 'CBRT announces emergency 500bp rate hike to defend lira amid capital flight concerns.',
    aiAnalysis: 'Currency stabilization probability: 45%. Contagion risk to emerging markets: MODERATE.'
  },
  {
    id: 'n5',
    title: 'Ransomware Attack Targets European Energy Grid Operator',
    source: 'CyberScoop',
    category: 'cyber',
    severity: 'critical',
    region: 'Europe',
    timestamp: new Date(Date.now() - 95 * 60000),
    summary: 'Major European grid operator confirms ransomware breach affecting SCADA systems across 3 countries.',
    aiAnalysis: 'Attack signature matches APT-41 variant. Critical infrastructure impact: HIGH. Estimated recovery: 48-72 hours.'
  },
  {
    id: 'n6',
    title: 'M7.1 Earthquake Strikes Off Coast of Papua New Guinea',
    source: 'USGS',
    category: 'disaster',
    severity: 'high',
    region: 'Asia-Pacific',
    timestamp: new Date(Date.now() - 120 * 60000),
    summary: 'Magnitude 7.1 earthquake recorded at 35km depth. Tsunami advisory issued for coastal regions.',
    aiAnalysis: 'Aftershock probability M5+: 85% within 24hrs. Tsunami risk: LOW based on depth and focal mechanism.'
  },
  {
    id: 'n7',
    title: 'Wagner Group Expands Operations in Sahel Region',
    source: 'BBC',
    category: 'military',
    severity: 'medium',
    region: 'Africa',
    timestamp: new Date(Date.now() - 180 * 60000),
    summary: 'Satellite imagery confirms new Wagner Group base construction in northern Mali, expanding operational footprint.',
    aiAnalysis: 'Force projection capability increasing. Regional destabilization index: 6.8/10.'
  },
  {
    id: 'n8',
    title: 'Arctic Shipping Route Opens 3 Weeks Early Due to Ice Melt',
    source: 'Nature',
    category: 'infrastructure',
    severity: 'medium',
    region: 'Arctic',
    timestamp: new Date(Date.now() - 240 * 60000),
    summary: 'Northern Sea Route navigable earlier than any recorded year, with geopolitical implications for Arctic sovereignty.',
    aiAnalysis: 'Strategic shipping corridor competition intensifying. Russia/China joint Arctic exercises likely within 30 days.'
  },
  {
    id: 'n9',
    title: 'Taiwan Strait: Unusual PLA Naval Deployment Detected',
    source: 'OSINT Analysts',
    category: 'military',
    severity: 'critical',
    region: 'Asia-Pacific',
    timestamp: new Date(Date.now() - 8 * 60000),
    summary: 'Commercial satellite imagery reveals 12+ PLAN vessels including 2 carriers conducting exercises east of Taiwan.',
    aiAnalysis: 'Deployment scale exceeds routine exercises by 340%. Cross-strait tension index: 8.9/10. WATCHLIST PRIORITY.'
  },
  {
    id: 'n10',
    title: 'Global Semiconductor Supply Chain Alert: TSMC Fab Disruption',
    source: 'Nikkei Asia',
    category: 'economic',
    severity: 'high',
    region: 'Asia-Pacific',
    timestamp: new Date(Date.now() - 155 * 60000),
    summary: 'Power grid instability forces temporary shutdown of TSMC advanced node fabrication facility in Tainan.',
    aiAnalysis: 'Supply chain impact: 3-5% reduction in global advanced chip output. Cascading effects expected in 2-4 weeks.'
  }
];

export const threatEvents: ThreatEvent[] = [
  { id: 't1', type: 'Military', location: 'Baltic Sea', lat: 57.5, lng: 20.0, severity: 'high', description: 'NATO air patrol escalation', timestamp: new Date(Date.now() - 12 * 60000) },
  { id: 't2', type: 'Infrastructure', location: 'Red Sea', lat: 14.5, lng: 42.0, severity: 'critical', description: 'Undersea cable disruption', timestamp: new Date(Date.now() - 28 * 60000) },
  { id: 't3', type: 'Maritime', location: 'South China Sea', lat: 9.8, lng: 115.8, severity: 'high', description: 'Naval confrontation', timestamp: new Date(Date.now() - 45 * 60000) },
  { id: 't4', type: 'Cyber', location: 'Central Europe', lat: 50.1, lng: 14.4, severity: 'critical', description: 'Energy grid ransomware', timestamp: new Date(Date.now() - 95 * 60000) },
  { id: 't5', type: 'Seismic', location: 'Papua New Guinea', lat: -5.5, lng: 151.0, severity: 'high', description: 'M7.1 Earthquake', timestamp: new Date(Date.now() - 120 * 60000) },
  { id: 't6', type: 'Military', location: 'Taiwan Strait', lat: 24.0, lng: 121.5, severity: 'critical', description: 'PLA naval deployment', timestamp: new Date(Date.now() - 8 * 60000) },
  { id: 't7', type: 'Conflict', location: 'Sahel Region', lat: 17.0, lng: -1.0, severity: 'medium', description: 'Wagner Group expansion', timestamp: new Date(Date.now() - 180 * 60000) },
  { id: 't8', type: 'Geopolitical', location: 'Arctic', lat: 72.0, lng: 40.0, severity: 'medium', description: 'Arctic route competition', timestamp: new Date(Date.now() - 240 * 60000) },
  { id: 't9', type: 'Military', location: 'Eastern Ukraine', lat: 48.5, lng: 37.5, severity: 'critical', description: 'Active combat operations', timestamp: new Date(Date.now() - 5 * 60000) },
  { id: 't10', type: 'Terrorism', location: 'Horn of Africa', lat: 2.0, lng: 45.3, severity: 'high', description: 'Al-Shabaab offensive', timestamp: new Date(Date.now() - 300 * 60000) },
  { id: 't11', type: 'Nuclear', location: 'Korean Peninsula', lat: 39.0, lng: 125.7, severity: 'medium', description: 'DPRK missile test prep', timestamp: new Date(Date.now() - 360 * 60000) },
  { id: 't12', type: 'Civil Unrest', location: 'Venezuela', lat: 10.5, lng: -66.9, severity: 'medium', description: 'Anti-government protests', timestamp: new Date(Date.now() - 420 * 60000) }
];

export const marketData: MarketData[] = [
  { symbol: 'DXY', name: 'US Dollar Index', value: 104.82, change: 0.34, changePercent: 0.32 },
  { symbol: 'GOLD', name: 'Gold Spot', value: 2387.40, change: 18.60, changePercent: 0.78 },
  { symbol: 'OIL', name: 'Brent Crude', value: 82.15, change: -1.23, changePercent: -1.48 },
  { symbol: 'BTC', name: 'Bitcoin', value: 67842.00, change: -1250.00, changePercent: -1.81 },
  { symbol: 'VIX', name: 'Volatility Index', value: 18.42, change: 2.15, changePercent: 13.21 },
  { symbol: 'TNX', name: '10Y Treasury', value: 4.52, change: 0.08, changePercent: 1.80 },
  { symbol: 'USDCNY', name: 'USD/CNY', value: 7.2485, change: 0.0125, changePercent: 0.17 },
  { symbol: 'WHEAT', name: 'Wheat Futures', value: 612.50, change: 8.75, changePercent: 1.45 },
  { symbol: 'USDRUB', name: 'USD/RUB', value: 92.45, change: 1.82, changePercent: 2.01 },
  { symbol: 'NG', name: 'Natural Gas', value: 2.84, change: 0.12, changePercent: 4.41 }
];

export const countryRisks: CountryRisk[] = [
  { country: 'Ukraine', code: 'UA', score: 9.4, trend: 'stable', factors: ['Active conflict', 'Infrastructure damage', 'Refugee crisis'] },
  { country: 'Taiwan', code: 'TW', score: 8.1, trend: 'rising', factors: ['Military escalation', 'Supply chain risk', 'Diplomatic tensions'] },
  { country: 'Israel', code: 'IL', score: 8.7, trend: 'rising', factors: ['Regional conflict', 'Humanitarian crisis', 'Escalation risk'] },
  { country: 'Myanmar', code: 'MM', score: 8.2, trend: 'rising', factors: ['Civil war', 'Humanitarian emergency', 'State collapse risk'] },
  { country: 'Sudan', code: 'SD', score: 8.9, trend: 'rising', factors: ['Civil war', 'Famine risk', 'Displacement crisis'] },
  { country: 'Iran', code: 'IR', score: 7.6, trend: 'rising', factors: ['Nuclear program', 'Proxy conflicts', 'Sanctions pressure'] },
  { country: 'North Korea', code: 'KP', score: 7.8, trend: 'stable', factors: ['Nuclear threats', 'Missile tests', 'Regime instability'] },
  { country: 'Venezuela', code: 'VE', score: 6.9, trend: 'rising', factors: ['Political crisis', 'Economic collapse', 'Migration'] },
  { country: 'Somalia', code: 'SO', score: 7.5, trend: 'stable', factors: ['Al-Shabaab', 'State fragility', 'Climate stress'] },
  { country: 'Mali', code: 'ML', score: 7.1, trend: 'rising', factors: ['Wagner presence', 'Jihadist groups', 'Coup instability'] }
];

export const cyberThreats: CyberThreat[] = [
  { id: 'c1', type: 'Ransomware', target: 'EU Energy Grid (ENTSO-E)', origin: 'APT-41 (China)', severity: 'critical', status: 'active', timestamp: new Date(Date.now() - 95 * 60000) },
  { id: 'c2', type: 'DDoS', target: 'Baltic Banking Infrastructure', origin: 'Sandworm (Russia)', severity: 'high', status: 'mitigated', timestamp: new Date(Date.now() - 180 * 60000) },
  { id: 'c3', type: 'Supply Chain', target: 'npm Registry Packages', origin: 'Lazarus Group (DPRK)', severity: 'high', status: 'investigating', timestamp: new Date(Date.now() - 45 * 60000) },
  { id: 'c4', type: 'Espionage', target: 'US Defense Contractors', origin: 'Cozy Bear (Russia)', severity: 'critical', status: 'investigating', timestamp: new Date(Date.now() - 320 * 60000) },
  { id: 'c5', type: 'Wiper Malware', target: 'Ukrainian Telecom', origin: 'Sandworm (Russia)', severity: 'high', status: 'active', timestamp: new Date(Date.now() - 60 * 60000) },
  { id: 'c6', type: 'Phishing', target: 'NATO Personnel', origin: 'Fancy Bear (Russia)', severity: 'medium', status: 'mitigated', timestamp: new Date(Date.now() - 480 * 60000) }
];

export const seismicEvents: SeismicEvent[] = [
  { id: 's1', magnitude: 7.1, location: 'Papua New Guinea', depth: 35, lat: -5.5, lng: 151.0, timestamp: new Date(Date.now() - 120 * 60000) },
  { id: 's2', magnitude: 5.4, location: 'Central Turkey', depth: 12, lat: 38.7, lng: 35.5, timestamp: new Date(Date.now() - 340 * 60000) },
  { id: 's3', magnitude: 4.8, location: 'Southern California', depth: 8, lat: 33.9, lng: -118.2, timestamp: new Date(Date.now() - 560 * 60000) },
  { id: 's4', magnitude: 6.2, location: 'Tonga Islands', depth: 180, lat: -21.2, lng: -175.4, timestamp: new Date(Date.now() - 720 * 60000) },
  { id: 's5', magnitude: 5.1, location: 'Northern Japan', depth: 45, lat: 39.7, lng: 142.3, timestamp: new Date(Date.now() - 900 * 60000) }
];

export const militaryActivities: MilitaryActivity[] = [
  { id: 'm1', type: 'Naval Deployment', region: 'Taiwan Strait', description: '12+ PLAN vessels including 2 carriers conducting exercises', forces: 'PLA Navy', timestamp: new Date(Date.now() - 8 * 60000), severity: 'critical' },
  { id: 'm2', type: 'Air Patrol', region: 'Baltic Sea', description: 'NATO F-35 and Eurofighter patrols increased to 24/7', forces: 'NATO Air Forces', timestamp: new Date(Date.now() - 12 * 60000), severity: 'high' },
  { id: 'm3', type: 'Ground Offensive', region: 'Eastern Ukraine', description: 'Mechanized brigade advance near Avdiivka sector', forces: 'Russian Armed Forces', timestamp: new Date(Date.now() - 5 * 60000), severity: 'critical' },
  { id: 'm4', type: 'Missile Test', region: 'Sea of Japan', description: 'DPRK ballistic missile launch preparation detected via satellite', forces: 'KPA Strategic Force', timestamp: new Date(Date.now() - 360 * 60000), severity: 'high' },
  { id: 'm5', type: 'Base Construction', region: 'Northern Mali', description: 'New Wagner Group forward operating base identified', forces: 'Wagner PMC', timestamp: new Date(Date.now() - 180 * 60000), severity: 'medium' },
  { id: 'm6', type: 'Naval Exercise', region: 'South China Sea', description: 'Joint US-Philippines freedom of navigation operation', forces: 'US Navy / Philippine Navy', timestamp: new Date(Date.now() - 72 * 60000), severity: 'medium' }
];

export const globalStats = {
  activeConflicts: 34,
  watchlistCountries: 47,
  cyberIncidents24h: 1247,
  seismicEvents24h: 89,
  activeAlerts: 12,
  dataSourcesOnline: 342,
  aiConfidence: 94.2,
  lastUpdate: new Date()
};

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return seconds + 's ago';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + 'm ago';
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + 'h ago';
  return Math.floor(hours / 24) + 'd ago';
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical': return 'text-red-400';
    case 'high': return 'text-amber-400';
    case 'medium': return 'text-yellow-300';
    case 'low': return 'text-emerald-400';
    default: return 'text-slate-400';
  }
}

export function getSeverityBg(severity: string): string {
  switch (severity) {
    case 'critical': return 'bg-red-500/15 border-red-500/30 text-red-400';
    case 'high': return 'bg-amber-500/15 border-amber-500/30 text-amber-400';
    case 'medium': return 'bg-yellow-500/15 border-yellow-500/30 text-yellow-300';
    case 'low': return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400';
    default: return 'bg-slate-500/15 border-slate-500/30 text-slate-400';
  }
}

export function getCategoryIcon(category: string): string {
  switch (category) {
    case 'geopolitical': return '🌐';
    case 'military': return '⚔️';
    case 'economic': return '📊';
    case 'cyber': return '🛡️';
    case 'disaster': return '🌋';
    case 'infrastructure': return '🏗️';
    default: return '📰';
  }
}
