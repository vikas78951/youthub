Feature based folder structure with shared units

```text
app/                    → ONLY routing (Expo Router)
  (auth)/
  (employee)/
  (employer)/
  _layout.tsx

src/
  components/           → reusable UI components
  features/             → business logic by feature
    auth/
      api.ts
      schema.ts
      hooks.ts
      types.ts
    jobs/
    notifications/
    profile/
  store/                → Zustand or Redux
  services/             → axios setup, interceptors
  hooks/                → global hooks
  utils/                → helpers
  constants/
  theme/
```
