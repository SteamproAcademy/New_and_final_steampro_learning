# SteamPRO Training Platform

A full-stack internal training platform built with React, TypeScript, Express.js, and PostgreSQL. Features video-based training modules, quizzes, progress tracking, and certificate generation.

## Features

- **User Authentication**: Secure login system with department-based access
- **Training Modules**: Video content, reading materials, and interactive quizzes
- **Progress Tracking**: Complete module unlocking and progress persistence
- **Certificate Generation**: PDF certificates upon course completion
- **Responsive Design**: Works on desktop and mobile devices
- **Department-Specific Content**: Tailored training for different departments

## Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd steampro-training-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database URL and other configuration
```

4. Run database migrations:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Production Deployment

### Deploy to Render

1. **Push to GitHub**:
   - Create a new repository on GitHub
   - Push your code to the repository

2. **Connect to Render**:
   - Sign up at [render.com](https://render.com)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` configuration

3. **Environment Variables**:
   - Render will automatically create a PostgreSQL database
   - The `DATABASE_URL` will be automatically configured
   - No additional environment variables needed

4. **Deploy**:
   - Click "Create Web Service"
   - Render will build and deploy your application
   - Your app will be live at `https://your-app-name.onrender.com`

### Alternative: Manual Render Setup

If not using `render.yaml`:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure build settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18
4. Add environment variables:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: (from your PostgreSQL database)
5. Deploy

### Docker Deployment

```bash
# Build the image
docker build -t steampro-training .

# Run the container
docker run -p 5000:5000 -e DATABASE_URL=your_database_url steampro-training
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── data/          # Training content and user data
│   │   └── lib/           # Utility functions
├── server/                # Backend Express application
├── shared/                # Shared types and schemas
├── render.yaml           # Render deployment configuration
├── Dockerfile           # Docker configuration
└── package.json         # Dependencies and scripts
```

## Adding New Training Content

To add new training modules, edit `client/src/data/trainingData.ts`:

```typescript
{
  id: "unique-id",
  title: "Module Title",
  videoUrl: "https://youtu.be/your-video-id",
  transcript: "Video description",
  readingMaterial: "HTML content for reading section",
  quiz: [
    {
      question: "Your question?",
      choices: ["Option 1", "Option 2", "Option 3"],
      correctAnswer: "Option 1"
    }
  ],
  duration: "XX minutes"
}
```

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build Tools**: Vite, esbuild
- **Deployment**: Render, Docker support

## License

MIT License