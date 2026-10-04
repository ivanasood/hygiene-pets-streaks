import type { AppState, Station } from '../types'

export const stations: Station[] = [
  { id: 'LAB-001', locationType: 'Laboratory', displayLabel: 'North Lab entrance', campusArea: 'Science block' },
  { id: 'DINING-004', locationType: 'Dining / Food Area', displayLabel: 'Commons dining hall', campusArea: 'Student commons' },
  { id: 'CLASS-012', locationType: 'Classroom', displayLabel: 'Room 204 corridor', campusArea: 'Learning center' },
  { id: 'WASH-008', locationType: 'Washroom', displayLabel: 'Library washroom', campusArea: 'Main library' },
]

const today = new Date().toISOString().slice(0, 10)
export const createInitialState = (): AppState => ({
  user: { displayName: 'Maya', level: 4, totalXp: 820, totalScans: 16, currentStreak: 6, longestStreak: 11, gems: 240, anonymousResearchId: 'RP-7F3K2' },
  pet: { name: 'Ripple', level: 4, xp: 820, xpToNext: 1000, health: 86, happiness: 92, state: 'Happy', evolutionStage: 'Tiny Sprite', cosmetics: ['Mint scarf', 'Aqua halo', 'Sun drop'], background: 'Ripple garden', selectedCosmetic: 'Mint scarf' },
  streak: { current: 6, longest: 11, activeDate: today, freezeCount: 1, milestones: [3, 7, 14, 30, 60] },
  events: [
    { id: 'evt-16', stationId: 'LAB-001', locationType: 'Laboratory', timestamp: new Date(Date.now() - 5040000).toISOString(), xpAwarded: 50, streakDay: 6, petHealthAfter: 86 },
    { id: 'evt-15', stationId: 'DINING-004', locationType: 'Dining / Food Area', timestamp: new Date(Date.now() - 17280000).toISOString(), xpAwarded: 50, streakDay: 6, petHealthAfter: 78 },
  ],
  rewards: [
    { id: 'reward-gems-01', type: 'gems', label: 'Gem bundle', quantity: 40, unlockRule: 'Reach a 7-day streak', description: 'A bright pocket of gems for your next pet studio visit.', unlocked: false, claimed: false },
    { id: 'reward-accessory-01', type: 'accessory', label: 'Mint scarf', quantity: 1, unlockRule: 'First week of care', description: 'A soft mint scarf for Ripple.', unlocked: true, claimed: false },
    { id: 'reward-background-01', type: 'background', label: 'Ripple garden', quantity: 1, unlockRule: 'Open a welcome box', description: 'A calm garden backdrop with tiny water rings.', unlocked: true, claimed: false },
    { id: 'reward-freeze-01', type: 'streak-freeze', label: 'Streak Freeze', quantity: 1, unlockRule: 'Reach a 14-day streak', description: 'Protect one active day when life gets busy.', unlocked: false, claimed: false },
    { id: 'reward-boost-01', type: 'xp-boost', label: 'Fresh-start boost', quantity: 1, unlockRule: 'Complete 10 hygiene events', description: 'Adds a little momentum to your next valid action.', unlocked: false, claimed: false },
  ],
  achievements: [
    { id: 'ach-1', title: 'First splash', description: 'Complete your first valid hygiene event.', progress: 1, target: 1, unlocked: true },
    { id: 'ach-2', title: 'Week in motion', description: 'Keep a 7-day streak.', progress: 6, target: 7, unlocked: false },
    { id: 'ach-3', title: 'Campus explorer', description: 'Visit all four location types.', progress: 4, target: 4, unlocked: true },
  ],
})
