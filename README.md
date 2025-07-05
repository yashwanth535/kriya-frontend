# Cron Job Manager - Frontend

React frontend application for the Cron Job Manager. Built with React 19, Vite, and Tailwind CSS.

🌐 **Live Demo**: [https://kriya.yashwanth.site/](https://kriya.yashwanth.site/)

## Features

- 🎨 **Modern UI**: Clean and responsive design with Tailwind CSS
- 🔐 **Authentication**: JWT-based authentication with protected routes
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast**: Built with Vite for lightning-fast development and builds
- 🔍 **Search**: Real-time search functionality for jobs
- 📊 **Real-time Updates**: Live job status and execution logs

## Tech Stack

- **React 19** - Latest React with hooks and modern patterns
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Beautiful icons

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the frontend directory:

```env
# API URL (optional, defaults to http://localhost:5000/api)
VITE_API_URL=http://localhost:5000/api
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── JobCard.jsx     # Individual job display card
│   ├── JobForm.jsx     # Create/edit job modal form
│   ├── LogList.jsx     # Job execution logs modal
│   ├── Navbar.jsx      # Navigation bar
│   └── ProtectedRoute.jsx # Route protection component
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication context
├── pages/              # Route-based pages
│   ├── Home.jsx        # Dashboard page
│   ├── LandingPage.jsx # Landing page
│   ├── SignIn.jsx      # Sign in page
│   └── SignUp.jsx      # Sign up page
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Components

### JobCard
Displays individual cron job information with actions for execute, edit, delete, and view logs.

### JobForm
Modal form for creating and editing cron jobs with validation and cron expression examples.

### LogList
Modal component for viewing job execution logs with detailed information.

### Navbar
Navigation bar with user information and logout functionality.

## Pages

### LandingPage
Marketing page with features overview and call-to-action buttons.

### SignIn/SignUp
Authentication pages with form validation and error handling.

### Home
Main dashboard for managing cron jobs with search, filtering, and job management.

## Styling

The application uses Tailwind CSS with custom utility classes defined in `src/index.css`:

- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.btn-danger` - Danger button styling
- `.input-field` - Form input styling
- `.card` - Card component styling

## API Integration

The frontend communicates with the backend API using Axios. All API calls are configured in the `AuthContext` with automatic token handling.

## Development

### Adding New Components

1. Create the component in `src/components/`
2. Export the component
3. Import and use in the appropriate page

### Adding New Pages

1. Create the page component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Update navigation if needed

### Styling Guidelines

- Use Tailwind CSS utility classes
- Create custom components for repeated patterns
- Follow the existing color scheme and spacing
- Ensure responsive design for all components

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The built files in `dist/` can be deployed to any static hosting platform:

- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Ensure responsive design
4. Test on different screen sizes
5. Update documentation if needed
