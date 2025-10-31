import { Link } from 'react-router-dom'
import { Activity, Calendar, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const BlogPage = () => {
  const mockPosts = [
    {
      id: '1',
      title: '5 Essential Exercises for Lower Back Pain Relief',
      excerpt: 'Learn effective exercises that can help alleviate lower back pain and improve your mobility.',
      author: 'Dr. Nimal Perera',
      date: '2025-01-15',
      category: 'Treatment Tips',
      image: null,
      readTime: '5 min read',
    },
    {
      id: '2',
      title: 'Understanding Sports Injuries: Prevention and Recovery',
      excerpt: 'A comprehensive guide to common sports injuries and how physiotherapy can aid in recovery.',
      author: 'Dr. Amara Silva',
      date: '2025-01-12',
      category: 'Sports Physiotherapy',
      image: null,
      readTime: '8 min read',
    },
    {
      id: '3',
      title: 'The Benefits of Early Physiotherapy Intervention',
      excerpt: 'Why seeking physiotherapy treatment early can lead to better outcomes and faster recovery.',
      author: 'Dr. Priya Fernando',
      date: '2025-01-10',
      category: 'Health & Wellness',
      image: null,
      readTime: '6 min read',
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
              <Link to="/search" className="text-gray-700 hover:text-primary-500 transition-colors">
                Find Physiotherapist
              </Link>
              <Link to="/events" className="text-gray-700 hover:text-primary-500 transition-colors">
                Events
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
            Physiotherapy Blog & Resources
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Expert insights, treatment tips, and health advice from qualified physiotherapists
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPosts.map((post) => (
            <Card key={post.id} className="card-hover cursor-pointer">
              <CardHeader>
                <div className="w-full h-48 rounded-lg bg-gradient-to-br from-primary-400 to-secondary-500 mb-4" />
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
