import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Activity,
  ArrowLeft,
  Calendar,
  Home,
  Video,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Loader2,
  CreditCard
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
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
  servicePackages: Array<{
    tier: 'basic' | 'standard' | 'premium'
    name: string
    description: string
    price: number
    duration: number
  }>
}

interface BookingForm {
  patientName: string
  patientEmail: string
  patientPhone: string
  patientAddress: string
  selectedPackage: string
  appointmentDate: string
  appointmentTime: string
  notes: string
}

const BookingPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const consultationType = searchParams.get('type') || 'home'

  const [physiotherapist, setPhysiotherapist] = useState<Physiotherapist | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<BookingForm>({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientAddress: '',
    selectedPackage: '',
    appointmentDate: '',
    appointmentTime: '09:00',
    notes: ''
  })

  const [formErrors, setFormErrors] = useState<Partial<BookingForm>>({})

  useEffect(() => {
    const fetchPhysiotherapist = async () => {
      if (!id) return

      try {
        setLoading(true)
        const response = await physiotherapistService.getById(id)

        if (response.success) {
          setPhysiotherapist(response.data)
          // Set default package
          if (response.data.servicePackages.length > 0) {
            setFormData(prev => ({
              ...prev,
              selectedPackage: response.data.servicePackages[0].tier
            }))
          }
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

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const errors: Partial<BookingForm> = {}

    if (!formData.patientName.trim()) {
      errors.patientName = 'Name is required'
    }

    if (!formData.patientEmail.trim()) {
      errors.patientEmail = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.patientEmail)) {
      errors.patientEmail = 'Invalid email format'
    }

    if (!formData.patientPhone.trim()) {
      errors.patientPhone = 'Phone number is required'
    } else if (!/^[0-9]{10}$/.test(formData.patientPhone.replace(/[\s-]/g, ''))) {
      errors.patientPhone = 'Invalid phone number (10 digits required)'
    }

    if (consultationType === 'home' && !formData.patientAddress.trim()) {
      errors.patientAddress = 'Address is required for home visits'
    }

    if (!formData.selectedPackage) {
      errors.selectedPackage = 'Please select a package'
    }

    if (!formData.appointmentDate) {
      errors.appointmentDate = 'Appointment date is required'
    } else {
      const selectedDate = new Date(formData.appointmentDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        errors.appointmentDate = 'Date cannot be in the past'
      }
    }

    if (!formData.appointmentTime) {
      errors.appointmentTime = 'Appointment time is required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !physiotherapist) return

    setSubmitting(true)

    try {
      // Here you would call the backend API to create the booking
      const selectedPackage = physiotherapist.servicePackages.find(
        pkg => pkg.tier === formData.selectedPackage
      )

      const bookingData = {
        physiotherapistId: physiotherapist._id,
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        patientPhone: formData.patientPhone,
        patientAddress: consultationType === 'home' ? formData.patientAddress : '',
        consultationType,
        servicePackage: formData.selectedPackage,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        notes: formData.notes,
        totalAmount: selectedPackage?.price || 0
      }

      console.log('Booking data:', bookingData)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Navigate to confirmation page
      navigate('/booking/confirmation', {
        state: {
          booking: bookingData,
          physiotherapist: physiotherapist
        }
      })
    } catch (err) {
      console.error('Booking error:', err)
      setError('Failed to create booking. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const getSelectedPackage = () => {
    if (!physiotherapist || !formData.selectedPackage) return null
    return physiotherapist.servicePackages.find(pkg => pkg.tier === formData.selectedPackage)
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic':
        return 'bg-gray-100 text-gray-700'
      case 'standard':
        return 'bg-blue-100 text-blue-700'
      case 'premium':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  // Generate time slots
  const timeSlots = Array.from({ length: 18 }, (_, i) => {
    const hour = Math.floor((i + 16) / 2)
    const minute = (i % 2) * 30
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/search')} className="bg-primary-600 hover:bg-primary-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>
    )
  }

  const selectedPackage = getSelectedPackage()

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
            <Button
              variant="outline"
              onClick={() => navigate(`/physiotherapist/${id}`)}
              className="border-primary-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary-700 mb-2">
            Book Appointment
          </h1>
          <p className="text-gray-600">Fill in your details to complete the booking</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Physiotherapist Summary */}
              <Card className="border-primary-100">
                <CardHeader className="bg-primary-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-primary-700">
                        Dr. {physiotherapist.firstName} {physiotherapist.lastName}
                      </CardTitle>
                      <CardDescription>
                        {physiotherapist.specializations.join(', ')}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className={getTierColor(consultationType)}>
                      {consultationType === 'home' ? (
                        <><Home className="w-4 h-4 mr-1" />Home Visit</>
                      ) : (
                        <><Video className="w-4 h-4 mr-1" />Online</>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Patient Information */}
              <Card className="border-primary-100">
                <CardHeader>
                  <CardTitle className="text-primary-700">Your Information</CardTitle>
                  <CardDescription>No registration required - just provide your details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="patientName">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="patientName"
                        className="pl-10"
                        placeholder="Enter your full name"
                        value={formData.patientName}
                        onChange={(e) => handleInputChange('patientName', e.target.value)}
                      />
                    </div>
                    {formErrors.patientName && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.patientName}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientEmail">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="patientEmail"
                          type="email"
                          className="pl-10"
                          placeholder="your@email.com"
                          value={formData.patientEmail}
                          onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                        />
                      </div>
                      {formErrors.patientEmail && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.patientEmail}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="patientPhone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="patientPhone"
                          type="tel"
                          className="pl-10"
                          placeholder="07X XXX XXXX"
                          value={formData.patientPhone}
                          onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                        />
                      </div>
                      {formErrors.patientPhone && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.patientPhone}</p>
                      )}
                    </div>
                  </div>

                  {consultationType === 'home' && (
                    <div>
                      <Label htmlFor="patientAddress">
                        Address <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Textarea
                          id="patientAddress"
                          className="pl-10 min-h-[80px]"
                          placeholder="Enter your full address for home visit"
                          value={formData.patientAddress}
                          onChange={(e) => handleInputChange('patientAddress', e.target.value)}
                        />
                      </div>
                      {formErrors.patientAddress && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.patientAddress}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Service Package Selection */}
              <Card className="border-primary-100">
                <CardHeader>
                  <CardTitle className="text-primary-700">Select Package</CardTitle>
                  <CardDescription>Choose the service package that suits your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={formData.selectedPackage}
                    onValueChange={(value) => handleInputChange('selectedPackage', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent>
                      {physiotherapist.servicePackages.map((pkg) => (
                        <SelectItem key={pkg.tier} value={pkg.tier}>
                          {pkg.name} - {formatCurrency(pkg.price)} ({pkg.duration} min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.selectedPackage && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.selectedPackage}</p>
                  )}

                  {selectedPackage && (
                    <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{selectedPackage.name}</h4>
                      <p className="text-sm text-gray-600">{selectedPackage.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Appointment Date & Time */}
              <Card className="border-primary-100">
                <CardHeader>
                  <CardTitle className="text-primary-700">Appointment Schedule</CardTitle>
                  <CardDescription>Select your preferred date and time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="appointmentDate">
                        Date <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none z-10" />
                        <Input
                          id="appointmentDate"
                          type="date"
                          className="pl-10"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.appointmentDate}
                          onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                        />
                      </div>
                      {formErrors.appointmentDate && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.appointmentDate}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="appointmentTime">
                        Time <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.appointmentTime}
                        onValueChange={(value) => handleInputChange('appointmentTime', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.appointmentTime && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.appointmentTime}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card className="border-primary-100">
                <CardHeader>
                  <CardTitle className="text-primary-700">Additional Notes (Optional)</CardTitle>
                  <CardDescription>Any special requirements or medical history to share</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="E.g., specific areas of concern, previous treatments, etc."
                    className="min-h-[100px]"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                  />
                </CardContent>
              </Card>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="border-primary-200 shadow-xl sticky top-24">
              <CardHeader className="bg-gradient-to-br from-primary-50 to-blue-50">
                <CardTitle className="text-primary-700">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Consultation Type:</span>
                    <span className="font-medium text-gray-900">
                      {consultationType === 'home' ? 'Home Visit' : 'Online'}
                    </span>
                  </div>
                  {selectedPackage && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Package:</span>
                        <span className="font-medium text-gray-900">{selectedPackage.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium text-gray-900">{selectedPackage.duration} minutes</span>
                      </div>
                    </>
                  )}
                  {formData.appointmentDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(formData.appointmentDate).toLocaleDateString()}, {formData.appointmentTime}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary-700">
                    {selectedPackage ? formatCurrency(selectedPackage.price) : formatCurrency(0)}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Instant booking confirmation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Email & SMS notification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Secure payment processing</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 h-12 text-base mt-6"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceed to Payment
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  By booking, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
