import React from 'react';
import { getTeamImagePath } from '../utils/imageHelper';

const ImageCard = ({ 
  image, 
  alt, 
  title, 
  subtitle,
  description,
  badge,
  actions,
  imageHeight = 'h-80',
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
    <div className={`card group border border-blue-200 dark:border-blue-700 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 ${className} w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto transition-transform duration-300 hover:scale-[1.02]`}> 
      <div className="flex flex-col">
        {image && (
          <div className={`relative ${imageHeight} w-full flex-shrink-0 bg-blue-100 dark:bg-gray-800`}>
            <img
              src={image}
              alt={alt || title}
              className={`w-full h-full ${imageObjectFit} transition-transform duration-500 group-hover:scale-110 ${imageClassName} rounded-t-2xl`}
              onError={handleImageError}
              style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
            />
            {showOverlay && (
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent dark:from-black/40 dark:via-transparent dark:to-transparent pointer-events-none rounded-t-2xl"></div>
            )}
            {badge && (
              <div className="absolute top-4 right-4 z-10">
                {badge}
              </div>
            )}
          </div>
        )}
  <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
          {title && (
            <div>
              <h3 className="text-2xl font-extrabold text-blue-900 dark:text-yellow-300 mb-2">
                {title}
              </h3>
              {subtitle && (
                <p className="text-base text-blue-700 dark:text-blue-200 font-semibold mb-2">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {description && (
            <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
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

export const StaffCard = ({ staff, ...props }) => {
  const imageSrc = getTeamImagePath(staff.image);
  
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl overflow-hidden group flex flex-row items-center max-w-3xl mx-auto transition-transform duration-300 hover:scale-[1.02] min-h-[176px] w-full">
      <div className="relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32 flex-shrink-0 ml-6">
        <img
          src={imageSrc}
          alt={staff.name}
          className="w-24 h-24 md:w-28 md:h-28 object-cover transition-transform duration-500 group-hover:scale-105 rounded-full border-4 border-blue-200 bg-white shadow-lg"
          onError={e => { e.target.src = 'https://via.placeholder.com/112x112/6366f1/white?text=Image+Not+Found'; }}
        />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent dark:from-black/40 dark:via-transparent dark:to-transparent pointer-events-none rounded-full"></div>
    </div>
    <div className="flex-1 px-6 py-4 flex flex-col justify-center min-w-0">
      <h3 className="text-xl md:text-2xl font-extrabold text-blue-900 dark:text-yellow-300 mb-1 leading-tight">{staff.name}</h3>
      <p className="text-base md:text-lg font-semibold text-blue-700 dark:text-blue-200 mb-1">{staff.position}</p>
      <p className="text-sm md:text-base text-blue-800 dark:text-blue-200 mb-2">{staff.department}</p>
      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-200 mb-2">{staff.experience} years of experience</p>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className={`w-4 h-4 md:w-5 md:h-5 ${i < staff.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          >
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        ))}
        <span className="ml-2 text-sm md:text-base text-blue-900 dark:text-yellow-300 font-medium">{staff.rating}/5</span>
      </div>
      <blockquote className="text-blue-800 dark:text-blue-200 italic border-l-4 border-blue-500 pl-3 md:pl-4 text-xs md:text-base">{staff.quote}</blockquote>
    </div>
  </div>
  );
};

export default ImageCard;
