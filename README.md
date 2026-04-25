# Colony Connect Mobile Architecture

## 1. Platform Decision
Chosen platform: **React Native (TypeScript)**.

Why this choice:
- Scalability: single codebase for Android + iOS with mature ecosystem (React Navigation, React Query, Firebase, Socket.IO).
- Performance: optimized lists (`FlatList` tuning), native modules for secure storage and push, and selective rendering with feature-level state slices.
- Developer productivity: faster hiring/onboarding, reusable JS/TS talent, rapid iteration and shared business logic for optional web/admin surfaces.

## 2. Roles Supported
- Resident
- Colony Admin
- Supervisor
- Worker
- Vendor
- Local Authority (limited mobile access)
- Super Admin (recommended web-only)

Role-aware rendering is implemented in tab/navigation access and announcement/admin controls.

## 3. Core Modules Implemented
- Authentication & User Management: OTP request/verify, multi-colony selection, profile screen, role-based routes.
- Community Feed (high priority): post composer, reactions, poll rendering, service-request tag, infinite scroll query.
- Grievance Management: create grievance, dashboard with status/SLA, grievance-linked chat entry point.
- Announcements: resident view + admin broadcast button placeholder, read status marker, RSVP note.
- Local Directory: vendor/worker listing, search/filter, chat handoff.
- Real-time Chat (critical): 1-to-1 chat, grievance/service context, text/image-ready API model, typing indicators, read markers.
- Notifications: in-app center and priority labels.

## 4. Architecture
Approach: **Feature-Based Clean Architecture**.

Layers:
- `features/*`: UI screens/components + feature orchestration.
- `services/api/*`: network clients and domain APIs.
- `services/realtime/*`: Socket.IO connections and event subscriptions.
- `services/storage/*`: secure + local caching abstractions.
- `state/*`: global state (Zustand) and server state (React Query).
- `offline/*`: sync manager for drafts and reconnect behavior.
- `navigation/*`: auth/app routing and role gates.

## 5. Navigation Structure
- Root stack:
  - `Auth` (OTP login + verify)
  - `ColonySelection`
  - `MainTabs`
  - `Chat` (stack modal/push)
  - `CreateGrievance`
- Main tabs:
  - Feed
  - Grievances
  - Announcements
  - Directory
  - Notifications
  - Profile
  - AdminPanel (role-guarded)

## 6. State Management
- Global client state: **Zustand**
  - Session, user, role, selected colony, pending OTP context.
- Server state: **React Query**
  - Feed pages, chat messages, grievances, mutation invalidation.
- Caching/offline:
  - AsyncStorage feed cache + draft post/grievance.
  - Sync manager flushes drafts on reconnect.

## 7. API Integration
- Networking: **Axios + axios-retry**
- JWT handling:
  - token stored in `react-native-keychain`.
  - request interceptor injects bearer token.
- Error and retry:
  - normalized API errors.
  - exponential retries for transient failures/429.

## 8. Real-Time Integration
- **Socket.IO** for:
  - chat message delivery
  - typing indicators
  - live grievance updates
  - notification pushes to in-app center

## 9. Offline Support
- Local cache:
  - feed snapshot
  - draft post
  - draft grievance
- Reconnect sync:
  - pending draft post auto-submit
  - pending grievance auto-submit
- Extendable queue:
  - replace simple draft flush with persistent operation queue for enterprise scale.

## 10. Performance Strategy
- Feed list optimizations (`initialNumToRender`, `windowSize`, `removeClippedSubviews`).
- Query cache tuning (`staleTime`, `gcTime`).
- Controlled re-renders using feature-local components and memoizable selectors.
- Image/video handling hooks prepared for compression pipeline integration.

## 11. Security
- Secure token storage via keychain.
- HTTPS-only API base.
- Clear token on 401.
- Avoid token logging in UI/business layers.

## 12. Tech Stack Options
Enterprise stack:
- React Native + TypeScript
- Zustand + React Query
- Axios + axios-retry
- Socket.IO + Firebase Cloud Messaging
- Keychain + AsyncStorage/MMKV
- Crash + analytics (Sentry/Firebase) + feature flags

Mid-level stack:
- React Native + TypeScript
- Redux Toolkit (single store) or Zustand only
- Fetch/Axios without advanced retry/interceptors
- Firebase RTDB or basic polling for near-real-time
- AsyncStorage for most local persistence

Trade-offs:
- Enterprise stack has more setup complexity but better reliability, observability, and scale behavior.
- Mid-level stack is faster to ship but weaker for high throughput, incident response, and strict SLA tracking.

## 13. Folder Structure
```
src/
  features/
    auth/
    colony/
    feed/
    grievances/
    announcements/
    directory/
    chat/
    notifications/
    profile/
    admin/
  components/
  services/
    api/
      modules/
    realtime/
    storage/
    notifications/
  state/
  navigation/
  hooks/
  offline/
  utils/
  theme/
  types/
```

## 14. Generated Code Coverage
Included now:
- Navigation setup (`RootNavigator`, `AuthNavigator`, `AppTabs`)
- OTP auth flow (`LoginOtpScreen`, `VerifyOtpScreen`, `authApi`)
- Feed (`FeedScreen`, `PostComposer`, `PostCard`, infinite query + reactions)
- Chat (`ChatScreen`, `chatApi`, `socketService`, typing + read indicators)
- API service layer (`apiClient`, feature APIs, retry/error/token interceptors)
- State management (`sessionStore`, `queryClient`)

## 15. Build Plan
1. Project setup and package installation.
2. Auth + profile + multi-colony onboarding.
3. Feed and grievance modules with media uploads and moderation workflow.
4. Real-time chat and notification streams.
5. Push notification delivery and deep-link navigation.
6. Offline queue hardening, analytics, performance tuning, and production QA.

## 16. Production Notes for AI Coding Agents
- Keep feature ownership strict by folder.
- Generate API contracts from OpenAPI where possible.
- Add integration tests per module and contract tests for API adapters.
- Prefer small, composable screen components and typed service calls.
