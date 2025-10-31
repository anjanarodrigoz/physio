import { Link } from 'react-router-dom'
import { Activity, Calendar, MapPin, Users, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const EventsPage = () => {
  const mockEvents = [
    {
      id: '1',
      title: 'Sports Injury Prevention Workshop',
      description: 'Learn techniques to prevent common sports injuries and improve athletic performance.',
      organizer: 'Dr. Nimal Perera',
      date: '2025-02-15',
      startTime: '14:00',
      endTime: '17:00',
      type: 'workshop',
      location: 'Colombo Sports Complex',
      isOnline: false,
      price: 2500,
      capacity: 50,
      registered: 32,
      image: null,
    },
    {
      id: '2',
      title: 'Online Webinar: Managing Chronic Pain',
      description: 'Expert insights on managing chronic pain through physiotherapy and lifestyle changes.',
      organizer: 'Dr. Amara Silva',
      date: '2025-02-20',
      startTime: '19:00',
      endTime: '20:30',
      type: 'webinar',
      isOnline: true,
      price: 0,
      capacity: 200,
      registered: 145,
      image: null,
    },
    {
      id: '3',
      title: 'Free Health Camp - Posture Assessment',
      description: 'Free posture assessment and consultation for office workers and students.',
      organizer: 'Dr. Priya Fernando',
      date: '2025-02-25',
      startTime: '09:00',
      endTime: '15:00',
      type: 'health_camp',
      location: 'Kandy City Center',
      isOnline: false,
      price: 0,
      capacity: 100,
      registered: 67,
      image: null,
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'bg-blue-100 text-blue-800'
      case 'webinar':
        return 'bg-purple-100 text-purple-800'
      case 'health_camp':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
              <Link to="/search" className="text-gray-700 hover:text-primary-500 transition-colors">
                Find Physiotherapist
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-primary-500 transition-colors">
                Blog
              </Link>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Physiotherapy Events & Workshops
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join workshops, webinars, and health camps to learn from expert physiotherapists
          </p>
        </div>
      </section>

      {/* Events List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockEvents.map((event) => (
            <Card key={event.id} className="card-hover cursor-pointer">
              <CardHeader>
                <div className="w-full h-48 rounded-lg bg-gradient-to-br from-primary-400 to-secondary-500 mb-4 flex items-center justify-center">
                  <Activity className="w-16 h-16 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getEventTypeColor(event.type)}>
                    {event.type.replace('_', ' ')}
                  </Badge>
                  {event.price === 0 && <Badge variant="secondary">Free</Badge>}
                </div>
                <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                <CardDescription className="line-clamp-3">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
                {event.isOnline ? (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Activity className="w-4 h-4" />
                    <span>Online Event</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{event.registered} / {event.capacity} registered</span>
                </div>
                {event.price > 0 && (
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <DollarSign className="w-4 h-4" />
                    <span>LKR {event.price.toLocaleString()}</span>
                  </div>
                )}
                <Button className="w-full mt-4">
                  {event.price === 0 ? 'Register Now' : 'Register & Pay'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventsPage
