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
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Quality <span className="hero-text">Physiotherapy</span> Care at Your Doorstep
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with qualified physiotherapists for home visits and online consultations across Sri Lanka.
              Book appointments, manage treatments, and recover faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/search">
                <Button size="lg" className="w-full sm:w-auto gradient-primary">
                  Find Physiotherapist
                </Button>
              </Link>
              <Link to="/register?role=physiotherapist">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Join as Physiotherapist
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Trusted by 10,000+ patients</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-3xl p-8 card-hover">
              <div className="aspect-square rounded-2xl gradient-primary flex items-center justify-center">
                <Activity className="w-32 h-32 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/50 rounded-xl">
                    <stat.icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
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

      {/* How It Works */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold mb-4">How It Works</h2>
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
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 -translate-x-1/2" />
              )}
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
          className="gradient-primary rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Ready to Start Your Recovery Journey?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of patients who have found relief with our qualified physiotherapists
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-primary-600">
                Get Started Today
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Activity className="h-8 w-8 text-primary-400" />
                <span className="text-xl font-heading font-bold">PhysioConnect</span>
              </Link>
              <p className="text-gray-400">
                Connecting patients with qualified physiotherapists across Sri Lanka
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Patients</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/search" className="hover:text-white transition-colors">Find Physiotherapist</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Physiotherapists</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register?role=physiotherapist" className="hover:text-white transition-colors">Join Platform</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 PhysioConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
