import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  Activity,
  ArrowLeft,
  MapPin,
  Star,
  Award,
  Clock,
  CheckCircle2,
  Calendar,
  Video,
  Home,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { physiotherapistService } from '@/services/physiotherapistService'
import { formatCurrency } from '@/lib/utils'

interface Physiotherapist {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  slmcNumber: string
  specializations: string[]
  qualifications?: Array<{
    degree: string
    institution: string
    year: number
  }>
  experience: number
  bio?: string
  address: {
    street?: string
    city: string
    district: string
  }
  servicePackages: Array<{
    tier: 'basic' | 'standard' | 'premium'
    name: string
    description: string
    price: number
    duration: number
    features: string[]
  }>
  availability?: {
    days: string[]
    startTime: string
    endTime: string
  }
  rating: number
  totalReviews: number
  isVerified: boolean
}

const PhysiotherapistDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [physiotherapist, setPhysiotherapist] = useState<Physiotherapist | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPhysiotherapist = async () => {
      if (!id) return

      try {
        setLoading(true)
        const response = await physiotherapistService.getById(id)

        if (response.success) {
          setPhysiotherapist(response.data)
        } else {
          setError('Physiotherapist not found')
        }
      } catch (err) {
        console.error('Error fetching physiotherapist:', err)
        setError('Failed to load physiotherapist details')
      } finally {
        setLoading(false)
      }
    }

    fetchPhysiotherapist()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error || !physiotherapist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Activity className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/search')} className="bg-primary-600 hover:bg-primary-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>
    )
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic':
        return 'bg-gray-100 text-gray-700 border-gray-300'
      case 'standard':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'premium':
        return 'bg-purple-100 text-purple-700 border-purple-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getTierLabel = (tier: string) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-primary-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-heading font-bold text-primary-600">PhysioConnect</span>
            </Link>
            <Button variant="outline" onClick={() => navigate('/search')} className="border-primary-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 border-primary-100 shadow-lg">
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {physiotherapist.firstName.charAt(0)}{physiotherapist.lastName.charAt(0)}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-heading font-bold text-primary-700 mb-2">
                      Dr. {physiotherapist.firstName} {physiotherapist.lastName}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {physiotherapist.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary-100 text-primary-700">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {physiotherapist.isVerified && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-700">SLMC Verified</span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <div>
                      <div className="font-bold text-gray-900">{physiotherapist.rating.toFixed(1)}</div>
                      <div className="text-xs text-gray-500">{physiotherapist.totalReviews} reviews</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary-500" />
                    <div>
                      <div className="font-bold text-gray-900">{physiotherapist.experience} Years</div>
                      <div className="text-xs text-gray-500">Experience</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <div>
                      <div className="font-bold text-gray-900">{physiotherapist.address.district}</div>
                      <div className="text-xs text-gray-500">{physiotherapist.address.city}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary-500" />
                    <div>
                      <div className="font-bold text-gray-900">SLMC Reg.</div>
                      <div className="text-xs text-gray-500">{physiotherapist.slmcNumber}</div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {physiotherapist.bio && (
                  <p className="text-gray-700 leading-relaxed">{physiotherapist.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Qualifications */}
            {physiotherapist.qualifications && physiotherapist.qualifications.length > 0 && (
              <Card className="border-primary-100">
                <CardHeader>
                  <CardTitle className="text-primary-700 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {physiotherapist.qualifications.map((qual, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-primary-600 mt-1" />
                        <div>
                          <div className="font-semibold text-gray-900">{qual.degree}</div>
                          <div className="text-sm text-gray-600">{qual.institution}</div>
                          <div className="text-xs text-gray-500">{qual.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Service Packages */}
            <Card className="border-primary-100">
              <CardHeader>
                <CardTitle className="text-primary-700">Service Packages</CardTitle>
                <CardDescription>Choose the package that best suits your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {physiotherapist.servicePackages.map((pkg, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border-2 ${getTierColor(pkg.tier)} transition-all hover:shadow-lg`}
                    >
                      <div className="text-center mb-4">
                        <div className="text-xs font-bold uppercase mb-2">{getTierLabel(pkg.tier)}</div>
                        <div className="text-3xl font-bold text-gray-900">{formatCurrency(pkg.price)}</div>
                        <div className="text-sm text-gray-600">per session</div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Clock className="w-4 h-4 text-primary-500" />
                          <span>{pkg.duration} minutes</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            {physiotherapist.availability && (
              <Card className="border-primary-100">
                <CardHeader>
                  <CardTitle className="text-primary-700 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Availability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Working Days:</span>
                      <div className="flex flex-wrap gap-2">
                        {physiotherapist.availability.days.map((day, index) => (
                          <Badge key={index} variant="outline" className="border-primary-200">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary-500" />
                      <span className="text-gray-700">
                        {physiotherapist.availability.startTime} - {physiotherapist.availability.endTime}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <Card className="border-primary-200 shadow-xl sticky top-24">
              <CardHeader className="bg-gradient-to-br from-primary-50 to-blue-50">
                <CardTitle className="text-primary-700">Book Appointment</CardTitle>
                <CardDescription>Choose your preferred consultation type</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <Button
                  className="w-full bg-primary-600 hover:bg-primary-700 h-12 text-base"
                  onClick={() => navigate(`/book/${physiotherapist._id}?type=home`)}
                >
                  <Home className="w-5 h-5 mr-2" />
                  Book Home Visit
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-primary-200 hover:bg-primary-50 h-12 text-base"
                  onClick={() => navigate(`/book/${physiotherapist._id}?type=online`)}
                >
                  <Video className="w-5 h-5 mr-2" />
                  Book Online Consultation
                </Button>
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>No registration required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Secure payment</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhysiotherapistDetail
