# 🌍 AI Travel Planner

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

An intelligent, full-stack web application that generates comprehensive, custom travel itineraries using AI. Enter your destination, budget, and travel dates to receive a day-by-day plan complete with dynamic location images, real-time weather forecasts, and an interactive map.

## ✨ Key Features

* **🧠 AI-Powered Itineraries:** Generates personalized day-by-day travel plans (attractions, restaurants, and activities) based on your budget and timeline.
* **📸 Dynamic Image Fetching:** Automatically pulls high-quality, location-specific images for every stop on the itinerary using the Unsplash API.
* **🌤️ Real-Time Weather:** Displays the current weather forecast for your destination via the OpenWeatherMap API.
* **🗺️ Interactive Map:** Plots your daily activities on an interactive map.
* **📥 PDF Export:** Download your complete itinerary as a beautifully formatted PDF for offline use.
* **📱 Responsive Design:** Built with Tailwind CSS for a seamless experience on desktop and mobile.

---

## 🛠️ Tech Stack

* **Frontend:** React, Next.js (App Router), Tailwind CSS, Framer Motion (Animations)
* **Backend:** Next.js API Routes (Serverless Functions)
* **APIs:** 
  * Google Gemini API (AI Generation)
  * Unsplash API (Images)
  * OpenWeatherMap API (Weather)
* **Utilities:** html2pdf.js (PDF generation)

---

## 🚀 Getting Started (Local Development)

Follow these instructions to set up the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or higher is recommended).

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/ai-travel-planner.git](https://github.com/YOUR_USERNAME/ai-travel-planner.git)
cd ai-travel-planner

2. Install dependencies
Bash
npm install
3. Set up Environment Variables
Create a .env.local file in the root directory of the project and add your API keys:

Code snippet
# Google Gemini API Key (Must start with AIza...)
GEMINI_API_KEY=your_gemini_api_key_here

# Unsplash API Access Key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# OpenWeatherMap API Key
OPENWEATHER_API_KEY=your_openweather_api_key_here
4. Run the development server
Bash
npm run dev
Open http://localhost:3000 in your browser to view the application.

📂 Project Structure
Plaintext
ai-travel-planner/
├── app/
│   ├── api/
│   │   ├── image/route.ts      # Unsplash image fetching endpoint
│   │   ├── plan/route.ts       # Gemini AI itinerary generation endpoint
│   │   └── weather/route.ts    # OpenWeather fetching endpoint
│   ├── globals.css             # Global Tailwind styles
│   ├── layout.tsx              # Root Next.js layout
│   └── page.tsx                # Main application UI & frontend logic
├── components/
│   ├── LocationImage.tsx       # Component for rendering Unsplash images
│   └── Map.tsx                 # Interactive map component
├── lib/
│   └── schema.ts               # TypeScript interfaces & AI data schemas
├── public/                     # Static assets
├── .env.local                  # Environment variables (git-ignored)
└── package.json                # Project dependencies and scripts
🌐 Deployment
This Next.js application is optimized for deployment on Vercel.
Push your code to a GitHub repository.
Log in to Vercel and create a new project.
Import your GitHub repository.
In the Vercel deployment settings, add your three environment variables (GEMINI_API_KEY, UNSPLASH_ACCESS_KEY, OPENWEATHER_API_KEY).
Click Deploy.
📝 Note on Rate Limits
Unsplash Free Tier: Limited to 50 requests per hour. If exceeded, the app will gracefully fall back to default placeholder images.
Gemini Free Tier: Subject to RPM (Requests Per Minute) and RPD (Requests Per Day) limits.
📄 License
This project is open-source and available under the MIT License.

