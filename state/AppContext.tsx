import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createInitialState } from '../constants/demo'
import { claimReward, processScan, revealNext, syncEligibility } from '../services/rewards'
import type { AppState, Reward } from '../types'

const STATE_KEY = 'hygiene-pets-native-state-v1'
const SCAN_KEY = 'hygiene-pets-native-scans-v1'
type Context = { state: AppState; hydrated: boolean; feedback: string; busy: boolean; revealedReward: Reward | null; scan: (stationId: string) => Promise<boolean>; openReward: () => void; claim: (rewardId: string) => void; closeReward: () => void; selectCosmetic: (name: string) => void; reset: () => Promise<void> }
const AppStateContext = createContext<Context | null>(null)

export function AppProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AppState>(() => createInitialState())
  const [lastScanAt, setLastScanAt] = useState<Record<string, number>>({})
  const [hydrated, setHydrated] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [busy, setBusy] = useState(false)
  const [revealedReward, setRevealedReward] = useState<Reward | null>(null)
  useEffect(() => { (async () => { try { const [rawState, rawScans] = await Promise.all([AsyncStorage.getItem(STATE_KEY), AsyncStorage.getItem(SCAN_KEY)]); if (rawState) { const parsed = JSON.parse(rawState) as AppState; const seededCosmetics = createInitialState().pet.cosmetics; setState(syncEligibility({ ...parsed, pet: { ...parsed.pet, cosmetics: Array.from(new Set([...(parsed.pet.cosmetics ?? []), ...seededCosmetics])) } })) }; if (rawScans) setLastScanAt(JSON.parse(rawScans)) } finally { setHydrated(true) } })() }, [])
  useEffect(() => { if (hydrated) AsyncStorage.setItem(STATE_KEY, JSON.stringify(state)) }, [state, hydrated])
  useEffect(() => { if (hydrated) AsyncStorage.setItem(SCAN_KEY, JSON.stringify(lastScanAt)) }, [lastScanAt, hydrated])
  const scan = useCallback(async (stationId: string) => { setBusy(true); await new Promise((resolve) => setTimeout(resolve, 180)); const result = processScan(state, stationId, lastScanAt); setBusy(false); if (result.error) { setFeedback(result.error); return false } setState(result.state); setLastScanAt(result.lastScanAt ?? lastScanAt); setFeedback('Ripple feels refreshed · +50 XP'); return true }, [state, lastScanAt])
  const openReward = useCallback(() => { const reward = revealNext(state); setRevealedReward(reward); setFeedback(reward ? `Reward ready: ${reward.label}` : 'There are no rewards waiting yet.') }, [state])
  const claim = useCallback((rewardId: string) => { const result = claimReward(state, rewardId); if (!result.reward) { setFeedback('That reward is no longer available.'); return } setState(result.state); setRevealedReward(null); setFeedback('Reward added to your collection.') }, [state])
  const selectCosmetic = useCallback((name: string) => setState((current) => current.pet.cosmetics.includes(name) ? { ...current, pet: { ...current.pet, selectedCosmetic: name } } : current), [])
  const reset = useCallback(async () => { const next = createInitialState(); setState(next); setLastScanAt({}); setRevealedReward(null); setFeedback('Demo data reset. Your sanctuary is ready.'); await AsyncStorage.multiSet([[STATE_KEY, JSON.stringify(next)], [SCAN_KEY, '{}']]) }, [])
  const value = useMemo(() => ({ state, hydrated, feedback, busy, revealedReward, scan, openReward, claim, closeReward: () => setRevealedReward(null), selectCosmetic, reset }), [state, hydrated, feedback, busy, revealedReward, scan, openReward, claim, selectCosmetic, reset])
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}
export const useApp = () => { const context = useContext(AppStateContext); if (!context) throw new Error('useApp must be used inside AppProvider'); return context }
