import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import { CheckCircle2, ArrowLeft, Lock } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function EarlyAccess() {
  const navigate = useNavigate();
  const [isActivationMode, setIsActivationMode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    activationCode: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isActivationMode) {
      navigate('/installers');
    } else {
      try {
        // Save to Supabase
        const { error: dbError } = await supabase
          .from('early_access_signups')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              role: formData.role,
              other_role: formData.role === 'other' ? 'Other' : null
            }
          ]);

        if (dbError) throw dbError;

        // Send welcome email
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-welcome-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send welcome email');
        }

        setIsSubmitted(true);
      } catch (err) {
        setError('Failed to submit form. Please try again.');
        console.error('Error:', err);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  if (isSubmitted) {
    return (
      <Background>
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

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-xl text-center max-w-md w-full">
            <CheckCircle2 className="w-12 sm:w-16 h-12 sm:h-16 text-[rgba(169,219,237,1)] mx-auto mb-4 sm:mb-6" />
            <h2 className="text-xl sm:text-2xl text-white mb-4 font-['Crimson_Text']">Thank You, {formData.name}!</h2>
            <p className="text-white/80 mb-6 font-['Crimson_Text']">
              Your early access request has been recorded. We'll be in touch soon at {formData.email}.
            </p>
            <Link
              to="/"
              className="inline-block py-2.5 sm:py-3 px-4 sm:px-6 bg-[rgba(169,219,237,0.1)] hover:bg-[rgba(169,219,237,0.2)] text-white font-medium rounded-lg transition-all duration-300 border border-[rgba(169,219,237,0.3)] hover:border-[rgba(169,219,237,0.5)] font-['Crimson_Text']"
            >
              Return to Home
            </Link>
          </div>
        </div>

        <footer className="relative z-10 w-full py-4 text-center text-white/60 text-xs sm:text-sm font-['Gwen']">
          2025 Overture. All rights reserved.
        </footer>
      </Background>
    );
  }

  return (
    <Background>
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

      <div className="relative z-10 flex-1 flex flex-col items-center pt-24 sm:pt-32 px-4">
        <h1 className="text-3xl sm:text-5xl text-white header-container mb-8 sm:mb-12">
          <span className="header-text">Join the Future</span>
        </h1>
        
        <div className="w-full max-w-md">
          <div className="flex justify-center space-x-4 mb-6 sm:mb-8">
            <button
              onClick={() => setIsActivationMode(false)}
              className={`px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 font-['Crimson_Text'] text-sm sm:text-base ${
                !isActivationMode 
                  ? 'bg-[rgba(169,219,237,0.2)] text-white border border-[rgba(169,219,237,0.5)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Request Access
            </button>
            <div
              className="px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 font-['Crimson_Text'] text-white/30 flex items-center gap-2 cursor-not-allowed text-sm sm:text-base"
            >
              <Lock className="w-4 h-4" />
              Have a Code?
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-xl">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-['Crimson_Text']">
                {error}
              </div>
            )}
            {!isActivationMode ? (
              <>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2 font-['Crimson_Text']">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 sm:py-3 bg-black/30 rounded-lg text-white placeholder-white/30 border border-white/10 focus:border-[rgba(169,219,237,0.5)] focus:outline-none transition-all duration-300 font-['Crimson_Text']"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2 font-['Crimson_Text']">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 sm:py-3 bg-black/30 rounded-lg text-white placeholder-white/30 border border-white/10 focus:border-[rgba(169,219,237,0.5)] focus:outline-none transition-all duration-300 font-['Crimson_Text']"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="role" className="block text-white/80 text-sm font-medium mb-2 font-['Crimson_Text']">
                    Your Role
                  </label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 sm:py-3 bg-black/30 rounded-lg text-white border border-white/10 focus:border-[rgba(169,219,237,0.5)] focus:outline-none transition-all duration-300 font-['Crimson_Text']"
                    required
                  >
                    <option value="" className="bg-black">Select your role</option>
                    <option value="producer" className="bg-black">Music Producer</option>
                    <option value="artist" className="bg-black">Recording Artist</option>
                    <option value="engineer" className="bg-black">Sound Engineer</option>
                    <option value="other" className="bg-black">Other</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 px-4 bg-[rgba(169,219,237,0.1)] hover:bg-[rgba(169,219,237,0.2)] text-white font-medium rounded-lg transition-all duration-300 border border-[rgba(169,219,237,0.3)] hover:border-[rgba(169,219,237,0.5)] font-['Crimson_Text']"
                >
                  Request Early Access
                </button>
              </>
            ) : (
              <div>
                <label htmlFor="activationCode" className="block text-white/80 text-sm font-medium mb-2 font-['Crimson_Text']">
                  Enter Activation Code
                </label>
                <input
                  type="text"
                  id="activationCode"
                  value={formData.activationCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 sm:py-3 bg-black/30 rounded-lg text-white placeholder-white/30 border border-white/10 focus:border-[rgba(169,219,237,0.5)] focus:outline-none transition-all duration-300 font-['Crimson_Text'] mb-6"
                  placeholder="Enter your code"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 px-4 bg-[rgba(169,219,237,0.1)] hover:bg-[rgba(169,219,237,0.2)] text-white font-medium rounded-lg transition-all duration-300 border border-[rgba(169,219,237,0.3)] hover:border-[rgba(169,219,237,0.5)] font-['Crimson_Text']"
                >
                  Download harmoniq
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      <footer className="relative z-10 w-full py-4 text-center text-white/60 text-xs sm:text-sm font-['Gwen']">
        2025 Overture. All rights reserved.
      </footer>
    </Background>
  );
}

export default EarlyAccess;