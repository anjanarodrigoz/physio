import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import LandingPage from '@/pages/public/LandingPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import PatientDashboard from '@/pages/patient/Dashboard'
import PhysiotherapistDashboard from '@/pages/physiotherapist/Dashboard'
import SearchPhysiotherapists from '@/pages/patient/SearchPhysiotherapists'
import PhysiotherapistProfile from '@/pages/physiotherapist/Profile'
import BlogPage from '@/pages/public/BlogPage'
import EventsPage from '@/pages/public/EventsPage'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/search" element={<SearchPhysiotherapists />} />

          {/* Patient Routes */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />

          {/* Physiotherapist Routes */}
          <Route path="/physiotherapist/dashboard" element={<PhysiotherapistDashboard />} />
          <Route path="/physiotherapist/profile" element={<PhysiotherapistProfile />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
