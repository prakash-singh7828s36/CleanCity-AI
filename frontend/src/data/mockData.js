// Roles
export const ROLE_LABELS = {
  citizen: "Citizen",
  nagarnigam: "Nagar Nigam",
  driver: "Driver",
  admin: "Admin",
};

// Bins
export const MOCK_BINS = [
  { id: "B-001", code: "HZ-12", address: "Hazratganj Main Rd", lat: 26.852, lng: 80.946, fillLevel: 92, predictionHours: 1, type: "general" },
  { id: "B-002", code: "GM-04", address: "Gomti Nagar Sector 4", lat: 26.860, lng: 80.998, fillLevel: 47, predictionHours: 6, type: "organic" },
  { id: "B-003", code: "AL-18", address: "Aliganj Block C", lat: 26.892, lng: 80.948, fillLevel: 78, predictionHours: 2, type: "general" },
  { id: "B-004", code: "IN-09", address: "Indira Nagar A-Block", lat: 26.873, lng: 80.998, fillLevel: 23, predictionHours: 12, type: "recyclable" },
  { id: "B-005", code: "CK-02", address: "Chowk Bazaar", lat: 26.871, lng: 80.910, fillLevel: 65, predictionHours: 4, type: "general" },
  { id: "B-006", code: "JN-21", address: "Jankipuram Garden", lat: 26.911, lng: 80.945, fillLevel: 12, predictionHours: 18, type: "organic" },
  { id: "B-007", code: "AM-07", address: "Aminabad Market", lat: 26.846, lng: 80.918, fillLevel: 88, predictionHours: 1, type: "general" },
  { id: "B-008", code: "RJ-15", address: "Rajajipuram Road", lat: 26.838, lng: 80.880, fillLevel: 34, predictionHours: 9, type: "recyclable" },
];

// Reports
export const MOCK_REPORTS = [
  { id: "R-1041", user: "Ananya R.", location: "Hazratganj", description: "Pile of plastic near bus stop", status: "in_progress", date: "2h ago", points: 25 },
  { id: "R-1040", user: "Rohan K.", location: "Gomti Nagar", description: "Overflowing bin near park gate", status: "resolved", date: "5h ago", points: 30 },
  { id: "R-1039", user: "Priya S.", location: "Aliganj", description: "Construction debris on sidewalk", status: "pending", date: "1d ago", points: 20 },
  { id: "R-1038", user: "Vikram J.", location: "Chowk", description: "Wet waste outside dustbin", status: "resolved", date: "1d ago", points: 15 },
];

// Leaderboard
export const LEADERBOARD = [
  { rank: 1, name: "Ananya Rao", points: 2840, reports: 47, badge: "gold" },
  { rank: 2, name: "Rohan Kapoor", points: 2410, reports: 39, badge: "silver" },
  { rank: 3, name: "Priya Sharma", points: 2180, reports: 35, badge: "bronze" },
  { rank: 4, name: "Vikram Joshi", points: 1920, reports: 31, badge: "eco" },
  { rank: 5, name: "Meera Iyer", points: 1640, reports: 27, badge: "eco" },
  { rank: 6, name: "Arjun Verma", points: 1480, reports: 24, badge: "eco" },
  { rank: 7, name: "You", points: 1320, reports: 21, badge: "eco" },
];

// Drivers
export const DRIVERS = [
  { id: "D-01", name: "Suresh Yadav", vehicle: "UP-32-AB-4521", status: "active", binsAssigned: 8, completed: 5 },
  { id: "D-02", name: "Mahesh Singh", vehicle: "UP-32-CD-7812", status: "active", binsAssigned: 6, completed: 6 },
  { id: "D-03", name: "Ramesh Kumar", vehicle: "UP-32-EF-3390", status: "idle", binsAssigned: 0, completed: 0 },
  { id: "D-04", name: "Dinesh Pal", vehicle: "UP-32-GH-1145", status: "offline", binsAssigned: 0, completed: 0 },
];

// Driver Route
export const DRIVER_ROUTE = [
  { binId: "B-007", code: "AM-07", address: "Aminabad Market", fillLevel: 88, status: "completed", eta: "Done" },
  { binId: "B-001", code: "HZ-12", address: "Hazratganj Main Rd", fillLevel: 92, status: "completed", eta: "Done" },
  { binId: "B-003", code: "AL-18", address: "Aliganj Block C", fillLevel: 78, status: "pending", eta: "8 min" },
  { binId: "B-005", code: "CK-02", address: "Chowk Bazaar", fillLevel: 65, status: "pending", eta: "15 min" },
  { binId: "B-002", code: "GM-04", address: "Gomti Nagar Sector 4", fillLevel: 47, status: "pending", eta: "22 min" },
];

// Charts
export const ANALYTICS_WEEK = [
  { day: "Mon", collected: 1240, reported: 86 },
  { day: "Tue", collected: 1380, reported: 92 },
  { day: "Wed", collected: 1190, reported: 74 },
  { day: "Thu", collected: 1520, reported: 108 },
  { day: "Fri", collected: 1680, reported: 124 },
  { day: "Sat", collected: 1410, reported: 98 },
  { day: "Sun", collected: 1290, reported: 82 },
];

export const WASTE_BREAKDOWN = [
  { name: "Organic", value: 42, color: "hsl(152 76% 45%)" },
  { name: "Plastic", value: 28, color: "hsl(188 85% 50%)" },
  { name: "Paper", value: 18, color: "hsl(42 100% 55%)" },
  { name: "Mixed", value: 12, color: "hsl(22 95% 55%)" },
];