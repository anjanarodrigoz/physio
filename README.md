# PhysioConnect - Physiotherapy Marketplace Platform

A comprehensive marketplace platform connecting patients with qualified physiotherapists in Sri Lanka for home visits and online consultations.

![React](https://img.shields.io/badge/React-19.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-7.x-purple)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-cyan)

## ✨ Phase 2 Complete - Full Backend Integration!

🎉 **Latest Updates**:
- ✅ Complete Express + MongoDB backend API
- ✅ Real physiotherapist registration with SLMC verification
- ✅ Working authentication with JWT
- ✅ Search page with real-time filters (district, specialization, name)
- ✅ Professional landing page with trust badges
- ✅ Patient testimonials section
- ✅ eChannelling-inspired medical blue design (#0066CC)
- ✅ Modern healing-focused UI

📖 **[See Complete Setup Guide →](SETUP.md)**

## 🌟 Features

### For Patients
- 🔍 **Advanced Search** - Find physiotherapists by location, specialization, price range, and ratings
- 📅 **Easy Booking** - Schedule appointments with real-time availability
- 💳 **Secure Payments** - PayHere integration with multiple local payment methods (cards, eZ Cash, mCash, bank transfers)
- 🏠 **Home Visits & Online Consultations** - Choose between in-person and virtual sessions
- 📝 **Treatment History** - Access your complete medical records and prescriptions
- ⭐ **Reviews & Ratings** - Read and leave reviews for physiotherapists
- 📚 **Educational Content** - Browse blog articles and health tips
- 🎓 **Events** - Register for workshops, webinars, and health camps

### For Physiotherapists
- 👤 **Professional Profiles** - Showcase qualifications, specializations, and experience
- 💰 **Service Packages** - Create tiered pricing (Basic/Standard/Premium)
- 📆 **Availability Management** - Set working hours and manage bookings
- 💵 **Revenue Tracking** - Monitor earnings and patient appointments
- ✍️ **Blog CMS** - Publish articles with rich text editor
- 🎪 **Event Management** - Host workshops and webinars with QR code ticketing
- 📊 **Dashboard Analytics** - Track patient metrics and performance
- 🔔 **Notifications** - SMS and push notifications for appointments

## 🎨 Design Features

- **Medical Blue Theme** - Professional eChannelling-inspired color scheme (#0066CC)
- **Healing-Focused UI** - Calming, trustworthy design for healthcare
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Glass Morphism** - Frosted glass effects for depth
- **Gradient Accents** - Subtle color gradients throughout
- **Micro-interactions** - Delightful hover and click animations
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Mode Ready** - Theme system with light/dark modes
- **Accessibility** - WCAG 2.1 AA compliant

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Framer Motion** - Animations

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### State Management & Data
- **Zustand** - Lightweight state management
- **React Query** - Data fetching & caching
- **Axios** - HTTP client

### Forms & Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Additional Features
- **React Quill** - Rich text editor
- **QR Code** - Event ticket generation
- **date-fns** - Date utilities
- **i18next** - Multi-language support (English/Sinhala/Tamil)

### Backend
- **Node.js & Express** - RESTful API server
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components
│   ├── common/          # Shared components
│   ├── auth/            # Authentication components
│   ├── physiotherapist/ # Physiotherapist-specific components
│   ├── patient/         # Patient-specific components
│   ├── blog/            # Blog components
│   ├── events/          # Event components
│   ├── booking/         # Booking components
│   └── payment/         # Payment components
├── lib/                 # Utility functions
├── hooks/               # Custom React hooks
├── stores/              # Zustand stores
├── types/               # TypeScript type definitions
├── services/            # API services
├── pages/               # Page components
│   ├── auth/            # Login, Register
│   ├── physiotherapist/ # Physiotherapist dashboard & profile
│   ├── patient/         # Patient dashboard & search
│   └── public/          # Landing, Blog, Events
├── styles/              # Global styles
├── config/              # Configuration files
├── locales/             # Translation files
│   ├── en/              # English
│   ├── si/              # Sinhala
│   └── ta/              # Tamil
└── assets/              # Static assets

```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 6.0+
- npm or yarn

### Installation

#### Frontend Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd physio
```

2. **Install frontend dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Create .env file**
```bash
cp .env.example .env
```

#### Backend Setup

4. **Install backend dependencies**
```bash
cd backend
npm install
```

5. **Configure backend**
```bash
cp .env.example .env
# Update .env with your MongoDB URI
```

6. **Seed sample data**
```bash
npm run seed
```

### Running the Application

1. **Start MongoDB**
```bash
# Make sure MongoDB is running on localhost:27017
mongod
```

2. **Start backend server (Terminal 1)**
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

3. **Start frontend development server (Terminal 2)**
```bash
# From project root
npm run dev
# Frontend runs on http://localhost:5173
```

4. **Open in browser**
```
http://localhost:5173
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Demo Credentials

After running `npm run seed` in the backend, you can login with these accounts:

### Physiotherapist Logins

1. **Nimal Perera** - Sports Physiotherapy (Colombo)
   - Email: `nimal.perera@physioconnect.lk`
   - Password: `password123`

2. **Amara Silva** - Neurological Physiotherapy (Kandy)
   - Email: `amara.silva@physioconnect.lk`
   - Password: `password123`

3. **Priya Fernando** - Pediatric Physiotherapy (Galle)
   - Email: `priya.fernando@physioconnect.lk`
   - Password: `password123`

4. **Rashmi Jayawardena** - Women's Health (Negombo)
   - Email: `rashmi.jayawardena@physioconnect.lk`
   - Password: `password123`

5. **Kumar Ratnayake** - Orthopedic Physiotherapy (Maharagama)
   - Email: `kumar.ratnayake@physioconnect.lk`
   - Password: `password123`

## 🎨 Design System

### Colors (eChannelling-Inspired Medical Blue)
- **Primary**: #0066CC (Medical Blue)
- **Secondary**: #4A90E2 (Light Blue)
- **Accent**: #00C4B4 (Teal)
- **Healing Colors**: Professional, calming, trustworthy palette
- **Neutral**: Gray scale

### Typography
- **Headings**: Inter, Poppins
- **Body**: Open Sans, Roboto

### Custom Classes
- `.glass` - Glass morphism effect
- `.gradient-primary` - Primary gradient background
- `.card-hover` - Hover animation for cards
- `.hero-text` - Gradient text for headings
- `.badge` - Status badges
- `.fab` - Floating action button

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_PAYHERE_MERCHANT_ID=your_payhere_merchant_id
VITE_PAYHERE_API_KEY=your_payhere_api_key
```

## 📦 Key Features Implementation

### Authentication
- Dual role system (Patient & Physiotherapist)
- Persistent login with Zustand
- Protected routes
- Role-based dashboards

### Search & Filtering
- Location-based search
- Specialization filters
- Price range filtering
- Rating-based sorting

### Booking System
- Real-time availability checking
- Calendar integration
- Service package selection
- Appointment confirmation

### Payment Integration (PayHere)
- Multiple payment methods
- Payment split (platform fee + physiotherapist)
- Transaction history
- Refund management

### Event Management
- Create workshops/webinars/health camps
- QR code ticket generation
- Attendance tracking
- Event registration & payments

### Blog CMS
- Rich text editor (React Quill)
- Categories and tags
- SEO optimization
- Social sharing

## 🌐 Multi-language Support

The platform supports three languages:
- English (en)
- Sinhala (si)
- Tamil (ta)

Language switching is available in the UI header.

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Focus management
- Aria labels

## 📱 PWA Features (Upcoming)

- Offline support
- Push notifications
- Install prompt
- Service worker caching

## 🔄 State Management

### Auth Store (`authStore.ts`)
- User authentication state
- Login/logout actions
- User profile updates

### UI Store (`uiStore.ts`)
- Theme (light/dark)
- Language selection
- Sidebar state

## 🧪 Testing (To be implemented)

```bash
npm run test        # Run tests
npm run test:watch  # Watch mode
npm run coverage    # Coverage report
```

## 📈 Performance Optimization

- Code splitting with React.lazy
- Image optimization
- Bundle size optimization
- Tree shaking
- Lazy loading routes

## 🚢 Deployment

### Build for production
```bash
npm run build
```

### Deploy to Vercel/Netlify
```bash
# Vercel
vercel deploy

# Netlify
netlify deploy --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Lucide](https://lucide.dev/) for icons

## 📞 Support

For support, email support@physioconnect.lk or join our Slack channel.

## 🗺️ Roadmap

- [ ] Video consultation integration
- [ ] Chat system
- [ ] AI-powered physiotherapist matching
- [ ] Exercise prescription library
- [ ] Mobile apps (iOS/Android)
- [ ] Admin dashboard
- [ ] Analytics & reporting
- [ ] Stripe payment integration
- [ ] Email notifications
- [ ] SMS notifications via Twilio
- [ ] Calendar sync (Google, Apple)

## 📊 Features Overview

| Feature | Patient | Physiotherapist | Status |
|---------|---------|-----------------|--------|
| Authentication | ✅ | ✅ | ✅ |
| Search & Filter | ✅ | - | ✅ |
| Profile Management | ✅ | ✅ | ✅ |
| Booking System | ✅ | ✅ | 🚧 |
| Payment Integration | ✅ | ✅ | 🚧 |
| Blog & Articles | ✅ | ✅ | ✅ |
| Event Management | ✅ | ✅ | ✅ |
| Reviews & Ratings | ✅ | ✅ | 🚧 |
| Chat System | ✅ | ✅ | ⏳ |
| Video Consultation | ✅ | ✅ | ⏳ |
| Multi-language | ✅ | ✅ | 🚧 |
| PWA Support | ✅ | ✅ | ⏳ |

**Legend**: ✅ Implemented | 🚧 In Progress | ⏳ Planned

---

Built with ❤️ in Sri Lanka
