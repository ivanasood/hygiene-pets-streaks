import { stations } from '../constants/demo'
import type { AppState, HygieneEvent, Reward } from '../types'

export const todayKey = () => new Date().toISOString().slice(0, 10)
export const syncEligibility = (state: AppState): AppState => {
  const rewards = state.rewards.map((reward) => ({ ...reward, unlocked: reward.claimed || reward.unlocked || (reward.type === 'gems' && state.streak.current >= 7) || (reward.type === 'streak-freeze' && state.streak.current >= 14) || (reward.type === 'xp-boost' && state.user.totalScans >= 10) }))
  const achievements = state.achievements.map((item) => item.id === 'ach-2' ? { ...item, progress: Math.min(item.target, state.streak.current), unlocked: state.streak.current >= item.target } : item)
  return { ...state, rewards, achievements }
}

export const processScan = (state: AppState, stationId: string, lastScanAt: Record<string, number>) => {
  const station = stations.find((item) => item.id === stationId.trim().toUpperCase())
  if (!station) return { state, error: 'That station ID is not recognized in demo mode.' }
  const key = `${state.user.anonymousResearchId}:${station.id}`
  if (lastScanAt[key] && Date.now() - lastScanAt[key] < 90000) return { state, error: 'That station was just scanned. Try another station or wait a moment.' }
  const today = todayKey()
  const alreadyToday = state.events.some((event) => event.timestamp.slice(0, 10) === today)
  const nextStreak = alreadyToday ? state.streak.current : state.streak.current + 1
  const nextHealth = Math.min(100, state.pet.health + 8)
  const event: HygieneEvent = { id: `evt-${Date.now()}`, stationId: station.id, locationType: station.locationType, timestamp: new Date().toISOString(), xpAwarded: 50, streakDay: nextStreak, petHealthAfter: nextHealth }
  const next: AppState = syncEligibility({ ...state, user: { ...state.user, totalXp: state.user.totalXp + 50, totalScans: state.user.totalScans + 1, currentStreak: nextStreak, longestStreak: Math.max(state.user.longestStreak, nextStreak) }, pet: { ...state.pet, xp: state.pet.xp + 50, health: nextHealth, happiness: Math.min(100, state.pet.happiness + 2), state: 'Happy' }, streak: { ...state.streak, current: nextStreak, longest: Math.max(state.streak.longest, nextStreak), activeDate: today }, events: [event, ...state.events] })
  return { state: next, event, station, lastScanAt: { ...lastScanAt, [key]: Date.now() } }
}

export const revealNext = (state: AppState): Reward | null => syncEligibility(state).rewards.find((reward) => reward.unlocked && !reward.claimed) ?? null
export const claimReward = (state: AppState, rewardId: string) => {
  const synced = syncEligibility(state)
  const reward = synced.rewards.find((item) => item.id === rewardId && item.unlocked && !item.claimed)
  if (!reward) return { state: synced, reward: null }
  const rewards = synced.rewards.map((item) => item.id === rewardId ? { ...item, claimed: true } : item)
  const user = reward.type === 'gems' ? { ...synced.user, gems: synced.user.gems + reward.quantity } : synced.user
  const pet = reward.type === 'accessory' && !synced.pet.cosmetics.includes(reward.label) ? { ...synced.pet, cosmetics: [...synced.pet.cosmetics, reward.label], selectedCosmetic: reward.label } : synced.pet
  const streak = reward.type === 'streak-freeze' ? { ...synced.streak, freezeCount: synced.streak.freezeCount + reward.quantity } : synced.streak
  return { state: { ...synced, rewards, user, pet, streak }, reward }
}
