import { Link } from 'react-router-dom'
import { Activity, Award, Phone, Mail } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthStore } from '@/stores/authStore'

const PhysiotherapistProfile = () => {
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
              <Link to="/physiotherapist/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => useAuthStore.getState().logout()}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-heading font-bold mb-8">My Profile</h1>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
            <TabsTrigger value="services">Service Packages</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500" />
                  <Button variant="outline">Change Photo</Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={user?.firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={user?.lastName} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="email" type="email" defaultValue={user?.email} className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="phone" type="tel" defaultValue={user?.phone} className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slmc">SLMC Registration Number</Label>
                  <Input id="slmc" placeholder="SLMC123456" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Tell patients about yourself and your experience..."
                  />
                </div>

                <Button className="gradient-primary">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qualifications">
            <Card>
              <CardHeader>
                <CardTitle>Qualifications & Specializations</CardTitle>
                <CardDescription>Add your educational background and areas of expertise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium">Bachelor of Physiotherapy</p>
                        <p className="text-sm text-gray-500">University of Colombo - 2018</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium">Sports Physiotherapy Certification</p>
                        <p className="text-sm text-gray-500">International Sports Medicine Institute - 2020</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                <Button variant="outline">
                  <Award className="w-4 h-4 mr-2" />
                  Add Qualification
                </Button>

                <div className="pt-6 border-t">
                  <h3 className="font-semibold mb-4">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                      Sports Physiotherapy
                    </span>
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                      Orthopedic
                    </span>
                    <Button variant="outline" size="sm">Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Service Packages</CardTitle>
                <CardDescription>Manage your pricing and service offerings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {['Basic', 'Standard', 'Premium'].map((tier) => (
                    <Card key={tier}>
                      <CardHeader>
                        <CardTitle className="text-lg">{tier}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Price (LKR)</Label>
                          <Input type="number" placeholder="3000" />
                        </div>
                        <div>
                          <Label>Duration (minutes)</Label>
                          <Input type="number" placeholder="60" />
                        </div>
                        <Button variant="outline" className="w-full">Edit Package</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Availability Schedule</CardTitle>
                <CardDescription>Set your working hours for each day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center gap-4 p-4 border rounded-lg">
                      <input type="checkbox" className="rounded" defaultChecked={day !== 'Sunday'} />
                      <span className="w-24 font-medium">{day}</span>
                      <Input type="time" defaultValue="09:00" className="w-32" />
                      <span>to</span>
                      <Input type="time" defaultValue="17:00" className="w-32" />
                    </div>
                  ))}
                </div>
                <Button className="mt-6 gradient-primary">Save Schedule</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default PhysiotherapistProfile
