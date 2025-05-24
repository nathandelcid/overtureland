import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background';
import { Apple, AppWindow as Windows } from 'lucide-react';

function Installers() {
  return (
    <Background>
      <div className="absolute top-0 left-0 w-full flex justify-center">
        <div className="w-[1200px] relative">
          <Link 
            to="/" 
            className="absolute top-10 left-[10%] text-white/60 hover:text-white transition-colors duration-300 z-20 text-lg font-['Crimson_Text'] tracking-wide nav-fade-in"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <h1 className="text-5xl header-container mb-12">
          <span className="header-text">Download harmoniq</span>
        </h1>

        <div className="flex gap-8">
          <a
            href="#macos"
            className="group flex flex-col items-center p-8 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[rgba(169,219,237,0.3)]"
          >
            <Apple className="w-24 h-24 text-white mb-4 group-hover:text-[rgba(169,219,237,1)] transition-colors duration-300" />
            <span className="text-xl text-white/80 group-hover:text-white font-['Crimson_Text']">
              Download for macOS
            </span>
          </a>

          <a
            href="#windows"
            className="group flex flex-col items-center p-8 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[rgba(169,219,237,0.3)]"
          >
            <Windows className="w-24 h-24 text-white mb-4 group-hover:text-[rgba(169,219,237,1)] transition-colors duration-300" />
            <span className="text-xl text-white/80 group-hover:text-white font-['Crimson_Text']">
              Download for Windows
            </span>
          </a>
        </div>
      </div>

      <footer className="relative z-10 w-full py-4 text-center text-white/60 text-sm">
        © 2025 harmoniq. All rights reserved.
      </footer>
    </Background>
  );
}

export default Installers;