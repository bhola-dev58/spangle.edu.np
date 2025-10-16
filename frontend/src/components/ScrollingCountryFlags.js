
import React, { useRef } from 'react';
import './ScrollingCountryFlags.css';

const flagList = Array.from(new Set([
  'Australia.png', 'canada.png', 'china.jpg', 'india.jpg', 'Japanpng.png', 'russia.png', 'South_Korea.png', 'UK.jpg', 'USA.png'
]));

export default function ScrollingCountryFlags() {
  const scrollRef = useRef(null);

  const handleMouseEnter = () => {
    if (scrollRef.current) {
      scrollRef.current.style.animationPlayState = 'paused';
    }
  };
  const handleMouseLeave = () => {
    if (scrollRef.current) {
      scrollRef.current.style.animationPlayState = 'running';
    }
  };

  // Duplicate flags for seamless infinite scroll
  // Map flag filenames to country names
  const flagMap = {
    'Australia.png': 'Australia',
    'canada.png': 'Canada',
    'china.jpg': 'China',
    'india.jpg': 'India',
    'Japanpng.png': 'Japan',
    'russia.png': 'Russia',
    'South_Korea.png': 'South Korea',
    'UK.jpg': 'United Kingdom',
    'USA.png': 'United States'
  };
  const flags = [...flagList, ...flagList];

  return (
    <div className="country-flags-section py-10 px-2 bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col items-center">
      <h2 className="text-2xl font-extrabold text-center mb-6 text-blue-700 tracking-wide">We help students study abroad in these countries</h2>
      <div className="scrolling-flags-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="scrolling-flags" ref={scrollRef}>
          {flags.map((flag, idx) => (
            <div key={idx} className="flex flex-col items-center mx-6" style={{ marginRight: '2rem' }}>
              <img
                src={process.env.PUBLIC_URL + '/country/' + flag}
                alt={flagMap[flag] || flag.replace(/\.[^.]+$/, '')}
                className="flag-img h-16 w-auto inline-block rounded-lg shadow-lg border border-blue-100 bg-white"
              />
              <span className="mt-2 text-xs font-semibold text-gray-700 text-center w-20 truncate">{flagMap[flag] || flag.replace(/\.[^.]+$/, '')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
