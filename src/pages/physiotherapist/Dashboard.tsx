import { Link } from 'react-router-dom'
import { Activity, Calendar, DollarSign, Users, FileText, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'

const PhysiotherapistDashboard = () => {
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
                Welcome, Dr. {user?.firstName}!
              </span>
              <Button variant="outline" size="sm" onClick={() => useAuthStore.getState().logout()}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-heading font-bold mb-8">Physiotherapist Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No patients yet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">LKR 0</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.0</div>
              <p className="text-xs text-muted-foreground">0 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="card-hover cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Manage Profile</CardTitle>
              <CardDescription>Update your qualifications and services</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/physiotherapist/profile">
                <Button className="w-full">Edit Profile</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>Manage your availability</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Calendar</Button>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Service Packages</CardTitle>
              <CardDescription>Manage pricing tiers</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Edit Packages</Button>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Write Blog Post</CardTitle>
              <CardDescription>Share your expertise</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Create Post</Button>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mb-2">
                <Activity className="w-6 h-6 text-amber-600" />
              </div>
              <CardTitle>Create Event</CardTitle>
              <CardDescription>Host workshops or webinars</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">New Event</Button>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>Patient Records</CardTitle>
              <CardDescription>View treatment history</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Records</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PhysiotherapistDashboard
