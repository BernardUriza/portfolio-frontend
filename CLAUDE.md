# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start development server (Angular dev server)
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode for development
- `npm test` - Run unit tests with Karma/Jasmine
- `npm run e2e` - Run end-to-end tests with Cypress
- `npm run tailwind:build` - Build Tailwind CSS in watch mode

## Project Architecture

This is an Angular 20 portfolio application with a Spring Boot backend API. The frontend follows a feature-based architecture:

### Core Structure
- **Components**: Reusable UI components in `src/app/components/`
- **Features**: Business logic modules in `src/app/features/` (projects, skills, experience, admin)
- **Core**: Shared services and guards in `src/app/core/`
- **Routing**: Feature-based lazy loading with route guards for admin section

### Key Features
- **Projects**: Display and manage portfolio projects
- **Skills**: Technical skills showcase
- **Experience**: Work experience timeline
- **Contact**: Contact form with toast notifications
- **Admin**: Protected admin panel with authentication
- **AI Integration**: Game chat functionality with context tracking
- **Catalytic Architecture**: Animated visualization components

### Backend Integration
- API endpoints: `/api/projects`, `/api/skills`, `/api/experience`, `/api/contacts`
- Environment-based API configuration (localhost:8080 for dev)
- Contact form posts to backend with toast feedback

### Styling & UI
- **Tailwind CSS** with custom color palette and animations
- **SCSS** for component-specific styles
- Custom neon/cyberpunk theme with animated components
- Responsive design with mobile-first approach

### Authentication
- Auth guard protects admin routes
- Login component for admin access
- JWT-based authentication with backend

### Special Components
The "Between Startup and Structure" section contains animated visualization components:
- `symptom-bar`: Dynamic instability visualization
- `entropy-wave`: Wave/dot/grid animations
- `method-transform`: Catalyst flow animations
These components rotate animation styles every 10 seconds using Tailwind CSS.

### Testing
- Unit tests with Jasmine/Karma
- E2E tests with Cypress
- Component testing for all major features

### Key Services
- `ContactService`: Handles contact form submissions
- `ProjectService`, `SkillService`, `ExperienceService`: CRUD operations
- `AuthService`: Authentication management
- `ToastService`: User notifications
- `AiService`: AI chat functionality
- `TraceService`: Error tracking and diagnostics

When making changes, follow the existing patterns for component structure, service injection, and styling conventions. The project uses standalone components and the new Angular application builder.