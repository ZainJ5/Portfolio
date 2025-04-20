import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  
  const navItems = [
    { name: 'Home', icon: 'home', href: '#home' },
    { name: 'About', icon: 'user', href: '#about' },
    { name: 'Education', icon: 'graduation-cap', href: '#education' },
    { name: 'Skills', icon: 'code', href: '#skills' },
    { name: 'Projects', icon: 'briefcase', href: '#projects' },
    { name: 'Achievements', icon: 'trophy', href: '#achievements' }, 
    { name: 'Experiences', icon: 'trophy', href: '#experiences' }, 
    { name: 'Certificates', icon: 'trophy', href: '#certificates' }, 
    { name: 'Contact', icon: 'envelope', href: '#contact' }
  ];

  const socialLinks = [
    { 
      name: "github", 
      url: "https://github.com/ZainJ5",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>,
      hoverBg: "hover:bg-[#171515]"
    },
    { 
      name: "linkedin", 
      url: "https://www.linkedin.com/in/zain-jamshaid-8779b9294",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
      </svg>,
      hoverBg: "hover:bg-[#0A66C2]"
    },
    { 
      name: "twitter", 
      url: "https://x.com/ZainJamshaid05",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>,
      hoverBg: "hover:bg-black"
    },
    { 
      name: "instagram", 
      url: "https://www.instagram.com/zain._.j05",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>,
      hoverBg: "hover:bg-gradient-to-tr hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45]"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav 
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/85 backdrop-blur-md py-2 border-b border-white/10 shadow-md shadow-blue-900/10' 
          : 'bg-transparent py-3'
      }`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="relative">
          <Link href="#home" className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center border border-white/20 shadow-lg">
              <span className="text-sm font-bold text-white">ZJ</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center">
              <h1 className="text-sm sm:text-base font-bold text-white whitespace-nowrap">
                Zain Jamshaid
              </h1>
              <div className="hidden sm:flex sm:items-center">
                <span className="text-gray-400 mx-1">|</span>
                <span className="text-blue-400 text-sm">Software Engineer</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link href={item.href} key={item.name}>
              <motion.div
                className={`relative px-3 py-2 rounded-md font-medium text-sm ${
                  activeSection === item.href.substring(1)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                } transition-colors duration-200 flex items-center group`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className={`fas fa-${item.icon} mr-2 text-blue-400 group-hover:text-blue-300 text-xs`}></i>
                
                <span>{item.name}</span>
                
                {activeSection === item.href.substring(1) && (
                  <motion.div 
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
          <div className="flex items-center space-x-2 ml-3">
            {/* {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 ${social.hoverBg} text-gray-300 hover:text-white transition-colors duration-200 transform hover:-translate-y-1`}
              >
                {social.icon}
              </a>
            ))} */}
          </div>
          
          {/* <motion.button
            className="ml-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm rounded-md shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-download mr-2 text-xs"></i>
            Resume
          </motion.button> */}
        </div>

        <motion.button
          className="lg:hidden text-white p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5 flex items-center justify-center">
            <motion.span
              className="absolute block w-6 h-0.5 bg-white rounded-sm"
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 0 : -8,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute block w-6 h-0.5 bg-white rounded-sm"
              animate={{
                opacity: mobileMenuOpen ? 0 : 1,
                x: mobileMenuOpen ? 20 : 0,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute block w-6 h-0.5 bg-white rounded-sm"
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? 0 : 8,
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden px-4 pb-5 pt-3 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 shadow-lg"
          >
            <div className="grid grid-cols-2 gap-2 mt-1">
              {navItems.map((item) => (
                <Link 
                  href={item.href} 
                  key={item.name}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.div
                    className={`flex items-center p-3 rounded-md ${
                      activeSection === item.href.substring(1)
                        ? 'bg-blue-900/20 border border-blue-500/30 text-blue-400'
                        : 'text-gray-300 border border-gray-800/80 bg-gray-800/20 hover:bg-gray-800/40'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className={`fas fa-${item.icon} mr-2 text-sm ${
                      activeSection === item.href.substring(1) ? 'text-blue-400' : 'text-blue-500/70'
                    }`}></i>
                    <span className="font-medium text-sm">{item.name}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
            
            <motion.button
              className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm rounded-md shadow-md shadow-blue-600/20 flex items-center justify-center"
              whileTap={{ scale: 0.98 }}
            >
              <i className="fas fa-download mr-2"></i>
              Download Resume
            </motion.button>
            
            <div className="flex justify-center mt-5 pt-4 border-t border-gray-800/50">
              <div className="flex space-x-5">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 ${social.hoverBg} text-white transition-colors duration-200 transform hover:-translate-y-2`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;