# Social Media Timeline - Assignment

This is a social media timeline application built with Next.js (frontend) and Flask (backend). The application allows users to view and create posts in a social media feed format.

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your Flask backend URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Integration

The application communicates with a Flask backend through the following endpoints:

- **GET `/api/posts`** - Fetches all user posts for the timeline
- **POST `/api/posts`** - Creates a new post with the following payload:
  ```json
  {
    "name": "User Name",
    "username": "username",
    "body": "Post content"
  }
  ```

API calls are made using Axios and the base URL is configured via the `NEXT_PUBLIC_API_URL` environment variable.

## Features

- **Timeline View**: Display posts in a social media feed format
- **Create Posts**: Users can create and submit new posts
- **Interactive UI**: Like posts, view comments, shares, and bookmarks
- **Trending Topics**: Sidebar showing trending topics
- **User Suggestions**: Suggestions for users to follow
- **Toast Notifications**: Success and error messages using react-hot-toast

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
