
# 🌍 The Interstellar Atlas

A responsive, single-page React application that lets users explore data about countries and their neighbors through the [REST Countries API](https://restcountries.com/v3.1/).  

Users can browse countries, filter by region, search by name, view detailed information, and explore each country's location on a live map.

---

## 🚀 Features

### **Main Dashboard**
- Displays all countries (flag, name, population, and region).  
- Client-side pagination to improve performance.  
- Region filter and text-based search that can be combined.  
- Smooth transitions and animations with **Framer Motion**.  
- Dark/light mode with persistent theme preference.  

### **Country Detail View**
- Shows detailed info including:
  - Native Name  
  - Sub-Region  
  - Capital  
  - Top Level Domain  
  - Currencies  
  - Languages  
- Displays **border countries** as clickable badges that navigate to their detail pages.  
- Integrates an **interactive map** (via Leaflet) with expandable view.  
- Handles API errors gracefully with clear visual feedback.  

### **UX Enhancements**
- Animated loading skeletons and transition effects.  
- Responsive and mobile-friendly layout.  
- Elegant error states for both connection loss and empty search results.  

---

## 🧠 Technical Overview

### **Tech Stack**
- **React (Vite)** – Core SPA framework.  
- **TypeScript** – Strong typing and better DX.  
- **Tailwind CSS** – Utility-first responsive styling.  
- **Framer Motion** – Animation and transition effects.  
- **Axios** – Simplified API fetching and error handling.  
- **React Router DOM** – Client-side routing between dashboard and details pages.  
- **React-Leaflet + Leaflet** – Interactive mapping with dynamic markers.  

### **State Management**
Lightweight state handled using React hooks (`useState`, `useEffect`, and `useReducer` where necessary).  
Data caching for previously fetched country details is implemented to minimize redundant API calls.

### **Architecture**
- `api/countries.ts`: Handles all REST Countries API requests (list, search, details, borders).  
- `components/`: Modular UI (Card, Hero, Map, Metrics, Toolbar, etc.).  
- `hooks/useCountries.ts`: Centralized logic for fetching and caching all country data.  
- `hooks/useCountryInfo.ts`: Centralized logic for fetching and caching single-country data.  
- `types/`: Central TypeScript interfaces for API responses.  

---

## 🧩 Bonus Features Implemented
✅ **Interactive Map Integration** using **React-Leaflet**  
✅ **Data Persistence** (re-fetch on refresh without breaking)  
✅ **Client-side Caching** (reuses fetched country data)  
✅ **Dark Mode** toggle with persistent user preference  
✅ **Responsive Layout** for both desktop and mobile  

---

## ⚙️ Installation & Running Locally

```bash
# Clone the repo
git clone https://github.com/Richard-Raph/interstellar.git

cd interstellar

# Install dependencies
npm install

# Run the app
npm run dev
```

Then open your browser to:
```
http://localhost:5173
```

---

## 🧭 API Reference

- **Base URL:** `https://restcountries.com/v3.1`  
- **Endpoints Used:**
  - `/all?fields={FIELDS}`
  - `/name/{country}`
  - `/alpha/{code}`
  - `/alpha?codes={codeList}`

Only required fields are fetched to optimize performance.

---

## ⚖️ Trade-offs and Design Decisions

| Decision | Trade-off | Rationale |
|-----------|------------|-----------|
| **Client-side pagination** | Initial load still fetches all countries | REST Countries API doesn’t support pagination; handled on client. |
| **Leaflet for map** | Slight bundle size increase | Provides a polished, interactive map experience. |
| **TailwindCSS** | Utility classes can clutter JSX | Faster to build and iterate with consistent design. |
| **In-memory caching (no Redux)** | Limited persistence | Enough for a lightweight project within 48-hour scope. |
| **Dark/Light theme in localStorage** | Simple toggle logic | Maintains user preference seamlessly. |

---

## 🧑‍💻 Author

**Richard Raphael**  
Frontend & Backend Developer | Web Dev Instructor | App Developer  
📧 arm.techtonic@gmail.com  
🔗 [GitHub](https://github.com/Richard-Raph)  
🔗 [LinkedIn](https://www.linkedin.com/in/rich-tech123)
