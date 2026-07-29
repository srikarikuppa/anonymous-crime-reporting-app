export const CRIME_CATEGORIES = [
  { id: 'cyber', label: 'Cybercrime & Online Fraud', icon: 'ShieldAlert', color: 'from-blue-500 to-cyan-400' },
  { id: 'theft', label: 'Theft, Robbery & Burglary', icon: 'ShoppingBag', color: 'from-amber-500 to-yellow-400' },
  { id: 'assault', label: 'Physical Assault & Violence', icon: 'AlertTriangle', color: 'from-red-600 to-rose-500' },
  { id: 'harassment', label: 'Harassment & Stalking', icon: 'EyeOff', color: 'from-purple-500 to-pink-500' },
  { id: 'vandalism', label: 'Vandalism & Property Damage', icon: 'Flame', color: 'from-orange-500 to-amber-500' },
  { id: 'narcotics', label: 'Illicit Narcotics & Trafficking', icon: 'Skull', color: 'from-emerald-500 to-teal-400' },
  { id: 'corruption', label: 'Bribery & Public Corruption', icon: 'Briefcase', color: 'from-slate-400 to-zinc-300' },
  { id: 'other', label: 'Other Illegal Activity', icon: 'HelpCircle', color: 'from-cyan-500 to-blue-600' }
];

export const STATES = [
  { id: 'MH', name: 'Maharashtra', districts: ['Mumbai City', 'Mumbai Suburban', 'Pune', 'Nagpur', 'Thane', 'Nashik'] },
  { id: 'DL', name: 'Delhi NCR', districts: ['Central Delhi', 'New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'] },
  { id: 'KA', name: 'Karnataka', districts: ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Mangaluru', 'Hubballi-Dharwad'] },
  { id: 'UP', name: 'Uttar Pradesh', districts: ['Rampur', 'Lakhimpur Kheri', 'Lucknow', 'Kanpur', 'Noida / Gautam Buddha Nagar', 'Varanasi'] },
  { id: 'TN', name: 'Tamil Nadu', districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'] },
  { id: 'WB', name: 'West Bengal', districts: ['Kolkata', 'Howrah', 'North 24 Parganas', 'Darjeeling'] },
  { id: 'GJ', name: 'Gujarat', districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'] }
];

export const PRESET_EVIDENCE = [
  {
    id: 'ev-1',
    name: 'CCTV_Camera_Sec12_Snapshot.jpg',
    size: '2.4 MB',
    type: 'image',
    originalExif: { camera: 'Hikvision DS-2CD2043G2', gps: '19.0760° N, 72.8777° E', timestamp: '2026-07-29 23:14:02 IST' },
    status: 'Scrubbed',
    scrubbedTime: '0.4s'
  },
  {
    id: 'ev-2',
    name: 'Audio_Recording_Threat_Call.wav',
    size: '4.8 MB',
    type: 'audio',
    originalExif: { device: 'iPhone 15 Pro', codec: 'AAC-LC', timestamp: '2026-07-29 23:40:11 IST' },
    status: 'Scrubbed',
    scrubbedTime: '0.3s'
  }
];

export const AUTHORITIES_MAP = {
  high: [
    { name: 'District Police Headquarters - Rapid Response Cell', contact: 'Emergency 112 / 100', status: 'Priority Dispatch Active' },
    { name: 'Special Anti-Crime & Cyber Investigation Unit', contact: 'cyber-cell@police.gov.in', status: 'Routing Prepared' },
    { name: 'District Magistrate & Emergency Control Room', contact: '022-22026100', status: 'Notified' }
  ],
  medium: [
    { name: 'Rampur Local Police Station (Sector 4 Jurisdiction)', contact: '0595-2321455', status: 'Ready for Review' },
    { name: 'Regional Crime Records Bureau (RCRB)', contact: 'rcrb@statepolice.gov.in', status: 'Log Queued' }
  ],
  low: [
    { name: 'Municipal Public Safety & Civic Enforcement Office', contact: 'civic-complaints@city.gov.in', status: 'Non-Emergency Queue' },
    { name: 'Community Beat Officer Desk', contact: 'beat-office@city.gov.in', status: 'Assigned' }
  ]
};
