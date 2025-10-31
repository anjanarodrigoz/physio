import { Link } from 'react-router-dom'
import { Activity, Search, MapPin, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const SearchPhysiotherapists = () => {
  const mockPhysiotherapists = [
    {
      id: '1',
      name: 'Dr. Nimal Perera',
      specialization: 'Sports Physiotherapy',
      location: 'Colombo',
      rating: 4.9,
      reviews: 120,
      price: 'LKR 3,000 - 5,000',
      image: null,
    },
    {
      id: '2',
      name: 'Dr. Amara Silva',
      specialization: 'Orthopedic Physiotherapy',
      location: 'Kandy',
      rating: 4.8,
      reviews: 95,
      price: 'LKR 2,500 - 4,500',
      image: null,
    },
    {
      id: '3',
      name: 'Dr. Priya Fernando',
      specialization: 'Neurological Physiotherapy',
      location: 'Galle',
      rating: 5.0,
      reviews: 150,
      price: 'LKR 3,500 - 6,000',
      image: null,
    },
  ]

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
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-heading font-bold mb-8">Find a Physiotherapist</h1>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or specialization..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="colombo">Colombo</SelectItem>
                  <SelectItem value="kandy">Kandy</SelectItem>
                  <SelectItem value="galle">Galle</SelectItem>
                  <SelectItem value="jaffna">Jaffna</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sports">Sports Physiotherapy</SelectItem>
                  <SelectItem value="orthopedic">Orthopedic</SelectItem>
                  <SelectItem value="neurological">Neurological</SelectItem>
                  <SelectItem value="pediatric">Pediatric</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPhysiotherapists.map((physio) => (
            <Card key={physio.id} className="card-hover cursor-pointer">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500" />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{physio.name}</CardTitle>
                    <CardDescription>{physio.specialization}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{physio.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold">{physio.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({physio.reviews} reviews)
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium text-gray-900">{physio.price}</p>
                    <p className="text-xs text-gray-500">per session</p>
                  </div>
                  <Button className="w-full">View Profile & Book</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results message for empty state */}
        {mockPhysiotherapists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No physiotherapists found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPhysiotherapists
