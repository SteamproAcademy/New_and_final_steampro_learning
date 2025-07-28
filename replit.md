# Replit Project Documentation

## Overview

This is a full-stack internal training platform for SteamPRO (a bath-tech startup) built with React, TypeScript, Express.js, and PostgreSQL using Drizzle ORM. The application provides a comprehensive learning management system with video-based training modules, quizzes, progress tracking, and certificate generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state, localStorage for client-side persistence
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: In-memory storage with planned PostgreSQL session store (connect-pg-simple)

### Database Schema
- **Users Table**: Basic user authentication with id, username, and password fields
- **Database**: PostgreSQL with UUID primary keys
- **Migrations**: Managed through Drizzle Kit with schema located in `shared/schema.ts`

## Key Components

### Authentication System
- **Implementation**: Client-side authentication using predefined users in `client/src/data/users.ts`
- **Storage**: User sessions stored in localStorage  
- **Users**: Production-ready user accounts with different departments (sales, ops, marketing, finance, manufacturing)
- **Security**: Demo credentials removed for production deployment

### Training Content Management
- **Content Structure**: Hierarchical training modules organized by tracks (Core, Departmental, HR)
- **Module Components**: Each module contains video content, reading materials, and quizzes
- **Content Storage**: Static data stored in `client/src/data/trainingData.ts`

### Progress Tracking
- **Storage**: localStorage-based progress tracking
- **Features**: Video completion, reading completion, quiz scores, module unlocking logic
- **Persistence**: All progress data maintained client-side

### UI Components
- **Design System**: shadcn/ui components with custom SteamPRO theming
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Comprehensive set of reusable UI components

## Data Flow

### Authentication Flow
1. User enters credentials on login page
2. Credentials validated against hardcoded user data
3. Successful login stores user object in localStorage
4. Navigation component checks authentication state
5. Protected routes redirect to login if unauthenticated

### Learning Progress Flow
1. User selects training module from dashboard
2. Module unlocking logic checks prerequisites
3. Progress tracking updates localStorage on completion
4. Dashboard reflects updated progress and unlocks next modules
5. Certificate generation available after all tracks completed

### Content Delivery Flow
1. Static training data loaded from TypeScript modules
2. Video content embedded via YouTube iframes
3. Reading materials rendered as HTML content
4. Quiz interactions managed through React state
5. Progress updates persist to localStorage

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **@radix-ui/***: Headless UI component primitives

### UI Dependencies
- **tailwindcss**: Utility-first CSS framework
- **@radix-ui/react-***: Accessible component primitives
- **class-variance-authority**: CSS class variant management
- **clsx**: Conditional className utility

### Development Dependencies
- **vite**: Build tool and development server
- **tsx**: TypeScript execution engine
- **esbuild**: JavaScript bundler for production builds

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR
- **Database**: Requires DATABASE_URL environment variable
- **Commands**: `npm run dev` for development mode

### Production Deployment
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Commands**: `npm run build` for production build, `npm start` for production server

### Render Deployment
- **Configuration**: `render.yaml` for automated deployment
- **Database**: Automatic PostgreSQL provisioning
- **Build Process**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment**: NODE_ENV=production, DATABASE_URL auto-configured

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL
- **Session Storage**: In-memory for development, scalable to PostgreSQL
- **Static Assets**: Served through Express in production
- **Security**: Demo credentials removed, environment variables for sensitive data

### Alternative Deployment Options
- **Docker**: Dockerfile provided for containerized deployment
- **Manual Setup**: Step-by-step instructions in README.md
- **GitHub Integration**: Ready for Git-based deployment workflows

The application follows a monorepo structure with clear separation between client, server, and shared code. The current implementation prioritizes rapid prototyping with client-side data storage, with infrastructure in place to migrate to full database persistence when needed.