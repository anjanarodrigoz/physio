import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Mail, Lock, User, Phone, Stethoscope, MapPin, Briefcase, Award, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/hooks/use-toast'
import { physiotherapistService } from '@/services/physiotherapistService'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const login = useAuthStore((state) => state.login)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    slmcNumber: '',
    experience: '',
    specialization: '',
    city: '',
    district: '',
    bio: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Moneragala', 'Ratnapura', 'Kegalle'
  ]

  const specializations = [
    'Sports Physiotherapy',
    'Orthopedic Physiotherapy',
    'Neurological Physiotherapy',
    'Pediatric Physiotherapy',
    'Geriatric Physiotherapy',
    'Cardiopulmonary Physiotherapy',
    'Women\'s Health Physiotherapy',
    'Manual Therapy',
    'Rehabilitation',
    'Pain Management'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const registrationData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        slmcNumber: formData.slmcNumber,
        experience: parseInt(formData.experience),
        specializations: formData.specialization ? [formData.specialization] : [],
        bio: formData.bio || `Experienced physiotherapist specializing in ${formData.specialization || 'various treatments'}.`,
        address: {
          city: formData.city,
          district: formData.district,
        },
        servicePackages: [
          {
            tier: 'basic' as const,
            name: 'Basic Consultation',
            description: 'Initial assessment and treatment plan',
            serviceType: 'online_consultation' as const,
            price: 3000,
            duration: 45,
            features: ['Initial Assessment', 'Treatment Plan', 'Follow-up Call'],
          },
          {
            tier: 'standard' as const,
            name: 'Standard Treatment',
            description: 'Comprehensive treatment session',
            serviceType: 'home_visit' as const,
            price: 5000,
            duration: 60,
            features: ['Full Assessment', 'Treatment Session', 'Exercise Program', 'Progress Tracking'],
          },
        ],
        languages: ['English', 'Sinhala'],
      }

      const response = await physiotherapistService.register(registrationData)

      if (response.success) {
        // Store user data
        const userData = {
          id: response.data.id,
          email: response.data.email,
          role: 'physiotherapist' as const,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        login(userData)

        toast({
          title: 'Registration Successful! 🎉',
          description: `Welcome to PhysioConnect, Dr. ${formData.firstName}!`,
        })

        // Redirect to dashboard
        navigate('/physiotherapist/dashboard')
      }
    } catch (err: any) {
      console.error('Registration error:', err)
      const errorMessage = err.response?.data?.message || 'Failed to register. Please try again.'
      setError(errorMessage)
      toast({
        title: 'Registration Failed',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center">
            <Activity className="h-7 w-7 text-white" />
          </div>
          <span className="text-3xl font-heading font-bold text-primary-600">PhysioConnect</span>
        </Link>

        <Card className="glass border-primary-100">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-3xl font-heading text-center text-primary-700">
              Join as a Physiotherapist
            </CardTitle>
            <CardDescription className="text-center text-base">
              Create your professional profile and start connecting with patients
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary-700 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+94 77 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-primary-700 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  Professional Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="slmcNumber">SLMC Registration Number *</Label>
                  <div className="relative">
                    <Award className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="slmcNumber"
                      name="slmcNumber"
                      placeholder="SLMC123456"
                      value={formData.slmcNumber}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">Your Sri Lanka Medical Council registration number</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        min="0"
                        max="50"
                        placeholder="5"
                        value={formData.experience}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization *</Label>
                    <Select
                      value={formData.specialization}
                      onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-primary-700 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Practice Location
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district">District *</Label>
                    <Select
                      value={formData.district}
                      onValueChange={(value) => setFormData({ ...formData, district: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City name"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Brief Bio (Optional)</Label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Tell patients about yourself and your experience..."
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-4">
                <input type="checkbox" id="terms" className="mt-1 rounded border-gray-300" required />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-500 hover:underline font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary-500 hover:underline font-medium">
                    Privacy Policy
                  </Link>
                  . I confirm that all information provided is accurate.
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white h-12 text-base font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Physiotherapist Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:underline font-medium">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default RegisterPage
