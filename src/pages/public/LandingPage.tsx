import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Activity,
  Calendar,
  Heart,
  Shield,
  Star,
  Users,
  Video,
  MapPin,
  Award,
  CheckCircle2,
  Clock,
  CreditCard,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const LandingPage = () => {
  const features = [
    {
      icon: Users,
      title: 'Qualified Physiotherapists',
      description: 'Connect with verified and experienced physiotherapists across Sri Lanka',
    },
    {
      icon: MapPin,
      title: 'Home Visits',
      description: 'Book home visit appointments at your convenience',
    },
    {
      icon: Video,
      title: 'Online Consultations',
      description: 'Get professional care from the comfort of your home',
    },
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Schedule appointments with real-time availability',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Multiple payment options with PayHere integration',
    },
    {
      icon: Award,
      title: 'Certified Professionals',
      description: 'All physiotherapists are SLMC registered and verified',
    },
  ]

  const stats = [
    { icon: Users, value: '500+', label: 'Physiotherapists' },
    { icon: Heart, value: '10,000+', label: 'Happy Patients' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: MapPin, value: '25', label: 'Districts Covered' },
  ]

  const howItWorks = [
    {
      step: 1,
      title: 'Search & Filter',
      description: 'Find physiotherapists by location, specialization, and ratings',
      icon: Users,
    },
    {
      step: 2,
      title: 'Book Appointment',
      description: 'Select a time slot that works for you',
      icon: Calendar,
    },
    {
      step: 3,
      title: 'Secure Payment',
      description: 'Pay securely using multiple local payment methods',
      icon: Shield,
    },
    {
      step: 4,
      title: 'Get Treatment',
      description: 'Receive quality physiotherapy care at home or online',
      icon: Heart,
    },
  ]

  const trustBadges = [
    {
      icon: Award,
      title: 'SLMC Verified',
      description: 'All physiotherapists are registered with Sri Lanka Medical Council',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data is encrypted and protected with industry standards',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our support team is available round the clock to help you',
    },
    {
      icon: CreditCard,
      title: 'PayHere Verified',
      description: 'Secure payments through trusted Sri Lankan payment gateway',
    },
  ]

  const testimonials = [
    {
      name: 'Saman Perera',
      location: 'Colombo',
      rating: 5,
      text: 'Excellent service! Found a qualified physiotherapist within minutes and got treatment at home. The platform made everything so easy.',
      treatment: 'Sports Injury Recovery',
    },
    {
      name: 'Nishanthi Fernando',
      location: 'Kandy',
      rating: 5,
      text: 'The online consultation feature is fantastic. I could get professional advice without traveling. Highly recommend PhysioConnect!',
      treatment: 'Post-Surgery Rehabilitation',
    },
    {
      name: 'Rajith Silva',
      location: 'Galle',
      rating: 5,
      text: 'Professional physiotherapists, easy booking process, and transparent pricing. This is the future of healthcare in Sri Lanka.',
      treatment: 'Back Pain Management',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-secondary-50">
      {/* Navigation */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 border-b">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-heading font-bold hero-text">PhysioConnect</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/search" className="text-gray-700 hover:text-primary-500 transition-colors">
                Find Physiotherapist
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-primary-500 transition-colors">
                Blog
              </Link>
              <Link to="/events" className="text-gray-700 hover:text-primary-500 transition-colors">
                Events
              </Link>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-container pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
              <CheckCircle2 className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">SLMC Verified Professionals</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Quality <span className="hero-text">Physiotherapy</span> Care at Your Doorstep
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with qualified physiotherapists for home visits and online consultations across Sri Lanka.
              Book appointments, manage treatments, and recover faster with personalized care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/search">
                <Button size="lg" className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 h-14 px-8 text-base">
                  <Users className="w-5 h-5 mr-2" />
                  Find Physiotherapist
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-primary-200 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all">
                  Join as Physiotherapist
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 border-2 border-white flex items-center justify-center"
                    >
                      <Users className="w-5 h-5 text-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">10,000+ Happy Patients</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">24/7 Support Available</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 relative">
                {/* Placeholder for professional physiotherapy image */}
                <div className="absolute inset-0 flex items-center justify-center bg-primary-600">
                  <div className="text-center text-white">
                    <Activity className="w-32 h-32 mx-auto mb-4 opacity-90" />
                    <p className="text-lg font-medium opacity-75">Professional Physiotherapy Care</p>
                  </div>
                </div>

                {/* Overlay Stats Cards */}
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-3">
                  {stats.slice(0, 2).map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      className="glass p-4 rounded-xl backdrop-blur-md bg-white/90"
                    >
                      <stat.icon className="w-5 h-5 text-primary-600 mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -right-4 top-8 glass px-6 py-4 rounded-2xl shadow-lg bg-white"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Verified Physios</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-container bg-white/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Why Choose <span className="hero-text">PhysioConnect</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make it easy to find and connect with qualified physiotherapists for your recovery journey
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="section-container bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4 text-primary-700">
            Why Patients Trust PhysioConnect
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your health and safety are our top priorities
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl border-2 border-primary-100 hover:border-primary-300 transition-all hover:shadow-lg bg-gradient-to-br from-white to-primary-50"
            >
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <badge.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{badge.title}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold mb-4 text-primary-700">How It Works</h2>
          <p className="text-xl text-gray-600">Get started in just 4 simple steps</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 -translate-x-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-container bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold mb-4 text-primary-700">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real patients who found relief through PhysioConnect
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover h-full bg-white border-primary-100">
                <CardHeader>
                  <div className="flex items-center gap-1 text-yellow-500 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-base text-gray-700 italic mb-4">
                    "{testimonial.text}"
                  </CardDescription>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{testimonial.name}</CardTitle>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 inline-block px-3 py-1 bg-primary-50 rounded-full">
                      <p className="text-xs font-medium text-primary-700">{testimonial.treatment}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Start Your Healing Journey Today</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
              Ready to Experience Professional Physiotherapy Care?
            </h2>

            <p className="text-xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of patients across Sri Lanka who have found relief and recovery with our SLMC-verified physiotherapists. Book your first session today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/search">
                <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 h-14 px-8 text-base font-semibold shadow-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Find a Physiotherapist
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-2 border-white text-white h-14 px-8 text-base font-semibold">
                  Join as Professional
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-sm text-white/80">Verified Physiotherapists</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">10,000+</div>
                <div className="text-sm text-white/80">Happy Patients</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">4.9★</div>
                <div className="text-sm text-white/80">Average Rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
        <div className="section-container py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-heading font-bold">PhysioConnect</span>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Connecting patients with SLMC-verified physiotherapists across Sri Lanka for quality healthcare at home.
              </p>
              <div className="flex items-center gap-2 text-gray-400">
                <Award className="w-5 h-5 text-primary-400" />
                <span className="text-sm">SLMC Verified Platform</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">For Patients</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link to="/search" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Find Physiotherapist
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-primary-400 transition-colors">Health Blog</Link>
                </li>
                <li>
                  <Link to="/events" className="hover:text-primary-400 transition-colors">Wellness Events</Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="hover:text-primary-400 transition-colors">How It Works</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">For Physiotherapists</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link to="/register" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Join Platform
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-primary-400 transition-colors">Login</Link>
                </li>
                <li>
                  <Link to="/requirements" className="hover:text-primary-400 transition-colors">Requirements</Link>
                </li>
                <li>
                  <Link to="/benefits" className="hover:text-primary-400 transition-colors">Benefits</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 PhysioConnect. All rights reserved. Made with <Heart className="w-4 h-4 inline text-red-500" /> for healthcare in Sri Lanka
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Shield className="w-4 h-4 text-primary-400" />
                  <span>Secure Platform</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <CreditCard className="w-4 h-4 text-primary-400" />
                  <span>PayHere Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
