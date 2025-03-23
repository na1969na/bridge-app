# Bridge - A Loneliness Prevention Check-in App

Bridge is an app designed to prevent loneliness and ensure the well-being of individuals through daily check-ins. <br/>
The app helps users stay connected with their loved ones and alerts emergency contacts if necessary.

## Features
- Daily Check-in: Users check in once a day by pressing a button in the app, and the information is stored on the server.

- User Information Management: Users can manage their personal details (name, email, phone number) and set up notification preferences (SMS or email for morning, afternoon, or evening).

- Calendar Visualization: Check-in dates are displayed on a calendar for easy tracking.

- Emergency Contact Notifications: If a user fails to check in for 72 hours, the app sends a notification to the registered emergency contact via SMS or email.

## Design Philosophy
The app is designed to be simple and intuitive, making it easy for elderly users or those unfamiliar with technology to navigate.

## Tech Stack
- Frontend: React
- State Management: Zustand
- Type Checking: TypeScript
- Styling: TailwindCSS
- Authentication: Auth0 (JWT)
- Form Handling: React Hook Form, Zod
- Data Fetching: TanStack Query
- Backend: Node.js, Express.js, MongoDB
- Build Tool: Vite
