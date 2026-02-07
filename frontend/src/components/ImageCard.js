import React from 'react';
import { getTeamImagePath } from '../utils/imageHelper';
import { StarIcon } from '@heroicons/react/24/solid';

export const StaffCard = ({ staff, imageHeight = 'h-64' }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-500 overflow-hidden group">
      <div className={`relative overflow-hidden ${imageHeight} bg-gray-100`}>
        <img
          src={getTeamImagePath(staff.image)}
          alt={staff.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x450/cccccc/666666?text=Staff+Member';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white font-medium text-sm border-l-2 border-orange-500 pl-2">
            {staff.experience} Years Experience
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">{staff.name}</h3>
        <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">{staff.position}</p>

        <div className="flex items-center mb-3 text-sm text-gray-600">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-600">{staff.department}</span>
        </div>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-4 h-4 ${i < (staff.rating || 5) ? 'text-orange-400' : 'text-gray-300'}`}
            />
          ))}
        </div>

        {staff.quote && (
          <p className="text-gray-500 text-sm italic line-clamp-2 border-l-2 border-gray-200 pl-3">
            "{staff.quote}"
          </p>
        )}
      </div>
    </div>
  );
};

export const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-orange-500 overflow-hidden group h-full flex flex-col">
      <div className="h-48 overflow-hidden bg-gray-200 relative">
        {/* Course Image or Placeholder */}
        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
          <span className="text-4xl">📚</span>
        </div>
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
          {course.category || 'Course'}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{course.description}</p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <span className="text-orange-600 font-bold">Rs. {course.price}</span>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-900">Details &rarr;</button>
        </div>
      </div>
    </div>
  )
}
