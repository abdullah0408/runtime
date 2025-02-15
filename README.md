# RunTime - AI-Powered React Application Generator 🚀

![RunTime Demo](/Screenshot%202025-02-15%20at%209.28.30 AM.png)

## Overview
RunTime is an innovative AI-powered platform that enables developers to generate and edit React applications through natural language prompts. Built with cutting-edge technologies, it combines AI code generation with a powerful online IDE experience.

## Key Features ✨
- **AI-Powered Code Generation** 💡
  - Convert natural language prompts into functional React components
  - Intelligent code suggestions with Google Gemini integration
  - Real-time chat interface with AI assistant
- **Integrated Development Environment** 🔧
  - Sandpack-powered code editor with live preview
  - File system navigation
  - Tailwind CSS support out-of-the-box
- **Workspace Management** 📂
  - Cloud-synced workspaces
- **Authentication & Security** 🔒
  - Clerk-powered user authentication
  - OAuth integration (GitHub, Google)
  - Secure workspace isolation
- **Smart UI Components** 🎨
  - Responsive sidebar navigation

## Technology Stack 🛠️
**Frontend:**
- Next.js 15 (App Router)
- Tailwind CSS + Shadcn UI
- Clerk Authentication
- Sandpack Code Editor
- Lucide React Icons

**Backend:**
- Next.js API Routes
- Prisma ORM
- PostgreSQL Database
- Google Gemini AI

**DevOps:**
- Vercel Deployment
- PostgreSQL (Neon PostgreSQL)
- Environment Variables Encryption

## Installation & Setup 🚀

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Google Gemini API key
- Clerk account

### 1. Clone Repository
```bash
git clone https://github.com/abdullah0408/runtime.git
cd runtime
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/runtime?schema=public"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
CLERK_USER_WEBHOOK_SIGNING_SECRET=your_clerk_webhook_signing_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_GEMINI_API_KEY=your_google_ai_key
```

### 4. Database Setup
```bash
npx prisma db push
```

### 5. Start Development Server
```bash
npm run dev
```

## Project Structure 📁
```
runtime/
├── app/
│   ├── (auth)/                 # Authentication routes
│   ├── api/                    # API endpoints
│   ├── (main)/workspace/       # Main application UI
│   └── layout.js               # Root layout
├── components/                 # Reusable components
├── context/                    # React contexts
├── data/                       # Constants & prompts
├── hook/                       # Custom React hooks
├── lib/                        # Utility functions
├── prisma/                     # Database schema
└── queries/                    # Data operations
```

## Usage Guide 📖

### 1. Authentication
- Sign up/in using email, GitHub, or Google
- Protected routes require valid session

### 2. Creating Workspace
1. On homepage, describe your app idea:
   > "Create a todo app with dark mode"
2. AI generates initial codebase
3. Automatically creates new workspace

### 3. Code Interface
- **Chat View**: Communicate with AI assistant
- **Code Editor**: Modify generated code
- **Preview Pane**: Real-time component rendering
- **File Explorer**: Navigate project structure

### 4. AI Collaboration
- Ask for feature implementations:
    > "Create a responsive navigation bar"
    > "Implement a dark mode toggle"
    > "Add a user profile page"
    > "Build a dashboard with charts and graphs"

## API Endpoints 🔌
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai-chat` | POST | Process natural language prompts |
| `/api/generate-ai-code` | POST | Generate React components from prompts |
| `/api/webhooks/clerk` | POST | Handle Clerk authentication events |

## Contributing 🤝
1. Fork repository
2. Create feature branch
3. Submit PR with detailed description

## Support 💬
For issues/questions:
- hello@abdullah.co.in

---

**Transform your ideas into production-ready React apps with AI-powered efficiency!** 🚀