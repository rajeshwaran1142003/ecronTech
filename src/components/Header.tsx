import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Phone, Mail, MapPin, User, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from './AuthProvider';
import AuthModal from './AuthModal';
import SocialLinks from './SocialLinks';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { isDark, toggleTheme } = useTheme();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#courses', label: 'Courses' },
    { href: '#about', label: 'About' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' }
  ];

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-6 overflow-x-auto">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <MapPin size={14} />
                <span className="hidden sm:inline">Door No: 55, Railway Station Road, Alandur, Chennai - 600 016</span>
                <span className="sm:hidden">Alandur, Chennai</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Phone size={14} />
                <a href="tel:+918438829844" className="hover:text-pink-200 transition-colors">
                  +91 8438829844
                </a>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Mail size={14} />
                <a href="mailto:ecrontechnologies@gmail.com" className="hover:text-pink-200 transition-colors">
                  ecrontechnologies@gmail.com
                </a>
              </div>
            </div>
            <div className="flex-shrink-0">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-xl border-b border-pink-100 dark:border-pink-900' 
          : 'bg-white dark:bg-gray-900'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center animate-slide-in-left">
              <img 
                src="/logo copy.png" 
                alt="Ecron Technologies Logo" 
                className="h-12 w-auto mr-3 transition-transform hover:scale-105"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Ecron Technologies
                </h1>
                <p className="text-xs text-pink-600 dark:text-pink-400 font-medium">
                  Software Training Institute
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 animate-slide-in-right">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-all duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              
              {/* Auth Section */}
              {!loading && (
                <div className="flex items-center gap-4">
                  {user ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <User size={18} />
                        <span className="text-sm font-medium">{user.email}</span>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900 hover:text-pink-600 dark:hover:text-pink-400 rounded-lg transition-all duration-300 text-sm"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleAuthClick('signin')}
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => handleAuthClick('signup')}
                        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 transform hover:scale-110"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900 transition-all duration-300 transform hover:scale-110"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 py-4 border-t dark:border-gray-700' : 'max-h-0'
          }`}>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-all duration-300 py-2 px-4 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile Auth Section */}
              {!loading && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300">
                        <User size={18} />
                        <span className="text-sm font-medium">{user.email}</span>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900 hover:text-pink-600 dark:hover:text-pink-400 rounded-lg transition-all duration-300"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          handleAuthClick('signin');
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors text-left"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          handleAuthClick('signup');
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-300"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode={authMode}
      />
    </>
  );
};

export default Header;