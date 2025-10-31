# 🚀 PhysioConnect - Complete Setup Guide

## Phase 2 Complete! ✅

The platform now has **full backend integration** with registration, login, and search functionality.

## 🎨 What's New in Phase 2

### ✅ Completed Features
1. **eChannelling Medical Blue Theme** - Professional healthcare color scheme (#0066CC)
2. **Complete Backend API** - Express + MongoDB with JWT authentication
3. **Physiotherapist Registration** - Full form with SLMC verification
4. **Real Authentication** - Login with actual database validation
5. **Sample Data** - 5 pre-loaded physiotherapists for testing
6. **Search & Filter** - Real-time search with district and specialization filters
7. **Professional Landing Page** - Trust badges, testimonials, and healing design
8. **Image-Ready Design** - Modern healthcare aesthetic with professional imagery

### 🎯 Current Status
- ✅ Backend API running with MongoDB
- ✅ Registration page connected to backend
- ✅ Login page connected to backend
- ✅ JWT token storage and management
- ✅ Error handling and loading states
- ✅ Search page with real data and filters
- ✅ Professional landing page with trust badges
- ✅ Testimonials and modern healing design
- ✅ Image-ready professional healthcare aesthetic

## 📋 Prerequisites

- **Node.js** 18+ installed
- **MongoDB** 6.0+ installed and running
- **Git** installed

## 🔧 Complete Installation Guide

### Step 1: Start MongoDB

```bash
# For MacOS (with Homebrew)
brew services start mongodb-community

# For Linux
sudo systemctl start mongod

# For Windows
# Start MongoDB from Services or run:
mongod

# Verify MongoDB is running
mongosh
# You should see MongoDB shell. Type 'exit' to leave.
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not done already)
npm install

# Copy environment file
cp .env.example .env

# The .env file should contain:
# PORT=5000
# NODE_ENV=development
# MONGODB_URI=mongodb://localhost:27017/physioconnect
# JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
# CORS_ORIGIN=http://localhost:5173

# Seed sample data (5 physiotherapists)
npm run seed

# You should see:
# ✅ Connected to MongoDB
# 🗑️  Cleared existing physiotherapists
# ✅ Inserted 5 physiotherapists
#
# 📋 Sample Credentials:
#    Email: nimal.perera@physioconnect.lk | Password: password123
#    Email: amara.silva@physioconnect.lk | Password: password123
#    Email: priya.fernando@physioconnect.lk | Password: password123
#    Email: rashmi.jayawardena@physioconnect.lk | Password: password123
#    Email: kumar.ratnayake@physioconnect.lk | Password: password123

# Start backend server
npm run dev

# You should see:
# ✅ Connected to MongoDB
# 🚀 Server is running on port 5000
# 📊 Environment: development
# 🌐 API: http://localhost:5000/api
```

### Step 3: Frontend Setup

Open a **NEW terminal** (keep backend running):

```bash
# Navigate to project root
cd /path/to/physio

# Create .env file
cp .env.example .env

# The .env should contain:
# VITE_API_URL=http://localhost:5000/api

# Start frontend development server
npm run dev

# You should see:
#   VITE v7.x.x  ready in XXX ms
#
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose
```

### Step 4: Test the Application

Open your browser: **http://localhost:5173**

## 🧪 Testing Guide

### Test 1: Login with Existing Account

1. Go to http://localhost:5173/login
2. Use demo credentials:
   - **Email**: `nimal.perera@physioconnect.lk`
   - **Password**: `password123`
3. Click "Sign in"
4. ✅ You should be redirected to the physiotherapist dashboard

### Test 2: Register New Physiotherapist

1. Go to http://localhost:5173/register
2. Fill in the form:
   - **Personal Info**: Name, email, phone, password
   - **Professional**: SLMC number (e.g., SLMC999), experience, specialization
   - **Location**: Select district and city
3. Check "I agree to terms"
4. Click "Create Physiotherapist Account"
5. ✅ Account created and redirected to dashboard

### Test 3: Verify Backend API

Test the API endpoints directly:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all physiotherapists
curl http://localhost:5000/api/physiotherapists

# You should see JSON with 5 physiotherapists
```

### Test 4: Search Physiotherapists

1. Go to http://localhost:5173/search
2. ✅ **Real data from backend** - Shows all 5 seeded physiotherapists
3. Try filtering by:
   - **District**: Select Colombo, Kandy, Galle, etc.
   - **Specialization**: Select Sports, Neurological, Pediatric, etc.
   - **Search**: Type a physiotherapist name
4. Verify all filters work correctly and results update in real-time

## 📊 Sample Data Overview

After running `npm run seed`, you'll have 5 physiotherapists:

| Name | Specialization | Location | Rating | Price Range |
|------|---------------|----------|--------|-------------|
| Nimal Perera | Sports Physiotherapy | Colombo | 4.9 ⭐ | LKR 3,000-8,000 |
| Amara Silva | Neurological | Kandy | 4.8 ⭐ | LKR 2,500-4,500 |
| Priya Fernando | Pediatric | Galle | 5.0 ⭐ | LKR 3,500-6,500 |
| Rashmi Jayawardena | Women's Health | Negombo | 4.7 ⭐ | LKR 4,000 |
| Kumar Ratnayake | Orthopedic | Maharagama | 4.9 ⭐ | LKR 2,800-7,500 |

## 🎨 Color Scheme (eChannelling Blue)

The platform now uses professional medical colors:

```css
Primary:   #0066CC (Medical Blue)
Secondary: #4A90E2 (Light Blue)
Accent:    #00C4B4 (Healing Teal)
Success:   #10B981 (Green)
```

## 🔐 Authentication Flow

1. **Registration** → Backend validates → Hash password → Store in MongoDB → Return JWT token
2. **Login** → Backend validates credentials → Return JWT token
3. **Token Storage** → Stored in localStorage
4. **Protected Routes** → Token sent in Authorization header

## 🐛 Troubleshooting

### Problem: Cannot connect to MongoDB
```bash
# Check if MongoDB is running
mongosh

# If not running, start it:
brew services start mongodb-community  # Mac
sudo systemctl start mongod            # Linux
```

### Problem: Backend port 5000 already in use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env
PORT=5001
```

### Problem: CORS errors in browser
```bash
# Check backend .env has correct CORS_ORIGIN
CORS_ORIGIN=http://localhost:5173

# Restart backend server after changing
```

### Problem: Frontend can't connect to backend
```bash
# Check frontend .env
VITE_API_URL=http://localhost:5000/api

# Restart frontend server (Ctrl+C, then npm run dev)
```

## 📝 Phase 2 Complete! ✅

### What We Built

1. ✅ **Search Page with Real Backend Data**
   - Real-time filtering by district and specialization
   - Dynamic filter options loaded from backend
   - Search functionality by physiotherapist name
   - Loading states and error handling

2. ✅ **Professional Landing Page**
   - SLMC verification badge prominently displayed
   - Trust badges section (SLMC, Security, 24/7 Support, PayHere)
   - Professional testimonials with patient stories
   - Enhanced hero section with trust indicators
   - Modern healing-focused design
   - Improved CTA with healing journey messaging

3. ✅ **Image-Ready Design**
   - Professional medical blue color scheme throughout
   - Modern healthcare aesthetic
   - Placeholder areas ready for real healthcare images
   - Glass morphism and gradient effects

### Optional Enhancements (Future)

1. **Real Healthcare Images**
   - Replace placeholder images with professional photography
   - Add physiotherapist profile photos
   - Include treatment session imagery

2. **Patient Registration**
   - Separate registration flow for patients
   - Patient dashboard
   - Appointment booking interface

## 📞 Support

If you encounter issues:

1. Check both terminals (backend and frontend) for error messages
2. Verify MongoDB is running: `mongosh`
3. Check browser console (F12) for frontend errors
4. Check API in browser: http://localhost:5000/api/health

## 🎉 Success Checklist

- [ ] MongoDB is running
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Can login with demo account
- [ ] Can register new physiotherapist
- [ ] Can see physiotherapist dashboard
- [ ] Backend API returns physiotherapist list

## 🚀 Production Deployment

When ready for production:

### Backend
- Use MongoDB Atlas (cloud database)
- Set strong JWT_SECRET
- Enable HTTPS
- Set NODE_ENV=production
- Use PM2 for process management

### Frontend
- Build: `npm run build`
- Deploy to Vercel/Netlify
- Update VITE_API_URL to production backend URL

---

**Status**: Phase 2 - Backend Integration ✅ (100% Complete)

**Completed Features**:
- ✅ Full backend API with MongoDB
- ✅ Registration and authentication
- ✅ Search with real-time filters
- ✅ Professional landing page with trust badges
- ✅ Testimonials and modern healing UI
- ✅ Image-ready professional design

**Next Phase**: Consider patient registration, appointment booking system, or real image integration!
