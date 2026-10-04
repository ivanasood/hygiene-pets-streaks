# Hygiene Pets — Native Mobile App

This folder is the **plain-local Expo React Native implementation** of Hygiene Pets. The existing Vite web prototype remains at the repository root; this app is a real native mobile surface, not a WebView wrapper.

## Run on a laptop

```bash
cd mobile
npm install
npm start
```

For a deterministic web smoke test:

```bash
npm run web
# or
npx expo export --platform web
```

## Run on a physical Android phone

1. Install **Expo Go** from Google Play.
2. Connect the phone and laptop to the same network.
3. Run `npm start` inside `mobile/`.
4. Scan the terminal QR code with Expo Go.
5. Grant camera permission on the Scan tab to test native QR detection.
6. Use **Demo station entry** when no physical station QR is available.

The demo station IDs are `LAB-001`, `DINING-004`, `CLASS-012`, and `WASH-008`.

## Generate an Android APK

Install EAS CLI and sign in with an Expo account:

```bash
npm install --global eas-cli
eas login
eas build -p android --profile preview
```

The `preview` profile in `eas.json` produces an installable APK. For a store bundle, use the production profile:

```bash
eas build -p android --profile production
```

## Native features included

- Expo Router native bottom tabs: Home, Scan, Streak, Pet, Profile
- `expo-camera` QR/barcode scanning with permission handling
- Demo scanning through the same scan service as camera scans
- AsyncStorage persistence for XP, streaks, scan cooldowns, rewards, claims, gems, and Ripple cosmetics
- Deterministic reward reveal and one-time claim flow
- Native Modal reward reveal and native scrolling/touch targets
- Offline-first demo state with no backend or live telemetry claim
