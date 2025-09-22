# Company Analytics Dashboard - MUI Implementation

A comprehensive dashboard built with **Next.js App Router** and **Material-UI (MUI)** that displays company data through 6 different API endpoints. Features responsive design, light/dark mode theming, and interactive data exploration.

## 🚀 Project Overview

This project demonstrates the integration of Material-UI components with Next.js to create a modern, responsive web application for exploring company data. Each page is designed to showcase different aspects of company information using various MUI components and layouts.

## 📋 API Endpoints Used

### 1. GET `/api/companies/count`
- **Purpose**: Returns total number of companies
- **Query Parameters**: `name`, `location`, `skill` (optional filters)
- **Response**: `{ "total": number }`

### 2. GET `/api/companies/top-paid?limit=5`
- **Purpose**: Returns companies sorted by highest base salary
- **Query Parameters**: `limit` (optional, default 5, max 50)
- **Response**: `{ "items": Company[] }`

### 3. GET `/api/companies/by-skill/:skill`
- **Purpose**: Returns companies requiring specific skills
- **Parameters**: `:skill` - skill name (case-insensitive)
- **Response**: `{ "items": Company[] }`

### 4. GET `/api/companies/by-location/:location`
- **Purpose**: Returns companies in specific location
- **Parameters**: `:location` - location name (case-insensitive)
- **Response**: `{ "items": Company[] }`

### 5. GET `/api/companies/headcount-range?min=&max=`
- **Purpose**: Returns companies within headcount range
- **Query Parameters**: `min` (default 0), `max` (optional)
- **Response**: `{ "items": Company[] }`

### 6. GET `/api/companies/benefit/:benefit`
- **Purpose**: Returns companies offering specific benefits
- **Parameters**: `:benefit` - benefit name (case-insensitive, substring match)
- **Response**: `{ "items": Company[] }`

## 🎨 Pages & MUI Components

### 1. **Global Layout** (`app/layout.js`)
**Components Used:**
- `ThemeProvider` - Custom theme with light/dark mode
- `CssBaseline` - CSS reset and baseline styles
- `AppBar`, `Toolbar` - Navigation header
- `Typography` - App title and text
- `IconButton` - Home and theme toggle buttons
- `Button` - Navigation links
- `Container` - Page content wrapper

**Features:**
- Light/Dark mode toggle with persistent state
- Responsive navigation with collapsible menu items
- Custom theme with branded colors and typography
- Gradient backgrounds and elevated components

### 2. **Home Page** (`app/page.js`)
**Components Used:**
- `Typography` - Hero title and descriptions
- `Grid` - Responsive card layout (1 col mobile, 2 tablet, 3 desktop)
- `Card`, `CardContent` - Feature showcase cards
- `Box` - Layout containers and spacing
- `Button` - Call-to-action buttons with custom colors

**Features:**
- Interactive feature cards with hover animations
- Responsive grid layout
- Color-coded icons and branded styling

### 3. **Total Companies Page** (`app/companies/count/page.js`)
**API:** `GET /api/companies/count`

**Components Used:**
- `Container` - Page layout container
- `Paper` - Elevated content container with gradient background
- `Typography` - Large count display and descriptions
- `Box` - Layout and spacing management
- `CircularProgress` - Loading indicator
- `Alert` - Error handling
- `Chip` - Status indicator

**Features:**
- Large, prominent count display with number formatting
- Gradient background design
- Loading states and error handling
- Responsive typography sizing

### 4. **Top Paid Companies Page** (`app/companies/top-paid/page.js`)
**API:** `GET /api/companies/top-paid?limit=5`

**Components Used:**
- `Grid` - Responsive card layout (1-2-3 column responsive)
- `Card`, `CardHeader`, `CardContent` - Company information cards
- `Avatar` - Company icons
- `Typography` - Company names and details
- `Chip` - "Top Paid" badge and bonus indicators
- `Box` - Layout and icon alignment

**Features:**
- Special "Top Paid" chip for #1 company
- Formatted salary display (INR currency)
- Company ranking system
- Hover animations and card elevation
- Responsive grid layout

### 5. **Companies by Skill Page** (`app/companies/by-skill/[skill]/page.js`)
**API:** `GET /api/companies/by-skill/:skill`

**Components Used:**
- `TextField` - Skill search input
- `Button` - Search functionality
- `Grid` - Responsive company cards
- `Card`, `CardContent` - Company display cards
- `Chip` - Skill tags (highlighted for matching skill)
- `Avatar` - Company icons
- `Typography` - Company information

**Features:**
- Dynamic routing with skill parameter
- Search functionality with URL updates
- Highlighted matching skills in chip format
- Skill filtering and display
- Interactive search with enter key support

