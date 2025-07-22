# Ecron Technologies - Training Institute Website

## Project Overview
A comprehensive educational platform for Ecron Technologies offering various IT training programs including MEAN Stack Development, UI/UX Design, Full Stack Development, Cloud Computing, and more. The website features course details, demo booking, contact forms, and newsletter subscription functionality.

## Architecture
- **Frontend**: React 18 with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **Styling**: Tailwind CSS with dark mode support

## Current Migration Status
Migrating from Bolt (Supabase) to Replit (PostgreSQL) environment:

### Database Tables to Migrate:
- `contact_messages` - Contact form submissions
- `course_applications` - Course enrollment applications
- `demo_applications` - Demo session requests
- `newsletter_subscriptions` - Newsletter signups

### Components Using Supabase:
- `DemoForm.tsx` - Demo booking functionality
- `CourseDetailPage.tsx` - Course application forms
- `newsletter.ts` - Newsletter subscription service

## Recent Changes
- **2025-01-22**: Started migration from Bolt to Replit
- **2025-01-22**: Created progress tracking system
- **2025-01-22**: Set up PostgreSQL database environment
- **2025-01-22**: Completed migration from Supabase to PostgreSQL
- **2025-01-22**: Removed dark mode, keeping only light mode active
- **2025-01-22**: Updated UI/UX course (2 months, ₹25,000, Figma/Adobe XD/Miro)
- **2025-01-22**: Removed Full Stack Master Program completely from all components
- **2025-01-22**: Added comprehensive Java & Python Development Training courses
- **2025-01-22**: Enhanced course curriculum with detailed 20+ key topics per course

## User Preferences
- Clean, professional communication style
- Comprehensive error handling and validation
- Secure data handling practices
- Modern React patterns with TypeScript