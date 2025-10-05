const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [200, 'Course title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
    // index: true, // Removed to avoid duplicate index
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true,
    maxlength: [2000, 'Course description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: ['Computer Science', 'Office Management', 'Web Development', 'Graphics Design', 'Digital Marketing', 'Other'],
    default: 'Other'
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  duration: {
    weeks: {
      type: Number,
      required: [true, 'Course duration in weeks is required'],
      min: [1, 'Duration must be at least 1 week']
    },
    hoursPerWeek: {
      type: Number,
      default: 10
    }
  },
  fee: {
    amount: {
      type: Number,
      required: [true, 'Course fee is required'],
      min: [0, 'Course fee cannot be negative']
    },
    currency: {
      type: String,
      default: 'NPR'
    },
    installmentAvailable: {
      type: Boolean,
      default: false
    }
  },
  curriculum: [{
    week: {
      type: Number,
      required: true
    },
    topics: [{
      type: String,
      required: true,
      trim: true
    }]
  }],
  prerequisites: [{
    type: String,
    trim: true
  }],
  learningOutcomes: [{
    type: String,
    required: true,
    trim: true
  }],
  instructor: {
    name: {
      type: String,
      required: [true, 'Instructor name is required'],
      trim: true
    },
    qualification: {
      type: String,
      trim: true
    },
    experience: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      default: null
    }
  },
  schedule: {
    days: [{
      type: String,
      enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }],
    timeSlots: [{
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      }
    }]
  },
  capacity: {
    max: {
      type: Number,
      default: 25
    },
    current: {
      type: Number,
      default: 0
    }
  },
  startDate: {
    type: Date,
    required: [true, 'Course start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'Course end date is required']
  },
  registrationDeadline: {
    type: Date,
    required: [true, 'Registration deadline is required']
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'full', 'completed', 'cancelled'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: null
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  requirements: {
    equipment: [{
      type: String,
      trim: true
    }],
    software: [{
      type: String,
      trim: true
    }]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
courseSchema.index({ slug: 1 });
courseSchema.index({ category: 1, status: 1 });
courseSchema.index({ featured: -1, createdAt: -1 });
courseSchema.index({ startDate: 1, status: 1 });

// Virtual for available spots
courseSchema.virtual('availableSpots').get(function() {
  return Math.max(0, this.capacity.max - this.capacity.current);
});

// Virtual for total hours
courseSchema.virtual('totalHours').get(function() {
  return this.duration.weeks * this.duration.hoursPerWeek;
});

// Virtual for formatted fee
courseSchema.virtual('formattedFee').get(function() {
  return `${this.fee.currency} ${this.fee.amount.toLocaleString()}`;
});

// Pre-save middleware to generate slug
courseSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }
  
  // Ensure end date is after start date
  if (this.startDate && this.endDate && this.endDate <= this.startDate) {
    const error = new Error('End date must be after start date');
    return next(error);
  }
  
  next();
});

module.exports = mongoose.model('Course', courseSchema);