### 6. **Companies by Location Page** (`app/companies/by-location/[location]/page.js`)
**API:** `GET /api/companies/by-location/:location`

**Components Used:**
- `TextField` - Location search input
- `Button` - Search functionality
- `Grid` - Responsive layout
- `Card`, `CardContent` - Company cards
- `Chip` - Skills and benefits tags
- `Typography` - Location and company details

**Features:**
- Dynamic location-based routing
- Highlighted location information
- Benefits and skills display
- Search functionality with URL navigation

### 7. **Companies by Headcount Range Page** (`app/companies/headcount-range/page.js`)
**API:** `GET /api/companies/headcount-range?min=&max=`

**Components Used:**
- `Paper` - Search form container
- `TextField` - Min/max headcount inputs (number type)
- `Button` - Search trigger
- `Grid` - Form layout and results display
- `Card`, `CardContent` - Company results
- `Chip` - Company size indicators (Small/Medium/Large)

**Features:**
- Dual input form for min/max range
- Input validation for numeric values
- Company size categorization with color coding
- Form submission with enter key
- Empty state with helpful instructions

### 8. **Companies by Benefit Page** (`app/companies/benefit/[benefit]/page.js`)
**API:** `GET /api/companies/benefit/:benefit`

**Components Used:**
- `TextField` - Benefit search input
- `Grid` - Responsive card layout
- `Card`, `CardContent` - Company information cards
- `Chip` - Benefit tags with emoji icons
- `Box` - Benefit list layout with icons
- `Typography` - Company and benefit details

**Features:**
- Dynamic benefit-based routing
- Emoji icons for different benefit types
- Highlighted matching benefits
- Comprehensive benefit list display
- Search functionality with benefit suggestions

## 🎯 Key Features Implemented

### Responsive Design
- **Mobile**: 1 column layout
- **Tablet**: 2 column layout  
- **Desktop**: 3 column layout
- Responsive typography and spacing

### Theming
- **Light/Dark Mode**: Toggle with persistent preference
- **Custom Colors**: Branded primary and secondary colors
- **Typography**: Custom font stack with fallbacks
- **Component Theming**: Consistent card shadows and borders

### User Experience
- **Loading States**: CircularProgress components during API calls
- **Error Handling**: Alert components for error states
- **Empty States**: Informative messages when no data found
- **Search Functionality**: Interactive search with URL updates
- **Hover Effects**: Card animations and elevation changes

### Data Formatting
- **Currency**: Indian Rupee formatting for salaries
- **Numbers**: Thousands separators for large numbers
- **Collections**: Chip components for skills and benefits
- **Status**: Color-coded indicators for different states

## 🛠️ Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
   ```

2. **Database Setup**
   - Ensure MongoDB connection in `src/app/lib/mongodb.js`
   - Seed data using: `npm run seed`

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   - Homepage: `http://localhost:3000`
   - All pages accessible via navigation or direct URLs

## 🏗️ Architecture

```
src/app/
├── layout.js                     # Global MUI layout with theme
├── page.js                       # Dashboard homepage
├── components/
│   └── MUIThemeProvider.js       # Theme provider with dark/light mode
├── api/companies/
│   ├── count/route.js           # Total companies API
│   ├── top-paid/route.js        # Top paid companies API
│   ├── by-skill/[skill]/route.js        # Companies by skill API
│   ├── by-location/[location]/route.js  # Companies by location API
│   ├── headcount-range/route.js         # Companies by headcount API
│   └── benefit/[benefit]/route.js       # Companies by benefit API
└── companies/
    ├── count/page.js            # Total companies page
    ├── top-paid/page.js         # Top paid companies page
    ├── by-skill/[skill]/page.js         # Dynamic skill page
    ├── by-location/[location]/page.js   # Dynamic location page
    ├── headcount-range/page.js          # Headcount range page
    └── benefit/[benefit]/page.js        # Dynamic benefit page
```

## 📱 Screenshots

### Homepage - Dashboard Overview
![Dashboard](screenshots/dashboard.png)
*Main dashboard with feature cards and responsive grid layout*

### Top Paid Companies - Card Layout
![Top Paid](screenshots/top-paid.png)
*Top 5 companies with salary information and special "Top Paid" badge*

### Companies by Skill - Dynamic Search
![Skills Search](screenshots/skills-search.png)
*Skill-based filtering with search functionality and highlighted matching skills*

### Dark Mode - Theme Toggle
![Dark Mode](screenshots/dark-mode.png)
*Dark theme implementation with consistent styling across all components*

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service. All components are optimized for production builds.

## 📄 License

This project is part of a Full Stack Development course assignment demonstrating Next.js App Router and Material-UI integration.
