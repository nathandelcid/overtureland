import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Company from './pages/Company';
import EarlyAccess from './pages/EarlyAccess';
import Installers from './pages/Installers';
import Background from './components/Background';
import HarpLogo from './assets/harp.svg';

const searchPrompts = [
  "Am I forcing this bridge or does it rush naturally?",
  "Combine these vocals to get the best take for my track.",
  "How to make a synth like the Last Goodbye by ODESZA",
  "Pick the best sounds in this library for my track.",
  "Are there any shortcuts or tools that make my DAW setup easier to navigate?",
  "Create a unique sound that resonates with my drum pattern using Vital.",
  "What are some common mistakes to avoid in mixing and mastering?",
  "Mix this track with distortion, balance technical precision .",
  "How do you know when a track is truly done?",
  "Organize the drum shots in this sample library to their respective type.",
  "I feel like quitting this track, how do I stay motivated?",
  "Teach me how to sound design using Analog.",
  "Why does my master sound worse than the mix?",
  "Remove any plugins from this track that you deem unnecessary.",
];

function Home() {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeDelay = isDeleting ? 50 : 100;
    const pauseDelay = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < searchPrompts[promptIndex].length) {
          setCurrentPrompt(prev => searchPrompts[promptIndex].slice(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseDelay);
        }
      } else {
        if (charIndex > 0) {
          setCurrentPrompt(prev => searchPrompts[promptIndex].slice(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setPromptIndex(prev => (prev + 1) % searchPrompts.length);
        }
      }
    }, typeDelay);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, promptIndex]);

  return (
    <Background>
      {/* Navigation Links */}
      <div className="absolute top-0 left-0 w-full flex justify-between px-4 sm:px-0 sm:justify-center">
        <div className="w-full max-w-[1200px] relative flex justify-between sm:block">
          <Link
            to="/company"
            className="py-6 sm:absolute sm:top-10 sm:left-[10%] text-white hover:text-[#a9dbed] transition-colors duration-300 z-20 text-base sm:text-lg font-['Gwen'] tracking-wide logo-fade-in"
          >
            Company
          </Link>
          <Link
            to="/early-access"
            className="py-6 sm:absolute sm:top-10 sm:right-[10%] text-white hover:text-[#a9dbed] transition-colors duration-300 z-20 text-base sm:text-lg font-['Gwen'] tracking-wide logo-fade-in"
          >
            Early Access
          </Link>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Logo and Name */}
        <div className="flex items-center logo-fade-in">
          <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] text-[rgba(169,219,237,255)]">
            <img src={HarpLogo} alt="Harmoniq Logo" className="w-full h-full" />
          </div>
          <span className="-ml-5 text-4xl sm:text-6xl text-white font-['Gwen']">overture</span>
        </div>

        {/* Search Box */}
        <div className="w-full max-w-[600px] mt-12 relative search-fade-in">
          <div className="search-box-container">
            <input
              type="text"
              className="w-full px-4 py-3 bg-[#1a1a1a] rounded-2xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 font-['Gwen'] relative z-10"
              value={currentPrompt}
              readOnly
              placeholder="Ask anything about your music..."
            />
            <div className="search-box-border"></div>
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
            <div className="w-5 h-5" />
          </div>
        </div>

        {/* Tagline */}
        <p className="tagline mt-8 sm:mt-12 text-base sm:text-lg font-['Gwen'] px-4 text-center">
          Your personal <span className="professional">professional</span> music assistant
        </p>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-white/60 text-xs sm:text-sm px-4 footer-fade-in font-['Gwen']">
        2025 Overture. All rights reserved. To reach out, contact{" "}
        <a
          href="mailto:ndelcid@college.harvard.edu"
          className="underline hover:text-white transition-colors duration-300"
        >
          Nataly
        </a>
      </footer>
    </Background>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/early-access" element={<EarlyAccess />} />
        <Route path="/installers" element={<Installers />} />
      </Routes>
    </Router>
  );
}

export default App;