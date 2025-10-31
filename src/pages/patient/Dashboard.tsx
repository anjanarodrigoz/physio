import { Link } from 'react-router-dom'
import { Activity, Calendar, FileText, MessageCircle, Clock, Heart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'

const PatientDashboard = () => {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-heading font-bold hero-text">PhysioConnect</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.firstName}!
              </span>
              <Button variant="outline" size="sm" onClick={() => useAuthStore.getState().logout()}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-heading font-bold mb-8">Patient Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="card-hover cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Book Appointment</CardTitle>
              <CardDescription>Find and book a physiotherapist</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/search">
                <Button className="w-full">Search Physiotherapists</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>View your scheduled sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-gray-500">No appointments yet</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Treatment History</CardTitle>
              <CardDescription>Access your medical records</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-gray-500">No history yet</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Chat with your physiotherapist</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-gray-500">No messages</p>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-amber-600" />
              </div>
              <CardTitle>Blog & Resources</CardTitle>
              <CardDescription>Learn about physiotherapy</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/blog">
                <Button variant="outline" className="w-full">Browse Articles</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-2">
                <Activity className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>Events</CardTitle>
              <CardDescription>Join workshops & webinars</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/events">
                <Button variant="outline" className="w-full">View Events</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
