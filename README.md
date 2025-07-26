# Emergency Alert System (PWA Mobile App)

This project is now a Progressive Web App (PWA), installable on any device for a native-like mobile experience. You can add it to your home screen from Chrome, Safari, or Edge. For offline support and push notifications, see below.

## How to Install
- Open the app in your browser.
- Click the install prompt (or use browser menu: Add to Home Screen).
- Launch from your home screen for a full-screen, app-like experience.

---

# Emergency App with KNN Algorithm

This emergency application uses a K-Nearest Neighbors (KNN) algorithm to find the nearest hospitals and police stations to your current location.

## Features

### 🏥 KNN Algorithm Implementation
- **Distance Calculation**: Uses the Haversine formula to calculate accurate distances between coordinates
- **Nearest Neighbor Search**: Finds the K closest hospitals and police stations
- **Radius Search**: Alternative search method to find all services within a specified radius
- **Weighted KNN**: Enhanced algorithm that prioritizes service types based on emergency type

### 📍 Location-Based Services
- Real-time location tracking
- Dynamic service discovery based on your current position
- Interactive settings to customize search parameters
- Direct navigation to emergency services

### 🚨 Emergency Features
- One-tap emergency alerts
- Direct calling to emergency services
- Status updates (Safe, Help, Accident)
- Real-time location sharing

## KNN Algorithm Details

### How It Works

1. **Distance Calculation**: The algorithm calculates the distance between your current location and all available emergency services using the Haversine formula:

```typescript
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
```

2. **K-Nearest Neighbors**: Sorts all services by distance and returns the K closest ones
3. **Service Filtering**: Separates hospitals and police stations for targeted results

### Search Modes

#### Standard KNN Search
- Finds the K nearest services (default: 3)
- Adjustable K value (1-10)
- Returns closest hospitals and police stations regardless of distance

#### Radius Search
- Finds all services within a specified radius
- Adjustable radius (1-20 km)
- Useful when you want all nearby options

#### Weighted KNN Search
- Prioritizes service types based on emergency type
- Medical emergencies: Hospitals get higher priority
- Security emergencies: Police stations get higher priority

### Sample Data

The app includes real hospital and police station data for New York City:

**Hospitals:**
- Bellevue Hospital Center
- NYU Langone Medical Center
- Mount Sinai Hospital
- NewYork-Presbyterian Hospital
- Lenox Hill Hospital
- And more...

**Police Stations:**
- NYPD 1st Precinct
- NYPD 5th Precinct
- NYPD 6th Precinct
- NYPD 7th Precinct
- And more...

## Usage

### Basic Usage
1. Enable location tracking
2. The app automatically finds the 3 nearest hospitals and police stations
3. Tap "Call" to contact emergency services
4. Tap "Navigate" to get directions

### Advanced Settings
1. Tap "Settings" in the KNN Search section
2. Choose between KNN or Radius search
3. Adjust K value (1-10) for KNN search
4. Adjust radius (1-20 km) for radius search

### Emergency Alerts
- **Safe**: Mark yourself as safe
- **Help**: Request immediate assistance
- **Accident**: Report an accident

## Technical Implementation

### File Structure
```
src/
├── utils/
│   └── knnAlgorithm.ts    # KNN algorithm implementation
├── components/
│   ├── NearbyServices.tsx # Main KNN interface
│   ├── LocationTracker.tsx
│   ├── EmergencyAlert.tsx
│   ├── StatusButtons.tsx
│   └── InformationPanel.tsx
└── App.tsx               # Main application
```

### Key Functions

#### `findNearestServices(lat, lon, k)`
- Standard KNN implementation
- Returns K nearest hospitals and police stations

#### `findServicesInRadius(lat, lon, radius)`
- Radius-based search
- Returns all services within specified radius

#### `findNearestServicesWeighted(lat, lon, k, emergencyType)`
- Enhanced KNN with service type prioritization
- Considers emergency type for better recommendations

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   ```
3. Start the development server:
   ```bash
   npm run dev -- --host
   ```

## Technologies Used

- **React** with TypeScript
- **KNN Algorithm** for nearest neighbor search
- **Haversine Formula** for accurate distance calculation
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Future Enhancements

- Integration with real emergency service APIs
- Machine learning for better service recommendations
- Traffic-aware routing
- Real-time service availability
- Multi-language support
- Offline mode with cached data

## Contributing

Feel free to contribute to this project by:
- Adding more hospital/police station data
- Improving the KNN algorithm
- Adding new features
- Reporting bugs

## License

This project is open source and available under the MIT License. 

---

Yes! If you want to access your web application from your phone **without dealing with firewall or local network issues**, you have a few alternative methods:

---

## 1. **Deploy to a Public Hosting Service (Recommended for Web Apps)**
This is the easiest and most reliable way to access your app from any device, anywhere.

### Popular Free Hosting Options:
- **Vercel** ([vercel.com](https://vercel.com/)) — Great for React/Vite projects, easy GitHub integration.
- **Netlify** ([netlify.com](https://netlify.com/)) — Also very easy, supports drag-and-drop or GitHub deploys.
- **GitHub Pages** ([pages.github.com](https://pages.github.com/)) — Good for static sites, but less flexible for SPAs.
- **Firebase Hosting** ([firebase.google.com/products/hosting](https://firebase.google.com/products/hosting)) — Good for PWAs and mobile apps.

### How to Deploy (Example: Vercel)
1. Push your project to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
3. Click **“New Project”** and import your repo.
4. Vercel will auto-detect your Vite/React app. Click **“Deploy”**.
5. After a minute, you’ll get a public URL (e.g., `https://your-app.vercel.app`).
6. Open this URL on your phone—no firewall or network issues!

---

## 2. **Use a Tunneling Service (Quick Test)**
If you want to test your local dev server on your phone without deploying, use a tunneling service:

- **ngrok** ([ngrok.com](https://ngrok.com/))
- **Cloudflare Tunnel** ([developers.cloudflare.com/cloudflare-one/connections/connect-apps/](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/))

### Example: ngrok
1. Install ngrok:  
   Download from [ngrok.com](https://ngrok.com/) and follow setup instructions.
2. In your terminal, run:
   ```
   ngrok http 5178
   ```
3. ngrok will give you a public URL (e.g., `https://abcd1234.ngrok.io`)
4. Open this URL on your phone.

---

## 3. **Build and Copy to a Web Server**
- Run `npm run build` to create a production build.
- Copy the `dist` folder to any web server (even a free one).
- Access it from any device.

---

## **Summary Table**

| Method         | Easiest | Best for | Free | Needs Account | No Firewall Issues |
|----------------|---------|----------|------|---------------|-------------------|
| Vercel/Netlify | ✅      | All      | ✅   | ✅            | ✅                |
| ngrok          | ✅      | Testing  | ✅   | ✅            | ✅                |
| Local Network  | ❌      | Home     | ✅   | ❌            | ❌                |

---

**Recommendation:**  
For a real web app, deploy to Vercel or Netlify. For quick testing, use ngrok.

If you want, I can give you step-by-step instructions for any of these methods!  
**Which one would you like to try?** 