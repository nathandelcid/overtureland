import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background';
import HarpLogo from '../assets/harp.svg';
import { ArrowLeft } from 'lucide-react';

function Company() {
  return (
    <Background>
      {/* Navigation */}
      <div className="absolute top-0 left-0 w-full flex justify-between px-4 sm:px-0 sm:justify-center">
        <div className="w-full max-w-[1200px] relative">
          <Link 
            to="/" 
            className="absolute top-6 sm:top-10 left-0 sm:left-[10%] text-white/60 hover:text-white transition-colors duration-300 z-20 text-base sm:text-lg font-['Gwen'] tracking-wide nav-fade-in flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center pt-24 sm:pt-32 px-4">
        <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] text-[rgba(169,219,237,255)] logo-fade-in mb-8 sm:mb-12">
          <img src={HarpLogo} alt="Harmoniq Logo" className="w-full h-full" />
        </div>
        
        <div className="max-w-2xl text-center">
          <p className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed font-['Gwen']">
            We are building the future of music production, where AI enhances rather than replaces human creativity.
            <br />
            <br />
            Music creation should be about expression, not technical hurdles.{" "}
            <span className="font-bold underline">Overture Maestro</span> is
            your music production companion that helps you with every step of
            the music production process, allowing you to focus on the fun
            parts.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-white/60 text-xs sm:text-sm font-['Gwen']">
        2025 Overture. All rights reserved.
      </footer>
    </Background>
  );
}

export default Company;
