import React from 'react';

const ImageCard = ({ 
  image, 
  alt, 
  title, 
  subtitle,
  description,
  badge,
  actions,
  imageHeight = 'h-64',
  imageObjectFit = 'object-cover',
  showOverlay = false,
  className = '',
  imageClassName = '',
  children
}) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x256/6366f1/white?text=Image+Not+Found';
  };

  return (
    <div className={`card group ${className}`}>
      {image && (
        <div className="relative overflow-hidden rounded-t-xl -mx-6 -mt-6 mb-6">
          <img
            src={image}
            alt={alt || title}
            className={`w-full ${imageHeight} ${imageObjectFit} transition-transform duration-500 group-hover:scale-110 ${imageClassName}`}
            onError={handleImageError}
          />
          {showOverlay && (
            <div className="image-overlay"></div>
          )}
          {badge && (
            <div className="absolute top-4 right-4 z-10">
              {badge}
            </div>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        {title && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-2">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {description && (
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        )}
        
        {children}
        
        {actions && (
          <div className="pt-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

// Predefined variations
export const CourseCard = ({ course, actions, ...props }) => (
  <ImageCard
    image={course.image}
    title={course.title}
    subtitle={course.category}
    description={course.description}
    badge={
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        course.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
        course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {course.level || 'All Levels'}
      </span>
    }
    actions={actions}
    showOverlay={true}
    {...props}
  />
);

export const StaffCard = ({ staff, ...props }) => (
  <ImageCard
    image={staff.image}
    title={staff.name}
    subtitle={staff.position}
    description={staff.quote}
    showOverlay={true}
    imageHeight="h-80"
    {...props}
  >
    <div className="space-y-2">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {staff.department} • {staff.experience} years experience
      </p>
      {staff.rating && (
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < staff.rating ? 'text-yellow-400' : 'text-gray-300'
              } fill-current`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {staff.rating}/5
          </span>
        </div>
      )}
    </div>
  </ImageCard>
);

export default ImageCard;
