import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
  ChevronLeftIcon as ChevronLeft,
  ChevronRightIcon as ChevronRight
} from '@heroicons/react/24/outline';
import { StarIcon as Star } from '@heroicons/react/24/solid';
import ScrollingCountryFlags from '../components/ScrollingCountryFlags';
import '../components/ScrollingCountryFlags.css';


const Home = () => {
  const [isVisible, setIsVisible] = useState({});


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id^="section-"]');
    elements.forEach((el) => observer.observe(el));

    // Add parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');

      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      title: 'Expert Faculty',
      description: 'Learn from experienced and qualified instructors dedicated to your success.',
      icon: AcademicCapIcon,
    },
    {
      title: 'Modern Facilities',
      description: 'State-of-the-art computer labs and learning resources for optimal education.',
      icon: ComputerDesktopIcon,
    },
    {
      title: 'Career Support',
      description: 'Comprehensive guidance and support for your academic and professional journey.',
      icon: UserGroupIcon,
    }
  ];

  const testimonials = [
    {
      name: 'Raj Kumar Sharma',
      course: 'Computer Science',
      rating: 5,
      comment: 'Excellent teaching quality and modern facilities. The instructors are very supportive and knowledgeable.'
    },
    {
      name: 'Sita Paudel',
      course: 'Office Management',
      rating: 5,
      comment: 'Great learning environment with practical approach. I got my job right after completing the course.'
    },
    {
      name: 'Mohan Thapa',
      course: 'Web Development',
      rating: 5,
      comment: 'Best computer institute in the area. The curriculum is up-to-date and very practical.'
    }
  ];



  return (
    <div className="overflow-hidden bg-white min-h-screen">
      {/* Announcement Bar */}
      <div className="w-full bg-orange-500 text-white py-2 px-4 flex justify-center items-center text-sm font-semibold">
        <marquee behavior="alternate" direction="left">
          <span>New batches for Diploma in Computer Application start Soon! &nbsp;</span>
        </marquee>
      </div>


      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 relative overflow-hidden">
        {/* Decorative SVG Background Pattern - Left Side */}
        <div className="absolute top-0 left-0 -mt-8 -ml-7 pointer-events-none text-blue-300">
          <svg width="270" height="257" viewBox="0 0 270 257" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
            <g opacity="0.2" clipPath="url(#clip0_29_1494)">
              <path d="M103.343 147.898C102.038 147.549 100.998 146.901 100.346 145.988C99.1801 144.331 99.5402 142.003 101.342 139.612L120.854 113.762C123.516 110.231 128.869 107.29 133.819 106.639C136.638 106.261 139.005 106.684 140.488 107.846L158.81 122.087C160.055 123.053 160.558 124.427 160.284 126.041C159.591 129.809 154.693 134.006 148.858 135.79L111.03 147.375C108.066 148.294 105.362 148.439 103.343 147.898ZM138.113 107.553C136.931 107.236 135.498 107.168 133.905 107.4C129.147 108.023 124.012 110.839 121.471 114.217L101.959 140.067C100.359 142.196 99.9995 144.129 100.996 145.53C102.427 147.574 106.265 148.022 110.776 146.648L148.587 135.032C154.912 133.089 158.92 128.865 159.483 125.879C159.733 124.549 159.337 123.467 158.305 122.69L139.983 108.449C139.483 108.051 138.851 107.75 138.113 107.553Z" fill="currentColor"></path>
              <path d="M101.655 151.242C100.424 150.912 99.4203 150.327 98.7234 149.481C97.3788 147.803 97.5354 145.446 99.2353 142.844L117.863 114.094C122.177 107.447 133.69 103.178 138.757 106.328L160.527 119.911C162.02 120.839 162.72 122.265 162.543 124.01C162.155 128.018 157.21 132.782 151.052 135.086L110.661 150.228C107.22 151.547 104.019 151.875 101.655 151.242ZM136.779 106.325C131.535 104.92 122.159 108.892 118.517 114.507L99.8899 143.256C98.4053 145.547 98.1982 147.6 99.3313 148.985C101.076 151.139 105.53 151.357 110.4 149.526L150.792 134.384C157.51 131.861 161.471 127.123 161.764 123.96C161.918 122.498 161.35 121.371 160.108 120.59L138.338 107.007C137.891 106.702 137.37 106.484 136.779 106.325Z" fill="currentColor"></path>
              <path d="M100.132 154.866C98.9746 154.556 98.0311 154.04 97.3391 153.274C95.8024 151.624 95.7998 149.172 97.3111 146.387L114.628 114.65C118.619 107.337 130.807 101.931 136.724 104.86L162.207 117.488C163.979 118.358 164.901 119.844 164.863 121.758C164.767 126.055 159.988 131.286 153.454 134.201L110.679 153.317C106.7 155.071 102.889 155.605 100.132 154.866ZM135.199 105.137C129.34 103.567 118.826 108.632 115.314 115.045L97.997 146.782C96.6518 149.242 96.635 151.372 97.9223 152.772C99.6837 154.667 104.198 155.349 110.363 152.626L153.156 133.541C160.169 130.412 164.034 125.147 164.114 121.795C164.14 120.22 163.363 118.984 161.873 118.242L136.39 105.614C136.029 105.386 135.617 105.249 135.199 105.137Z" fill="currentColor"></path>
              <path d="M98.9081 158.836C97.8495 158.552 96.9487 158.073 96.2303 157.406C94.5015 155.783 94.2593 153.24 95.6 150.305L111.143 115.536C114.72 107.506 127.521 100.892 134.34 103.51L163.832 114.866C165.939 115.668 167.113 117.195 167.214 119.278C167.461 123.773 162.759 129.603 156.043 133.102L110.976 156.534C106.474 158.86 102.035 159.673 98.9081 158.836ZM133.337 104.006C126.788 102.251 115.098 108.556 111.824 115.85L96.281 150.619C95.1064 153.23 95.2734 155.463 96.7529 156.835C98.8589 158.822 103.982 159.299 110.611 155.829L155.653 132.391C162.917 128.618 166.636 122.813 166.416 119.301C166.303 117.558 165.304 116.262 163.535 115.577L134.044 104.222C133.829 104.138 133.583 104.072 133.337 104.006Z" fill="currentColor"></path>
              <path d="M97.9774 163.094C97.0173 162.837 96.1525 162.42 95.4389 161.834C93.4869 160.256 93.0231 157.654 94.0948 154.541L107.353 116.682C110.403 107.957 123.734 99.957 131.517 102.227L165.259 111.901C167.707 112.609 169.183 114.191 169.473 116.457C170.088 121.155 165.549 127.557 158.662 131.695L111.687 159.887C106.654 162.915 101.523 164.044 97.9774 163.094ZM131.189 102.956C123.853 100.991 110.952 108.763 108.096 116.96L94.8382 154.819C93.8522 157.613 94.2473 159.88 95.9369 161.256C98.9257 163.691 105.245 162.853 111.308 159.232L158.308 131.047C165.819 126.549 169.248 120.35 168.754 116.58C168.508 114.643 167.239 113.275 165.104 112.676L131.362 103.002C131.288 102.983 131.239 102.969 131.189 102.956Z" fill="currentColor"></path>
              <path d="M97.4087 167.686C96.547 167.455 95.7675 167.114 95.0769 166.639C92.8768 165.101 92.1357 162.451 92.9629 159.166L103.372 118.251C105.766 108.823 119.529 99.4096 128.353 101.141L166.587 108.724C169.415 109.297 171.242 110.946 171.745 113.401C172.763 118.366 168.551 125.224 161.479 130.051L112.836 163.384C107.277 167.193 101.446 168.768 97.4087 167.686ZM167.011 109.602C166.839 109.556 166.642 109.503 166.438 109.475L128.205 101.892C119.886 100.243 106.398 109.519 104.117 118.424L93.7081 159.34C92.9599 162.329 93.5586 164.624 95.5207 165.967C99.0775 168.449 106.03 167.123 112.402 162.741L161.045 129.407C168.642 124.194 171.814 117.479 170.995 113.543C170.577 111.559 169.202 110.189 167.011 109.602Z" fill="currentColor"></path>
              <path d="M97.1729 172.5C96.4589 172.308 95.796 172.025 95.202 171.682C92.7409 170.231 91.6731 167.52 92.2001 164.076L99.117 120.142C100.712 110.052 114.823 99.0453 124.702 100.19L167.682 105.222C170.958 105.599 173.168 107.298 173.921 110.004C175.369 115.137 171.45 122.574 164.385 128.062L114.506 166.995C108.506 171.661 101.752 173.727 97.1729 172.5ZM167.626 105.628L167.576 106.01L124.596 100.978C115.229 99.8922 101.382 110.706 99.8754 120.267L92.9584 164.2C92.4547 167.36 93.3554 169.711 95.5655 171.014C99.7592 173.483 107.339 171.586 113.984 166.381L163.882 127.479C170.69 122.16 174.517 115.066 173.144 110.244C172.473 107.823 170.537 106.382 167.545 106.028L167.626 105.628Z" fill="currentColor"></path>
              <path d="M97.4669 177.613C96.9253 177.468 96.3969 177.273 95.9063 177.036C93.1282 175.686 91.696 172.956 91.8981 169.346L94.6283 122.524C95.2459 111.75 109.563 99.0852 120.579 99.5325L168.493 101.511C172.249 101.674 174.929 103.393 175.986 106.339C177.871 111.615 174.325 119.628 167.367 125.803L116.722 170.646C110.322 176.312 102.711 179.018 97.4669 177.613ZM168.475 101.875L168.45 102.264L120.535 100.285C110.095 99.8602 96.0087 112.35 95.413 122.55L92.6828 169.372C92.4793 172.691 93.7132 175.078 96.2337 176.307C101.14 178.676 109.349 176.104 116.169 170.05L166.796 125.176C173.541 119.207 176.988 111.563 175.192 106.548C174.222 103.863 171.879 102.366 168.407 102.226L168.475 101.875Z" fill="currentColor"></path>
              <path d="M98.329 182.958C97.9844 182.866 97.6463 182.749 97.3328 182.638C94.1754 181.423 92.3542 178.668 92.1755 174.904L89.9932 125.342C89.7682 120.273 92.4694 114.328 97.4356 108.99C102.924 103.08 110.035 99.291 115.991 99.1208L168.967 97.4734C173.278 97.3369 176.434 99.0523 177.857 102.307C180.257 107.827 177.25 116.194 170.353 123.124L119.559 174.333C112.825 181.148 104.287 184.554 98.329 182.958ZM172.33 98.6117C171.32 98.3412 170.216 98.2297 168.991 98.2706L115.997 99.8868C110.251 100.061 103.328 103.741 97.9768 109.53C93.2308 114.637 90.5428 120.534 90.7418 125.305L92.9487 174.874C93.0948 178.366 94.7112 180.802 97.6044 181.92C103.299 184.105 112.083 180.765 119.018 173.793L169.812 122.584C176.357 115.981 179.38 107.75 177.141 102.616C176.26 100.587 174.595 99.2186 172.33 98.6117Z" fill="currentColor"></path>
              <path d="M99.7961 188.517C99.7223 188.497 99.6484 188.478 99.5746 188.458C96 187.421 93.7026 184.67 93.094 180.738L85.1732 128.663C84.4048 123.554 86.5548 117.303 91.0782 111.451C96.5105 104.471 104.095 99.7024 110.875 99.0151L169.065 93.1762C173.975 92.6732 177.687 94.3795 179.532 97.9316C182.456 103.565 179.99 112.473 173.391 120.063L123.116 178.001C116.133 186.041 106.591 190.338 99.7961 188.517ZM169.107 93.6093L169.138 93.9866L110.948 99.8254C104.36 100.485 96.9942 105.128 91.6818 111.955C87.2916 117.606 85.1944 123.66 85.935 128.577L93.8558 180.652C94.4253 184.337 96.4619 186.78 99.7903 187.751C106.331 189.635 115.661 185.44 122.53 177.528L172.792 119.639C179.195 112.287 181.618 103.736 178.832 98.3768C177.143 95.1299 173.682 93.5699 169.125 94.0358L169.107 93.6093Z" fill="currentColor"></path>
              <path d="M101.976 194.268C98.3324 193.291 95.7854 190.685 94.7547 186.85L80.2431 132.588C78.8755 127.45 80.4003 120.873 84.4744 114.531C89.6713 106.461 97.6192 100.63 105.238 99.376L168.7 88.7289C174.254 87.7922 178.616 89.4354 180.982 93.3115C184.514 99.1345 182.735 108.332 176.402 116.705L127.452 181.614C120.619 190.67 110.467 195.963 102.795 194.461C102.524 194.388 102.247 194.34 101.976 194.268ZM174.817 89.6301C173.069 89.1617 171.055 89.0965 168.817 89.4721L105.355 100.119C97.9534 101.352 90.206 107.026 85.129 114.944C81.1881 121.084 79.6734 127.427 80.9886 132.366L95.5003 186.628C96.5489 190.494 99.1109 192.947 102.925 193.679C110.326 195.108 120.148 189.964 126.817 181.128L175.767 116.218C181.792 108.211 183.635 99.1628 180.295 93.7074C179.056 91.6356 177.181 90.2633 174.817 89.6301Z" fill="currentColor"></path>
              <path d="M104.944 200.124C101.35 199.161 98.6517 196.725 97.2466 193.106L75.2161 137.066C73.1755 131.88 74.0686 125.002 77.644 118.158C82.374 109.171 90.763 102.088 99.0421 100.141L167.8 84.007C173.938 82.5675 179.143 84.1201 182.09 88.2841C186.258 94.1982 185.183 103.822 179.334 112.851L132.599 185.05C126.153 195.026 115.668 201.364 107.083 200.513C106.343 200.42 105.634 200.309 104.944 200.124ZM167.887 84.3729L167.974 84.7388L99.2335 100.904C91.1777 102.805 82.9645 109.725 78.3365 118.528C74.8695 125.164 73.9866 131.808 75.9502 136.789L97.9806 192.828C99.5823 196.895 102.763 199.303 107.158 199.742C115.459 200.569 125.644 194.363 131.945 184.637L178.654 112.432C184.326 103.671 185.42 94.3693 181.44 88.7424C178.643 84.8034 173.875 83.3941 167.967 84.7634L167.887 84.3729Z" fill="currentColor"></path>
              <path d="M108.795 206.033C105.299 205.097 102.493 202.868 100.724 199.521L70.2094 142.157C67.44 136.934 67.6094 129.704 70.6616 122.35C74.8147 112.365 83.3213 104.153 92.3366 101.429L166.267 79.0889C173.102 77.0189 179.112 78.4186 182.79 82.9099C187.637 88.8481 187.365 98.9237 182.117 108.562L138.677 188.26C132.798 199.074 122.077 206.587 112.676 206.519C111.297 206.545 110.001 206.356 108.795 206.033ZM166.49 79.8339L92.5592 102.174C83.7738 104.828 75.4429 112.876 71.3738 122.646C68.3989 129.81 68.2215 136.774 70.8828 141.81L101.373 199.168C103.615 203.406 107.631 205.748 112.639 205.771C121.781 205.822 132.221 198.471 137.978 187.915L181.418 108.217C186.513 98.8536 186.829 89.1061 182.182 83.4061C178.722 79.184 173.007 77.8635 166.49 79.8339Z" fill="currentColor"></path>
              <path d="M113.537 211.97C110.14 211.059 107.299 209.059 105.228 206.053L65.2546 147.947C61.6266 142.678 60.9919 135.101 63.5161 127.157C66.9608 116.271 75.4308 106.916 85.097 103.338L164.076 74.0732C171.633 71.2744 178.55 72.4424 183.045 77.2318C188.707 83.2827 189.354 93.4728 184.717 103.882L145.719 191.228C140.486 202.979 129.996 211.503 119.637 212.444C117.452 212.623 115.408 212.471 113.537 211.97ZM175.955 73.8558C172.508 72.9323 168.522 73.2349 164.311 74.769L85.3574 104.04C75.921 107.548 67.64 116.69 64.2481 127.38C61.8078 135.108 62.4033 142.438 65.8739 147.506L105.854 205.588C108.915 210.019 113.769 212.19 119.558 211.658C129.643 210.75 139.877 202.394 144.989 190.9L183.987 103.554C188.488 93.4519 187.917 83.5719 182.455 77.7591C180.676 75.8326 178.466 74.5287 175.955 73.8558Z" fill="currentColor"></path>
              <path d="M119.284 217.806C116.059 216.942 113.207 215.176 110.908 212.53L60.4132 154.399C55.815 149.107 54.309 141.138 56.2198 132.53C58.8314 120.814 67.1218 110.356 77.2978 105.86L161.028 68.9069C169.286 65.2676 177.191 66.0942 182.689 71.1788C189.186 77.1636 190.841 87.7291 187.005 98.6952L153.745 193.773C149.423 206.164 139.104 215.92 128.121 218.012C125.007 218.601 121.992 218.531 119.284 217.806ZM161.22 69.2746L161.387 69.6357L77.6386 106.558C67.6745 110.953 59.5664 121.222 56.9962 132.685C55.12 141.066 56.5869 148.787 61.0277 153.878L111.491 212.027C115.525 216.667 121.386 218.527 128.01 217.244C138.745 215.191 148.794 205.653 153.051 193.508L186.311 98.4301C190.043 87.7526 188.482 77.5283 182.198 71.7324C176.931 66.8681 169.328 66.096 161.369 69.6045L161.22 69.2746Z" fill="currentColor"></path>
              <path d="M126.102 223.481C123.074 222.67 120.318 221.14 117.9 218.937L55.8257 161.578C50.1145 156.305 47.5647 147.898 48.8328 138.537C50.5158 126.151 58.4412 114.594 69.0597 109.136L157.196 63.7149C166.131 59.1236 175.076 59.5171 181.758 64.8132C189.177 70.7026 191.971 81.547 189.066 93.0787L163.01 195.834C159.677 208.964 150.028 219.664 138.399 223.085C134.044 224.37 129.869 224.49 126.102 223.481ZM157.37 64.0514L157.543 64.3879L69.4005 109.833C59.0185 115.197 51.2394 126.503 49.5977 138.637C48.3709 147.745 50.8257 155.915 56.3483 161.006L118.423 218.365C123.629 223.161 130.634 224.59 138.17 222.365C149.52 219.001 158.979 208.514 162.24 195.654L188.296 92.8988C191.147 81.6689 188.453 71.1411 181.271 65.4473C174.852 60.3533 166.191 59.9832 157.555 64.4437L157.37 64.0514Z" fill="currentColor"></path>
              <path d="M133.931 228.821C131.198 228.089 128.628 226.847 126.295 225.115L51.5131 169.491C44.4967 164.263 40.749 155.404 41.2955 145.191C41.9712 132.034 49.2407 119.773 60.2854 113.217L152.334 58.5115C161.75 52.9155 172.083 52.7582 179.969 58.0873C188.571 63.898 192.54 74.6883 190.624 86.9595L173.326 197.307C171.204 210.841 162.198 222.688 150.353 227.502C144.783 229.779 139.076 230.2 133.931 228.821ZM152.551 58.8858L152.749 59.2289L60.6821 113.903C49.887 120.316 42.7639 132.325 42.0736 145.241C41.5684 155.202 45.1719 163.812 51.9931 168.882L126.775 224.505C133.292 229.336 141.772 230.184 150.093 226.799C161.676 222.074 170.518 210.446 172.592 197.189L189.884 86.8666C191.77 74.9037 187.907 64.4055 179.55 58.7657C171.932 53.6142 161.915 53.7769 152.756 59.2043L152.551 58.8858Z" fill="currentColor"></path>
              <path d="M142.977 233.855C140.639 233.229 138.385 232.282 136.249 230.998L47.7088 178.172C39.1573 173.06 34.0573 163.733 33.7297 152.548C33.3191 138.915 39.9787 125.78 51.1081 118.218L146.434 53.4511C156.369 46.7027 167.894 45.8369 177.24 51.1353C187.021 56.682 192.428 67.6204 191.683 80.4428L184.898 198.035C184.097 212.055 176.148 224.687 164.185 231.024C157.2 234.74 149.772 235.676 142.977 233.855ZM146.663 53.7762L146.893 54.1013L51.5425 118.862C40.6382 126.273 34.0937 139.175 34.4964 152.542C34.8226 163.437 39.7718 172.54 48.0968 177.512L136.662 230.344C144.785 235.183 154.676 235.198 163.838 230.351C175.582 224.14 183.36 211.752 184.145 197.992L190.93 80.399C191.644 67.885 186.406 57.2027 176.87 51.8269C167.775 46.6749 156.572 47.5215 146.886 54.1259L146.663 53.7762Z" fill="currentColor"></path>
              <path d="M153.142 238.371C151.345 237.889 149.594 237.236 147.858 236.428L44.4207 187.597C34.091 182.721 27.404 172.916 26.0678 160.669C24.5314 146.708 30.4628 132.745 41.516 124.188L139.359 48.5496C149.704 40.5667 162.412 38.8317 173.375 43.9044C184.528 49.0545 191.541 60.1067 192.129 73.4707L197.731 197.915C198.367 212.082 191.52 225.721 179.837 233.477C171.455 239.06 161.981 240.739 153.142 238.371ZM168.169 42.852C158.69 40.3124 148.435 42.5463 139.849 49.1818L42.0063 124.82C31.1601 133.196 25.3438 146.926 26.8543 160.59C28.1579 172.564 34.6941 182.144 44.7661 186.899L148.204 235.729C158.208 240.44 169.57 239.398 179.427 232.84C190.885 225.234 197.611 211.853 196.982 197.951L191.356 73.5007C190.763 60.4517 183.919 49.6556 173.054 44.6092C171.459 43.8655 169.818 43.294 168.169 42.852Z" fill="currentColor"></path>
              <path d="M164.253 242.192C163.244 241.922 162.248 241.602 161.234 241.251L41.8621 197.826C29.6704 193.399 20.9123 182.854 18.4115 169.637C15.7263 155.237 20.6501 140.898 31.6535 131.246L131.037 43.9482C141.602 34.6535 155.483 31.8884 168.203 36.5093C180.899 41.1236 189.753 52.1949 191.891 66.0794L211.878 196.803C214.099 211.264 208.665 225.439 197.34 234.715C187.752 242.531 175.603 245.233 164.253 242.192ZM164.937 36.293C153.341 33.186 141.064 36.1699 131.541 44.5313L32.1569 131.829C21.3606 141.299 16.5026 155.392 19.1619 169.495C21.6055 182.434 30.1816 192.771 42.1091 197.101L161.481 240.527C173.408 244.856 186.609 242.462 196.812 234.125C207.93 225.031 213.26 211.144 211.079 196.932L191.091 66.2079C189.017 52.5777 180.332 41.7625 167.932 37.2273C166.917 36.8765 165.921 36.5568 164.937 36.293Z" fill="currentColor"></path>
              <path d="M176.511 245.292L40.1733 208.76C25.6976 204.881 14.7269 193.928 10.8499 179.446C6.97292 164.964 10.9796 150.01 21.5718 139.431L121.322 39.7368C131.945 29.1397 146.923 25.1395 161.398 29.0182C175.874 32.897 186.845 43.85 190.722 58.3324L227.285 194.552C231.162 209.034 227.156 223.988 216.563 234.567C205.971 245.146 190.987 249.171 176.511 245.292ZM121.62 40.0013L121.888 40.2838L22.1131 139.972C11.7033 150.362 7.76904 165.045 11.5888 179.249C15.4086 193.452 26.1727 204.192 40.3776 207.998L176.716 244.53C190.921 248.336 205.612 244.417 216.022 234.026C226.432 223.636 230.366 208.953 226.546 194.749L189.983 58.5298C186.163 44.3263 175.406 33.5623 161.201 29.756C146.996 25.9498 132.304 29.8685 121.894 40.2592L121.62 40.0013Z" fill="currentColor"></path>
            </g>
            <defs>
              <clipPath id="clip0_29_1494">
                <rect width="224.236" height="205.171" fill="white" transform="translate(53.1016) rotate(15)"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className="max-w-screen-xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 py-12 md:py-20 relative z-10">
          { /* Left: Text */}
          <div className="flex-1 flex flex-col items-start justify-center text-left w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-white">
              <span className="block mb-2">
                Empowering Your
              </span>
              <span className="text-orange-600">
                Academic & Career Success
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              Comprehensive coaching & professional courses designed to launch your career in the digital world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-start items-center">
              <Link to="/courses" className="w-full sm:w-auto">
                <button className="w-full bg-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-orange-700 transition-colors duration-300">
                  Explore Our Courses
                </button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="w-full bg-gray-100 text-gray-900 font-bold px-8 py-4 rounded-xl shadow hover:bg-gray-200 transition-colors duration-300 border border-gray-200">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
          {/* Right: Image Card */}
          <div className="flex-1 flex justify-center items-center animate-fade-in-up w-full">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img
                src={require('../assets/banners/herosection_banner.jpg')}
                alt="Students"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="bg-gray-50 dark:bg-gray-800 py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 border-r border-gray-200 dark:border-gray-700 last:border-0">
              <span className="block text-4xl font-bold text-orange-600 mb-2">2,000+</span>
              <span className="text-gray-600 dark:text-gray-400 font-medium">Successful Learners</span>
            </div>
            <div className="text-center p-6 border-r border-gray-200 dark:border-gray-700 last:border-0">
              <span className="block text-4xl font-bold text-orange-600 mb-2">93%</span>
              <span className="text-gray-600 dark:text-gray-400 font-medium">Placement Rate</span>
            </div>
            <div className="text-center p-6 border-r border-gray-200 dark:border-gray-700 last:border-0">
              <span className="block text-4xl font-bold text-orange-600 mb-2">4.8/5</span>
              <span className="text-gray-600 dark:text-gray-400 font-medium">Student Rating</span>
            </div>
            <div className="text-center p-6">
              <span className="block text-4xl font-bold text-orange-600 mb-2">15+</span>
              <span className="text-gray-600 dark:text-gray-400 font-medium">Years of Excellence</span>
            </div>
          </div>
        </div>
      </section>


      <section id="section-about" className={`section-padding bg-white dark:bg-gray-900 ${isVisible['section-about'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 relative flex justify-center items-center">
              <div className="absolute inset-0 bg-orange-500 rounded-3xl transform rotate-3 opacity-20"></div>
              <img
                src={require('../assets/exclence.png')}
                alt="Institute Excellence"
                className="relative z-10 rounded-3xl w-full h-auto object-cover shadow-xl"
              />
            </div>

            <div className="w-full md:w-1/2">
              <div className="space-y-6">
                <div className="inline-block rounded px-3 py-1 bg-orange-100 text-orange-700 text-sm font-bold tracking-wide uppercase">
                  About Us
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  <span className="text-orange-600">Excellence</span> in Education Since 2015
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Spangle Education and Computer Institute Pvt. Ltd. is a premier educational institution located in Siddharthanagar-13, Devkota Chowk, Rupandehi. We are committed to providing quality education and computer training.
                </p>
                <ul className="space-y-4">
                  {[
                    "Experienced faculty with industry expertise",
                    "Modern computer labs with latest software",
                    "Job placement assistance for qualified students"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link to="/about" className="btn btn-primary inline-flex items-center group">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative overflow-hidden py-20 border-b border-gray-800" style={{ backgroundColor: 'rgb(26, 26, 26)' }}>
        {/* Background SVG Pattern */}
        <figure className="absolute top-0 left-0 -mt-20 -ml-10 hidden md:block opacity-60 pointer-events-none text-gray-700">
          <svg className="fill-current" width="768.8px" height="1386px" viewBox="0 0 768.8 1386" xmlSpace="preserve">
            <path d="M647.6,748.4c1.9,6,3.3,12.2,3.8,18.4c2.2,18.9-0.7,38.9-9.1,61.5c-15.6,41.9-47.8,85.3-81.6,131.5 c-46.1,63.1-94.5,128.4-108.1,199.1c-15.7,80.6,17.2,154.5,101.1,226.1l-0.4,0.4c-188.1-160.7-84.4-301.8,7.3-426.2 c33.9-46,65.8-89.6,81.4-131.2c17.5-46.8,11.8-84.9-18-119.6c-39.6-46.6-86.5-86.9-135.7-129.3C339.1,450.3,184.9,317.3,240.6,4.6 l0.6,0.1C185.7,317,339.7,450.1,488.7,578.7c49.3,42.7,95.8,82.8,135.8,129.6C635.5,721,643.1,734.2,647.6,748.4z"></path>
            <path d="M636.2,722.3c23.4,73.7-25.2,149.2-76.5,228.7c-40.8,63.5-83,129.1-91.9,198.3c-9.9,78.2,25.9,150,109.6,219 l-0.4,0.7c-45-37.1-75.4-74-93.5-112.7c-15.9-34.5-21.2-69.5-16.5-106.8c8.9-69.5,51-135.1,91.9-198.6 C616.4,861.3,671,776.5,622,694.1c-39.6-66.6-102.4-118.8-169-174.2c-68.7-57.3-140-116.4-188.1-195.3 c-25.9-42.6-42.9-86.9-51.5-135.2c-9.8-54.6-9.2-112.9,2-177.9l0.6,0.1c-46.5,271.4,97.9,391.7,237.5,507.9 c66.7,55.4,129.4,107.7,169.1,174.5C628.8,702.7,633.1,712.6,636.2,722.3z"></path>
            <path d="M624.6,687.5c11.7,37,10.5,76.9-3.8,121.9c-13.7,43.3-38.1,87.4-61.8,130.2c-35.7,64.2-72.5,130.4-76.3,198.6 c-4.4,76.5,34.5,146.1,118.7,213.3l-0.6,0.8c-188.5-150.2-114.3-284-42.6-413.2c49.3-88.7,95.7-172.7,62.4-260.6 c-31.5-83-108.5-141.7-189.7-204C363,422.5,293.2,369,244.9,298c-26.1-38.5-43.3-78.4-53-121.8C181.2,127,180.6,75,190.2,16.8l0.9,0 C151,259.3,293.5,368.3,431.2,473.7c81.5,62.2,158.3,121.3,190.1,204.2C622.6,681.2,623.6,684.4,624.6,687.5z"></path>
            <path d="M614.6,642.5c2.2,6.8,4.1,13.7,5.4,20.8c18.1,91.8-22.3,177.4-61.1,260.2c-32.2,68.8-62.8,133.6-62.1,201.3 c0.8,76.3,41.6,143,128.7,209.2l-0.6,0.8c-46.1-35.1-78.8-70-100.3-106.8c-19.1-32.9-28.6-66.6-28.9-103.1 c-0.6-67.6,29.8-132.7,62.3-201.6c38.8-82.7,79-168.2,60.9-259.8c-19.1-96.7-109.2-158.6-204.5-224.2 c-68.3-47.1-139.2-95.6-188.9-160.4c-56.1-73.2-75.8-157-60.3-255.8l0.9,0c-34.9,220.7,109.1,319.7,248.6,415.2 C503.4,499.3,587.6,557.2,614.6,642.5z"></path>
            <path d="M610.8,603.9c4.4,13.9,7.1,28.7,7.8,44.6c3.6,91.5-28.4,172.7-59.3,251.2c-28.5,72.3-55.1,140.5-50.2,208.8 c5.2,76.6,49.9,143,140.1,208.8l-0.4,0.7c-90.5-66-135.2-132.4-140.8-209.2c-5-68.6,21.9-136.9,50.3-209.4 c30.9-78.5,62.6-159.6,59.1-250.9c-4.2-109-107.3-171.8-216.8-238.5c-70.1-42.7-142.8-87-194.2-146.1 c-58.1-66.8-79.9-143.6-66-234.6l1,0.3c-30.7,202.9,117.1,292.9,259.8,379.6C494.9,466.2,584.1,520.8,610.8,603.9z"></path>
            <path d="M610.7,570.7c6.1,19.2,8.4,40.1,6,62.8c-8.3,84.1-33.8,160.3-55.9,227.3c-27.6,83.2-51.4,154.9-42.7,226 c9.5,78.4,58.7,146,155,213l-0.6,0.8c-96.5-66.7-145.8-134.6-155.4-213.2c-8.8-71.4,15.2-143.4,42.8-226.7 c22.3-67.1,47.6-143.3,55.9-227.3c12-120.7-104.2-182.9-227.6-248.9c-72.3-38.6-147.1-78.7-200.6-132.7 c-60.6-61-84.2-131.8-72-216.2l1.2,0.2C89.9,223.5,242,305,389.1,383.7C488.9,437.2,584.6,488.6,610.7,570.7z"></path>
            <path d="M613,540.8c7.3,23.1,8.5,48.7,1.9,77.9c-14,63.3-31.8,122.1-47.4,173.8c-30,99.3-56,185.2-45,263.4 c11.7,84.3,67.2,156.6,174.2,227.2l-0.5,1c-56.6-37.2-98.1-74.3-126.8-113.1c-26.6-35.7-42.3-73.2-47.9-114.7 c-11.1-78.8,14.9-164.4,45.1-264c15.7-51.7,33.4-110.5,47.5-173.6C643.5,486.7,513.4,426,375.8,361.9 c-74.9-34.9-152.2-71-207.6-120.1c-63-55.7-88.3-121-78-199.6l1.1-0.1c-10.5,78.1,14.8,143.1,77.7,198.6 c55.4,49.1,132.7,85.3,207.5,119.9C484,410.7,587.1,458.9,613,540.8z"></path>
            <path d="M617.2,512.9c8.3,26.2,8,56.1-3.5,90.9c-5.6,17.1-11.2,33.9-16.5,50c-47.8,143.4-85.7,256.4-76.5,351.9 c9.7,99.7,71.5,180,200.4,260.4l-0.5,1c-67.3-41.9-115.6-83.2-148.1-126.6c-30.9-41-48.1-85.2-52.8-134.8 c-9.3-95.8,28.8-208.9,76.6-352.3c5.6-16.2,10.9-32.9,16.5-50c47.5-143.5-96.3-201.6-248.6-263.1c-77.7-31.1-157.6-63.5-215.4-108.2 C83.3,181.7,56.1,121.4,65.2,48l1.2,0.2c-9,72.7,18.1,132.8,83.1,183c57.8,44.6,137.6,76.8,214.8,108.1 C480.2,386,591.2,431,617.2,512.9z"></path>
            <path d="M622.4,486.7c9.6,30.2,6.1,63.9-10.3,102.3C465,933,463,1084.4,745.1,1249l-0.8,1.1 c-143.5-83.6-211.5-162.5-227.9-263.5c-17.4-106.8,25.3-236.4,94.5-398.1c18.6-43.4,20.4-80.4,6-113.1 C583.7,401.1,471.1,362,351.5,320.8C189.7,265,22.7,207.3,40,54.3l1.2,0.2C23.8,206.4,190.5,263.8,351.7,319.6 C471.4,361,584.6,400,617.6,475C619.7,478.9,621.2,482.8,622.4,486.7z"></path>
            <path d="M628.6,461.4c10.3,32.5,4.4,69.6-18,112.8c-93.9,182.2-122.9,308.3-94.5,408.8c26.1,92.5,101.7,167,252.8,249 l-0.8,1.1c-151.5-82.5-227.2-157.2-253.6-249.9c-28.5-100.7,0.5-227.1,94.5-409.9c24.3-47.3,29-87.1,14.3-121.5 c-32.7-76-155.1-112-284.6-149.7C172.6,253.7,0.1,203.5,15.1,60.4l1.2,0.2c-14.6,141.8,157,191.9,323.2,240.6 c129.9,37.9,252.4,73.9,285.3,150.4C626.2,454.9,627.5,458,628.6,461.4z"></path>
          </svg>
        </figure>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-md bg-white text-gray-900 text-sm font-semibold mb-4">
              🚀 Discover what we offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Best Education Center Services by
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6">
              Spangle Education & Computer Institute
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { id: "01", title: "Bridge Course" },
              { id: "02", title: "CTEVT Prepration" },
              { id: "03", title: "Computer Course" },
              { id: "04", title: "Graphic Designing" },
              { id: "05", title: "Page Designing" },
              { id: "06", title: "Personality Development" },
              { id: "07", title: "Tuition Class" },
              { id: "08", title: "Web Page Designing" }
            ].map((service) => (
              <div key={service.id} className="group bg-white rounded-xl p-6 pt-10 text-center relative mt-8 hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-orange-600 transition-colors">
                  <h6 className="text-blue-600 font-bold text-lg mb-0 group-hover:text-white transition-colors">{service.id}.</h6>
                </div>
                <h5 className="font-bold text-gray-900 text-lg mb-2 mt-4">{service.title}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="section-features" className={`section-padding bg-gray-50 dark:bg-gray-800 ${isVisible['section-features'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Reasons to Choose Spangle
            </h2>
            <div className="h-1 w-20 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border-b-4 border-transparent hover:border-orange-500 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="section-testimonials" className={`section-padding bg-white dark:bg-gray-900 ${isVisible['section-testimonials'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              What Our Students Say
            </h2>
            <div className="h-1 w-20 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl relative">
                <div className="absolute top-6 right-8 text-6xl text-gray-200 dark:text-gray-700 font-serif leading-none opacity-50">"</div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-orange-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic relative z-10">
                  {testimonial.comment}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-wide">{testimonial.course}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <ScrollingCountryFlags />

      {/* Call to Action */}
      <section className="bg-orange-600 py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Educational Journey Today
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join our community of successful students and take the first step towards your future career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
              Explore Courses
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold text-lg px-8 py-4 rounded-xl transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;