const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Authentication Info
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    // Removed index: true to avoid duplicate index
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  
  // Personal Information
  profile: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say'],
      required: [true, 'Gender is required']
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\+]?[0-9\s\-\(\)]{10,15}$/, 'Please enter a valid phone number']
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'Nepal'
      }
    },
    profilePicture: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    }
  },
  
  // Educational Information
  educationalProfile: {
    studentId: {
      type: String,
      unique: true,
      sparse: true // Allow null values but ensure uniqueness when present
      // Removed index: true to avoid duplicate index
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    academicLevel: {
      type: String,
      enum: ['high-school', 'intermediate', 'bachelor', 'master', 'phd', 'other'],
      default: 'other'
    },
    institution: {
      type: String,
      trim: true
    },
    specialization: {
      type: String,
      trim: true
    },
    enrolledCourses: [{
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
        // Removed index: true to avoid duplicate index
      },
      enrollmentDate: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['enrolled', 'in-progress', 'completed', 'dropped'],
        default: 'enrolled'
      },
      progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
      },
      completionDate: Date,
      grade: String,
      certificates: [{
        name: String,
        issueDate: Date,
        certificateUrl: String
      }]
    }],
    achievements: [{
      title: String,
      description: String,
      dateEarned: Date,
      category: {
        type: String,
        enum: ['academic', 'project', 'competition', 'certification', 'other'],
        default: 'other'
      }
    }],
    skills: [{
      name: String,
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'beginner'
      },
      verified: {
        type: Boolean,
        default: false
      }
    }],
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
      email: String
    }
  },
  
  // Account Settings
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // Preferences
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      },
      courseUpdates: {
        type: Boolean,
        default: true
      },
      assignmentReminders: {
        type: Boolean,
        default: true
      }
    },
    privacy: {
      shareProfile: {
        type: Boolean,
        default: false
      },
      shareProgress: {
        type: Boolean,
        default: false
      }
    },
    language: {
      type: String,
      default: 'en'
    },
    timezone: {
      type: String,
      default: 'Asia/Kathmandu'
    }
  },
  
  // Activity Tracking
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ 'profile.firstName': 1, 'profile.lastName': 1 });
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ 'educationalProfile.studentId': 1 });
userSchema.index({ 'educationalProfile.enrolledCourses.courseId': 1 });

// Virtual for full name
userSchema.virtual('profile.fullName').get(function() {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});

// Virtual for age
userSchema.virtual('profile.age').get(function() {
  if (!this.profile.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.profile.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual for enrolled courses count
userSchema.virtual('educationalProfile.enrolledCoursesCount').get(function() {
  return this.educationalProfile.enrolledCourses?.length || 0;
});

// Virtual for completed courses count
userSchema.virtual('educationalProfile.completedCoursesCount').get(function() {
  return this.educationalProfile.enrolledCourses?.filter(course => course.status === 'completed').length || 0;
});

// Virtual for account locked status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to handle failed login attempts
userSchema.methods.incrementLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // If we're at max attempts and not locked, lock account for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Instance method to get safe user data (without password)
userSchema.methods.toSafeObject = function() {
  const user = this.toObject();
  delete user.password;
  delete user.passwordResetToken;
  delete user.passwordResetExpires;
  delete user.emailVerificationToken;
  delete user.loginAttempts;
  delete user.lockUntil;
  return user;
};

module.exports = mongoose.model('User', userSchema);
