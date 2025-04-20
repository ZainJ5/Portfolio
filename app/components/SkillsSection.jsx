import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import BallCanvas from './BallCanvas';

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  
  const [enable3DOnMobile, setEnable3DOnMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const currentDateTime = "2025-04-13 10:57:24";
  const currentUser = "ZainJ5";
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const technologies = [
    {
      name: "Next JS",
      icon: "/tech/nextjs.svg",
      category: "frontend",
      invertInDarkMode: true 
    },
    {
      name: "React JS",
      icon: "/tech/reactjs.png",
      category: "frontend"
    },
    {
      name: "HTML 5",
      icon: "/tech/html.png",
      category: "frontend"
    },
    {
      name: "CSS 3",
      icon: "/tech/css.png",
      category: "frontend"
    },
    {
      name: "JavaScript",
      icon: "/tech/javascript.png",
      category: "frontend"
    },
    {
      name: "TypeScript",
      icon: "/tech/typescript.png",
      category: "frontend"
    },
    {
      name: "Tailwind CSS",
      icon: "/tech/tailwind.png",
      category: "frontend"
    },
    {
      name: "Node JS",
      icon: "/tech/nodejs.png",
      category: "backend"
    },
    {
      name: "MongoDB",
      icon: "/tech/mongodb.png",
      category: "backend"
    },
    {
      name: "FireBase",
      icon: "/tech/firebase.png",
      category: "backend"
    },
    {
      name: "Git",
      icon: "/tech/git.png",
      category: "tools"
    },
    {
      name: "GitHub",
      icon: "/tech/github.png",
      category: "tools"
    }
  ];
  
  const otherSkills = [
    { name: "C++", category: "programming language" },
    { name: "Python", category: "programming language" },
    { name: "Figma", category: "design" },
    { name: "Framer Motion", category: "animation" },
    { name: "Digital Ocean", category: "cloud hosting" },
    { name: "Azure", category: "cloud platform" },
    { name: "AI integration", category: "artificial intelligence" },
    { name: "SEO", category: "marketing" },
    { name: "Express.js", category: "backend framework" },
    { name: "Docker", category: "devops" }
  ];
  
  
  const categories = {
    frontend: { color: "blue-500", text: "text-blue-400" },
    backend: { color: "green-500", text: "text-green-400" },
    tools: { color: "purple-500", text: "text-purple-400" },
    animation: { color: "orange-500", text: "text-orange-400" },
    design: { color: "pink-500", text: "text-pink-400" },
    marketing: { color: "yellow-500", text: "text-yellow-400" },
    devops: { color: "red-500", text: "text-red-400" }
  };
  
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      } 
    }
  };

  const shouldRender3D = !isMobile || enable3DOnMobile;
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative">
      {isMobile && (
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => setEnable3DOnMobile(prev => !prev)}
            className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg ${
              enable3DOnMobile 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 border border-gray-700'
            } transition-all duration-300`}
            title={enable3DOnMobile ? "Switch to Static Icons" : "Switch to 3D Icons"}
          >
            <span className="text-lg">
              {enable3DOnMobile ? '3D' : '2D'}
            </span>
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* User info banner */}
        {/* <div className="flex flex-wrap justify-between items-center mb-10 text-sm text-gray-300 bg-gray-800/50 py-2 px-4 rounded-md">
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{currentDateTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{currentUser}</span>
          </div>
        </div> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block text-sm uppercase tracking-widest text-blue-500 font-bold mb-2"
          >
            My Expertise
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-100">
            Skills & Technologies
          </h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "6rem", opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          ></motion.div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10 mb-20"
        >
          {technologies.map((technology) => (
            <motion.div
              key={technology.name}
              variants={itemVariants}
              className="flex flex-col items-center group"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className={`relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 ${
                !shouldRender3D ? 'flex items-center justify-center' : ''
              }`}>
                {!shouldRender3D ? (
                  <img 
                    src={technology.icon} 
                    alt={technology.name}
                    className={`w-14 h-14 object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                      technology.invertInDarkMode ? 'invert brightness-200' : ''
                    }`}
                  />
                ) : (
                  <BallCanvas icon={technology.icon} />
                )}
              </div>
              
              <p className="mt-2 text-center text-white font-medium transition-colors">
                {technology.name}
              </p>
              
              <span className={`mt-1 text-xs ${categories[technology.category].text} opacity-70 group-hover:opacity-100 transition-opacity`}>
                {technology.category.charAt(0).toUpperCase() + technology.category.slice(1)}
              </span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-100 mb-6">Other Skills</h3>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {otherSkills.map((skill, idx) => (
              <motion.span
                key={idx}
                className={`px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-full text-gray-300 hover:text-white hover:border-blue-400 transition-all`}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: false }}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: false }}
          className="mt-20 max-w-3xl mx-auto"
        >
          {/* <h3 className="text-xl font-semibold text-gray-100 mb-8 text-center">Proficiency Levels</h3>
          
          <div className="space-y-6">
            {[
              { name: "Frontend Development", level: 90, color: "bg-blue-500" },
              { name: "React Ecosystem", level: 85, color: "bg-cyan-500" },
              { name: "Backend Development", level: 65, color: "bg-green-500" },
              { name: "UI/UX Design", level: 85, color: "bg-purple-500" },
              { name: "DevOps & Deployment", level: 65, color: "bg-red-500" },
            ].map((skill, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-gray-300">{skill.level}%</span>
                </div>
                
                <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${skill.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: false }}
                  />
                </div>
              </div>
            ))}
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;