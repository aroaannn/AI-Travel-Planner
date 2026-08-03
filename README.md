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

* **Frontend:** React, Next.js (App Router), Tailwind CSS, Framer Motion
* **Backend:** Next.js API Routes (Serverless Functions)
* **APIs:** Google Gemini API, Unsplash API, OpenWeatherMap API

---

## 🚀 Getting Started

### Prerequisites
lose, but not quite! I can see exactly what is happening by looking at "Screenshot 2026-08-03 at 22.28.28.jpg".

You are still manually highlighting the text with your mouse cursor. Because of how this chat interface is built, when you click and drag your mouse over a code box, it secretly grabs hidden labels that the webpage uses behind the scenes (which is why the words "Bash" on line 39 and "Code snippet" on line 44 suddenly appeared in your GitHub editor). It also deleted the special backticks ( ` ) needed to format the code.

Let's bypass the chat formatting completely.

I am going to write the exact text you need below as plain text (no special dark boxes).

How to fix it:
Go to your GitHub editor from your screenshot.
Delete everything from line 32 down to the bottom.
Now, highlight the text below, copy it, and paste it into GitHub.
1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/ai-travel-planner.git
cd ai-travel-planner
```

2. Install dependencies
```bash
npm install
```

3. Set up Environment Variables
Create a .env.local file in the root directory and add your keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

4. Run the development server
```bash
npm run dev
```
5. 📂 Project Structure
```bash
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
│   ├── LocationImage.tsx       # Unsplash image component
│   └── Map.tsx                 # Interactive map component
├── lib/
│   └── schema.ts               # TypeScript schemas
├── public/                     # Static assets
└── package.json                # Dependencies and scripts
```
