import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Search, MapPin, Star, Loader2, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { physiotherapistService } from '@/services/physiotherapistService'
import { formatCurrency } from '@/lib/utils'

interface Physiotherapist {
  _id: string
  firstName: string
  lastName: string
  specializations: string[]
  address: {
    city: string
    district: string
  }
  rating: number
  totalReviews: number
  experience: number
  servicePackages: Array<{
    price: number
  }>
  bio?: string
}

const SearchPhysiotherapists = () => {
  const [physiotherapists, setPhysiotherapists] = useState<Physiotherapist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('all')
  const [selectedSpecialization, setSelectedSpecialization] = useState('all')

  // Filter options
  const [districts, setDistricts] = useState<string[]>([])
  const [specializations, setSpecializations] = useState<string[]>([])

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [districtsRes, specsRes] = await Promise.all([
          physiotherapistService.getDistricts(),
          physiotherapistService.getSpecializations(),
        ])

        if (districtsRes.success) {
          setDistricts(districtsRes.data)
        }

        if (specsRes.success) {
          setSpecializations(specsRes.data)
        }
      } catch (err) {
        console.error('Error fetching filter options:', err)
      }
    }

    fetchFilterOptions()
  }, [])

  // Fetch physiotherapists
  useEffect(() => {
    const fetchPhysiotherapists = async () => {
      setLoading(true)
      setError('')

      try {
        const filters: any = {}

        if (searchTerm) {
          filters.search = searchTerm
        }

        if (selectedDistrict && selectedDistrict !== 'all') {
          filters.district = selectedDistrict
        }

        if (selectedSpecialization && selectedSpecialization !== 'all') {
          filters.specialization = [selectedSpecialization]
        }

        const response = await physiotherapistService.getAll({
          ...filters,
          page: 1,
          limit: 50,
        })

        if (response.success) {
          setPhysiotherapists(response.data)
        }
      } catch (err: any) {
        console.error('Error fetching physiotherapists:', err)
        setError('Failed to load physiotherapists. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchPhysiotherapists()
  }, [searchTerm, selectedDistrict, selectedSpecialization])

  const getPriceRange = (packages: Array<{ price: number }>) => {
    if (!packages || packages.length === 0) return 'Contact for pricing'

    const prices = packages.map(p => p.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)

    if (min === max) {
      return formatCurrency(min)
    }

    return `${formatCurrency(min)} - ${formatCurrency(max)}`
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedDistrict('all')
    setSelectedSpecialization('all')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-primary-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-heading font-bold text-primary-600">PhysioConnect</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="border-primary-200">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary-600 hover:bg-primary-700">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Stats */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary-700 mb-2">
            Find Your Physiotherapist
          </h1>
          <p className="text-gray-600">
            {loading ? (
              'Loading...'
            ) : (
              <>
                {physiotherapists.length} qualified physiotherapist{physiotherapists.length !== 1 ? 's' : ''} available
              </>
            )}
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-primary-100 shadow-md">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or specialization..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="All Districts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(searchTerm || (selectedDistrict && selectedDistrict !== 'all') || (selectedSpecialization && selectedSpecialization !== 'all')) && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Active filters: {[searchTerm && 'search', selectedDistrict !== 'all' && 'district', selectedSpecialization !== 'all' && 'specialization'].filter(Boolean).join(', ')}
                </p>
                <Button variant="outline" size="sm" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary-500 mx-auto mb-4" />
              <p className="text-gray-600">Finding physiotherapists for you...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <p className="text-red-700">{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {physiotherapists.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {physiotherapists.map((physio) => (
                  <Link key={physio._id} to={`/physiotherapist/${physio._id}`}>
                    <Card className="card-hover cursor-pointer border-primary-100 hover:border-primary-300 transition-all h-full">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
                            <User className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg text-primary-700">
                              Dr. {physio.firstName} {physio.lastName}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {physio.specializations.join(', ') || 'General Physiotherapy'}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {/* Location */}
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-primary-500" />
                            <span>{physio.address.city}, {physio.address.district}</span>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="font-semibold text-gray-900">{physio.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              ({physio.totalReviews} review{physio.totalReviews !== 1 ? 's' : ''})
                            </span>
                          </div>

                          {/* Experience */}
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">{physio.experience}</span> years experience
                          </div>

                          {/* Price */}
                          <div className="pt-3 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-900">
                              {getPriceRange(physio.servicePackages)}
                            </p>
                            <p className="text-xs text-gray-500">per session</p>
                          </div>

                          {/* Bio Preview */}
                          {physio.bio && (
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {physio.bio}
                            </p>
                          )}

                          <Button className="w-full bg-primary-600 hover:bg-primary-700 mt-2">
                            View Profile & Book
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No physiotherapists found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button onClick={handleClearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchPhysiotherapists
