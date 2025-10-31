import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  Video,
  Download,
  Share2
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

const BookingConfirmation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { booking, physiotherapist } = location.state || {}

  useEffect(() => {
    // Redirect if no booking data
    if (!booking || !physiotherapist) {
      navigate('/search')
    }
  }, [booking, physiotherapist, navigate])

  if (!booking || !physiotherapist) {
    return null
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PhysioConnect Booking Confirmation',
          text: `Your appointment with Dr. ${physiotherapist.firstName} ${physiotherapist.lastName} is confirmed!`,
        })
      } catch (err) {
        console.error('Share failed:', err)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-primary-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-heading font-bold text-primary-600">PhysioConnect</span>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your appointment has been successfully scheduled
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="mb-6 border-primary-100 shadow-lg">
          <CardHeader className="bg-gradient-to-br from-primary-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-primary-700">Appointment Details</CardTitle>
                <CardDescription>Booking Reference: #{Date.now().toString().slice(-8)}</CardDescription>
              </div>
              <Badge
                variant="secondary"
                className={
                  booking.consultationType === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }
              >
                {booking.consultationType === 'home' ? (
                  <>
                    <Home className="w-4 h-4 mr-1" />
                    Home Visit
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-1" />
                    Online Consultation
                  </>
                )}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Physiotherapist Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary-500" />
                  Physiotherapist
                </h3>
                <div className="space-y-2 pl-7">
                  <p className="font-medium text-gray-900">
                    Dr. {physiotherapist.firstName} {physiotherapist.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {physiotherapist.specializations.join(', ')}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {physiotherapist.address.city}, {physiotherapist.address.district}
                  </p>
                </div>
              </div>

              {/* Patient Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary-500" />
                  Patient Information
                </h3>
                <div className="space-y-2 pl-7">
                  <p className="font-medium text-gray-900">{booking.patientName}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {booking.patientEmail}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {booking.patientPhone}
                  </p>
                  {booking.patientAddress && (
                    <p className="text-sm text-gray-600 flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      <span>{booking.patientAddress}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Appointment Schedule */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  Schedule
                </h3>
                <div className="space-y-2 pl-7">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Date:</span>{' '}
                    {new Date(booking.appointmentDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Time:</span> {booking.appointmentTime}
                  </p>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  Payment
                </h3>
                <div className="space-y-2 pl-7">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Package:</span> {booking.servicePackage}
                  </p>
                  <p className="text-2xl font-bold text-primary-700">
                    {formatCurrency(booking.totalAmount)}
                  </p>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Payment Pending
                  </Badge>
                </div>
              </div>
            </div>

            {booking.notes && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Additional Notes</h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">{booking.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-6 border-primary-100">
          <CardHeader>
            <CardTitle className="text-primary-700">Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Confirmation Email:</strong> A confirmation email with appointment details has been sent to{' '}
                  {booking.patientEmail}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>SMS Reminder:</strong> You will receive an SMS reminder 24 hours before your appointment
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Cancellation:</strong> You can cancel or reschedule up to 24 hours before the appointment
                </span>
              </li>
              {booking.consultationType === 'online' && (
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Online Session:</strong> A video call link will be sent to your email 30 minutes before the
                    appointment
                  </span>
                </li>
              )}
              {booking.consultationType === 'home' && (
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Home Visit:</strong> The physiotherapist will arrive at your provided address at the
                    scheduled time
                  </span>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="border-primary-200 hover:bg-primary-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Print Confirmation
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            className="border-primary-200 hover:bg-primary-50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            onClick={() => navigate('/search')}
            className="bg-primary-600 hover:bg-primary-700"
          >
            Book Another Appointment
          </Button>
        </div>

        {/* Need Help */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <Link to="/contact" className="text-primary-600 hover:underline font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation
