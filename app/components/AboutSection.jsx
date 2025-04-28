import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  return (
    <div id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-center gap-14"
        >
          <motion.div 
            variants={itemVariants}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative h-[420px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/30 z-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 mix-blend-overlay z-10" />
              
              <Image 
                src="/profile-photo.jpg" 
                alt="Zain Jamshaid" 
                layout="fill" 
                objectFit="cover"
                className="z-0"
              />
            </div>
            
            <motion.div 
              className="absolute -right-5 top-1/4 bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-full shadow-lg"
              animate={{ 
                y: [0, -10, 0],
                rotateZ: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2a9.98 9.98 0 018 4H4a9.98 9.98 0 018-4zm0 20a9.98 9.98 0 01-8-4h16a9.98 9.98 0 01-8 4zm-9-9a9.958 9.958 0 010-2h18a9.958 9.958 0 010 2H3z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute -left-4 bottom-1/4 bg-gradient-to-br from-purple-600 to-purple-800 p-2 rounded-full shadow-lg"
              animate={{ 
                y: [0, 10, 0],
                rotateZ: [0, -5, 0]
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute left-1/4 -top-2 bg-gradient-to-br from-green-600 to-green-800 p-2 rounded-full shadow-lg"
              animate={{ 
                y: [0, 6, 0],
                x: [0, 4, 0],
                rotateZ: [0, 10, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
              </svg>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="w-full md:w-1/2"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block text-sm uppercase tracking-widest text-blue-500 font-semibold mb-3 px-3 py-1 rounded-md bg-blue-500/10">
                About Me
              </span>
            </motion.div>
            
            <motion.h3 
              variants={itemVariants}
              className="text-4xl font-bold mb-6 text-gray-100"
            >
              Software Engineering Student & Web Developer
            </motion.h3>
            
            <motion.div variants={itemVariants}>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Hi there! I'm <span className="text-blue-400 font-semibold">Zain Jamshaid</span>, a 20-year-old software engineering student passionate about creating beautiful, functional, and user-friendly web experiences.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                I specialize in modern web development technologies including React, Next.js to create immersive digital experiences. My goal is to combine creative design with technical expertise to build exceptional web applications.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.a 
                href="/resume/Zain Jamshaid Resume.docx"
                download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg transition-all"
              >
                Download Resume
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </motion.a>
              
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = "#projects"}
                className="flex items-center gap-2 px-6 py-3 bg-transparent border border-indigo-500/30 text-gray-300 font-medium rounded-lg hover:bg-indigo-500/10 transition-all"
              >
                View Projects
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;