const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Contact API methods
  async submitContact(contactData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Course API methods
  async getCourses(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/courses${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getFeaturedCourses(limit = 6) {
    return this.request(`/courses/featured?limit=${limit}`);
  }

  async getCourse(slug) {
    return this.request(`/courses/${slug}`);
  }

  // Enrollment API methods
  async submitEnrollment(enrollmentData) {
    return this.request('/enrollments', {
      method: 'POST',
      body: JSON.stringify(enrollmentData),
    });
  }

  // Testimonial API methods
  async getTestimonials(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/testimonials${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getFeaturedTestimonials(limit = 6) {
    return this.request(`/testimonials/featured?limit=${limit}`);
  }

  async submitTestimonial(testimonialData) {
    return this.request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonialData),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual methods for convenience
export const {
  submitContact,
  getCourses,
  getFeaturedCourses,
  getCourse,
  submitEnrollment,
  getTestimonials,
  getFeaturedTestimonials,
  submitTestimonial,
  healthCheck
} = apiService;
