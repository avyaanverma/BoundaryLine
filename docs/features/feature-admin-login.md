Commit ID: fb8adba
Feature Added: BoundaryLine Admin Login Page
Date: 2026-06-12

Files Added:
- client/src/pages/admin/AdminLoginPage.jsx
- client/src/features/admin-login/components/BrandPanel.jsx
- client/src/features/admin-login/components/LoginForm.jsx
- client/src/features/admin-login/index.js

Files Updated:
- client/index.html
- client/src/App.jsx
- client/src/index.css

Components Added:

AdminLoginPage
- Renders the full admin login screen for BoundaryLine.
- Combines the feature-owned brand panel and login form in a responsive split layout.
- Lives under pages/admin and can be used as the route/page entry for the admin authentication flow.
- Does not require props currently.

BrandPanel
- Displays the BoundaryLine admin brand message, live scorecard badge, cricket-stadium visual, and quick platform stats.
- Provides the visual identity for admin authentication screens.
- Can be reused on future auth screens such as request access or password reset.
- Uses static data inside the component and does not require props currently.

LoginForm
- Handles the admin login form UI with email, password, remember-me, Google sign-in action, and request-access link.
- Performs basic client-side validation so the UI is ready for later API integration.
- Can be reused wherever admin credentials are collected before connecting the real auth service.
- Uses internal React state and does not require props currently.

Verification:
- npm.cmd run lint
- npm.cmd run build
- Desktop Playwright viewport check
- Mobile Playwright viewport check
