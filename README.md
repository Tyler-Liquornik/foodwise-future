# FoodWise: A Smart Food Waste Reduction Solution

## Overview

Check out the project: https://foodwise-future.netlify.app/

FoodWise is an innovative mobile and desktop web application designed to combat food waste by empowering users to track, manage, and optimize their food consumption. By leveraging cutting-edge AI and user-friendly scanning technology, the app helps individuals and businesses reduce food waste, save money, and contribute to environmental sustainability.

FoodWise was designed as a scalable solution to address food wastage, particularly with students in mind. 
It was completely designed in less than 24 hours for a project for Ivey's Leveraging Information Technology 3322K.
The challenge FoodWise addressed was to create an AI-powered solution to addressed a problem in environmental sustainability.

## 🌍 Environmental Impact Goals

FoodWise should help users:
- Reduce personal food waste
- Lower carbon emissions
- Save money on groceries
- Support community food sharing

## 🌟 Key Features Designed

This is the scope of features the team planned for a full-scale version of the app:
- **Barcode & Image Scanning**: Easily log grocery items using barcode or image recognition
- **AI-Powered Expiry Predictions**: Intelligent shelf-life tracking and expiration alerts
- **Smart Recipe Suggestions**: Generate recipes using ingredients approaching expiration
- **Donation Recommendations**: Connect users with local food banks and community resources (and donations to us!)
- **Sustainability Tracking**: Monitor personal food waste and carbon footprint reduction

## 🚀 Tech Stack

This is the scope of the technology that was actually implemented in the 24 hour period of the assignment: 
- **Frontend**: React.js via Lovable.dev
- **Webcam API**: react-webcam allows streaming webcam video
- **AI Technology**: HuggingFace object detection allows quickly adding foods to the app's system

At scale we would like to add:
- **Backend**: PostgreSQL database managed through Supabase Cloud for data storage
- **Authentication**: Supabase Auth for secure, multi-method user management with robust privacy controls
- **Payments & Donations**: Stripe integration enables seamless, tax-deductible charitable contributions
- **Google Ads Integration**: Targeted ad placement to generate revenue and support app sustainability efforts
- **Barcode API**: OpenFoodFacts and GS1 integration for comprehensive global product information and tracking
- **AI Technology**: Custom trained AI model that can more accurately recognize food items, and estimate food quality and expiry times.

## 📦 Dev Env Setup

1. Clone the repository
```bash
git clone https://github.com/<yourusername>/foodwise-future.git
```

2. Install dependencies
```bash
cd foodwise-future
npm install
```

3. Start development server
```bash
npm run dev
```
