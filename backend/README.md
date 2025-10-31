# PhysioConnect Backend API

RESTful API for the PhysioConnect physiotherapy marketplace platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6.0+

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret
```

### Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000/api`

### Seeding Sample Data

```bash
# Add sample physiotherapists to database
npm run seed
```

This will create 5 sample physiotherapist accounts with the password `password123`

## 📚 API Endpoints

### Physiotherapists

#### Register
```http
POST /api/physiotherapists/register
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+94771234567",
  "slmcNumber": "SLMC123",
  "experience": 5,
  "specializations": ["Sports Physiotherapy"],
  "address": {
    "city": "Colombo",
    "district": "Colombo"
  }
}
```

#### Login
```http
POST /api/physiotherapists/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get All Physiotherapists
```http
GET /api/physiotherapists?page=1&limit=10&district=Colombo&specialization=Sports
```

Query Parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Text search
- `district` - Filter by district
- `city` - Filter by city
- `specialization` - Filter by specialization
- `minRating` - Minimum rating
- `minPrice` - Minimum package price
- `maxPrice` - Maximum package price

#### Get Physiotherapist by ID
```http
GET /api/physiotherapists/:id
```

#### Update Physiotherapist
```http
PUT /api/physiotherapists/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "bio": "Updated bio...",
  "servicePackages": [...]
}
```

#### Get Districts
```http
GET /api/physiotherapists/districts
```

#### Get Specializations
```http
GET /api/physiotherapists/specializations
```

### Health Check
```http
GET /api/health
```

## 🗄️ Database Schema

### Physiotherapist Model

```javascript
{
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String,
  slmcNumber: String (unique),
  qualifications: [{
    degree: String,
    institution: String,
    year: Number,
    certificate: String
  }],
  specializations: [String],
  experience: Number,
  bio: String,
  address: {
    street: String,
    city: String,
    district: String,
    province: String,
    postalCode: String,
    country: String (default: 'Sri Lanka')
  },
  servicePackages: [{
    tier: String (basic|standard|premium),
    name: String,
    description: String,
    serviceType: String (home_visit|online_consultation|both),
    price: Number,
    duration: Number,
    features: [String],
    isActive: Boolean
  }],
  availability: [{
    dayOfWeek: Number (0-6),
    startTime: String,
    endTime: String,
    isActive: Boolean
  }],
  languages: [String],
  rating: Number (0-5),
  totalReviews: Number,
  isVerified: Boolean,
  isActive: Boolean,
  profileImage: String,
  certificateImages: [String],
  clinicImages: [String],
  timestamps: true
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

After login/registration, include the token in requests:

```http
Authorization: Bearer <your-token>
```

## 📝 Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/physioconnect
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173
```

## 🧪 Testing

Sample login credentials after seeding:

```
Email: nimal.perera@physioconnect.lk
Password: password123

Email: amara.silva@physioconnect.lk
Password: password123

Email: priya.fernando@physioconnect.lk
Password: password123
```

## 📦 Tech Stack

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment configuration
- **express-validator** - Input validation

## 🚧 Future Enhancements

- [ ] Image upload with Multer/Cloudinary
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Appointment booking endpoints
- [ ] Payment integration endpoints
- [ ] Review and rating endpoints
- [ ] Blog post endpoints
- [ ] Event management endpoints
- [ ] Real-time chat with Socket.io
- [ ] SMS notifications
- [ ] Admin dashboard endpoints
- [ ] Analytics endpoints

## 📄 License

MIT
