export type LocationType = 'Classroom' | 'Laboratory' | 'Dining / Food Area' | 'Washroom'
export type RewardType = 'gems' | 'accessory' | 'background' | 'streak-freeze' | 'xp-boost'
export type PetState = 'Happy' | 'Healthy' | 'Needs Attention' | 'Low Health'

export type Station = { id: string; locationType: LocationType; displayLabel: string; campusArea: string }
export type HygieneEvent = { id: string; stationId: string; locationType: LocationType; timestamp: string; xpAwarded: number; streakDay: number; petHealthAfter: number }
export type Reward = { id: string; type: RewardType; label: string; quantity: number; unlockRule: string; description: string; unlocked: boolean; claimed: boolean }
export type Achievement = { id: string; title: string; description: string; progress: number; target: number; unlocked: boolean }
export type User = { displayName: string; level: number; totalXp: number; totalScans: number; currentStreak: number; longestStreak: number; gems: number; anonymousResearchId: string }
export type Pet = { name: string; level: number; xp: number; xpToNext: number; health: number; happiness: number; state: PetState; evolutionStage: string; cosmetics: string[]; background: string; selectedCosmetic: string }
export type Streak = { current: number; longest: number; activeDate: string; freezeCount: number; milestones: number[] }
export type AppState = { user: User; pet: Pet; streak: Streak; events: HygieneEvent[]; rewards: Reward[]; achievements: Achievement[] }
