# Handl — Frontend

Frontend repository for **Handl**, a collaborative full-stack shopping list web application.

## 🌐 Tech Stack

- **Framework**: React (with Vite)
- **Styling**: Vanilla CSS
- **Routing**: React Router
- **State/Data Handling**:
  - TanStack Query (React Query)
  - Axios (REST API integration)
- **UI Libraries**:
  - Mostly custom
  - Material UI
  - Lucide Icons
  - hamburger-react
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Backend API (see [Handl Backend](https://github.com/gitXite/handl_backend))

### Installation

```bash
git clone https://github.com/gitXite/handl_frontend.git
cd handl_frontend
npm install
```

### Environment Setup
Create a .env file in the root:
```ini
VITE_API_URL=http://localhost:5000
```

### Running the App
```bash
npm run dev
```
The app will be available at http://localhost:3000. 

## 📁 Project Structure
```bash
src/
├── assets/         # Static files
├── components/     # Reusable UI components
├── context/        # Global context providers
├── hooks/          # Custom React hooks
├── pages/          # Route-based pages
├── services/       # Reusable service functions
├── utils/          # Utility functions
```

## 🔒 Authentication
Uses cookie-based sessions via backend (Passport + express-session). 

Axios is configured to send credentials (withCredentials: true). 

## 📦 Deployment
When deploying, make sure to point VITE_API_URL to your hosted backend. 

## 📄 License

This project is licensed under the [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) license — non-commercial use only.
