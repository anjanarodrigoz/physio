export type UserRole = "patient" | "physiotherapist" | "admin"

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled"

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded"

export type ServiceType = "home_visit" | "online_consultation"

export type PackageTier = "basic" | "standard" | "premium"

export interface User {
  id: string
  email: string
  role: UserRole
  firstName: string
  lastName: string
  phone: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface Patient extends User {
  role: "patient"
  dateOfBirth?: string
  address?: string
  medicalHistory?: string[]
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

export interface Physiotherapist extends User {
  role: "physiotherapist"
  qualifications: Qualification[]
  specializations: string[]
  experience: number
  rating: number
  totalReviews: number
  bio: string
  slmcNumber: string // Sri Lanka Medical Council registration number
  address: Address
  servicePackages: ServicePackage[]
  availability: Availability[]
  isVerified: boolean
  languages: string[]
}

export interface Qualification {
  id: string
  degree: string
  institution: string
  year: number
  certificate?: string
}

export interface Address {
  street: string
  city: string
  district: string
  province: string
  postalCode: string
  country: string
}

export interface ServicePackage {
  id: string
  physiotherapistId: string
  tier: PackageTier
  name: string
  description: string
  serviceType: ServiceType
  price: number
  duration: number // in minutes
  features: string[]
  isActive: boolean
}

export interface Availability {
  id: string
  physiotherapistId: string
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  isActive: boolean
}

export interface Appointment {
  id: string
  patientId: string
  physiotherapistId: string
  packageId: string
  date: string
  startTime: string
  endTime: string
  status: AppointmentStatus
  serviceType: ServiceType
  notes?: string
  symptoms?: string
  payment?: Payment
  prescription?: Prescription
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  appointmentId: string
  amount: number
  currency: string
  status: PaymentStatus
  paymentMethod: string
  payHereOrderId?: string
  platformFee: number
  physiotherapistAmount: number
  transactionId?: string
  createdAt: string
  completedAt?: string
}

export interface Prescription {
  id: string
  appointmentId: string
  exercises: Exercise[]
  notes: string
  duration: number // days
  createdAt: string
}

export interface Exercise {
  id: string
  name: string
  description: string
  videoUrl?: string
  imageUrl?: string
  sets: number
  reps: number
  frequency: string
}

export interface Review {
  id: string
  patientId: string
  physiotherapistId: string
  appointmentId: string
  rating: number
  comment: string
  createdAt: string
}

export interface BlogPost {
  id: string
  authorId: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  category: string
  tags: string[]
  status: "draft" | "published"
  views: number
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: string
  organizerId: string
  title: string
  slug: string
  description: string
  eventType: "workshop" | "webinar" | "health_camp"
  coverImage?: string
  location?: Address
  isOnline: boolean
  meetingLink?: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  capacity: number
  registeredCount: number
  price: number
  isFree: boolean
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface EventRegistration {
  id: string
  eventId: string
  userId: string
  ticketId: string
  qrCode: string
  status: "registered" | "attended" | "cancelled"
  payment?: Payment
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "appointment" | "payment" | "event" | "system"
  isRead: boolean
  link?: string
  createdAt: string
}

export interface ChatMessage {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  message: string
  isRead: boolean
  createdAt: string
}

export interface SearchFilters {
  location?: string
  district?: string
  specialization?: string[]
  minPrice?: number
  maxPrice?: number
  minRating?: number
  serviceType?: ServiceType
  languages?: string[]
  availability?: string
}
