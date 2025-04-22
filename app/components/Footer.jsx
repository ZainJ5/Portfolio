import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text mb-3"
            >
              Zain Jamshaid
            </motion.div>
            <p className="text-gray-400 max-w-md">
              Software Engineering student and Web Developer creating modern and responsive web applications with cutting-edge technologies.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-6">
              {['Github', 'LinkedIn', 'Twitter', 'Instagram'].map((item, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -5 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Zain Jamshaid. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <nav>
              <ul className="flex flex-wrap gap-6">
                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">
              Designed & Built by Zain Jamshaid 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


