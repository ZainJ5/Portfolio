"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ExperiencesSection = () => {
  const [lineVisible, setLineVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    setLineVisible(true);
  }, []);

  const experienceItems = [
    {
      id: 1,
      title: "Tech Team Member",
      organization: "GDGOC GIKI",
      date: "2024 - Present",
      description: "Contributed to technical projects like an automation system and the GIKI Chatbot. Organized a Speed Programming Competition.",
      skills: ["Automation", "Chatbot Development", "Event Organization"]
    },
    {
      id: 2,
      title: "Subhead, All Pak Hackathon",
      organization: "ACM GIKI",
      date: "2024 - Present",
      description: "Led the All Pak Hackathon team and supported technical events and workshops for the computing society.",
      skills: ["Hackathon Management", "Event Coordination", "Technical Support"]
    },
    {
      id: 3,
      title: "Team Member",
      organization: "Team Techno",
      date: "2024 - Present",
      description: "Built an Obstacle Avoidance Robot as part of robotics projects and contributed to technical workshops.",
      skills: ["Robotics", "Embedded Systems", "Problem Solving"]
    }
    
  ].sort((a, b) => {
      const parseDate = (dateStr) => {
        if (dateStr.includes("Present")) return new Date(3000, 0);
        
        const parts = dateStr.split(' ');
        if (parts.length === 2 && isNaN(parseInt(parts[0]))) {
          return new Date(parseInt(parts[1]), monthIndex(parts[0]));
        } else if (parts.length === 3) {
          return new Date(parseInt(parts[2]), monthIndex(parts[1]), parseInt(parts[0]));
        }
        return new Date(0);
      };
      
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateB - dateA;
  });

  function monthIndex(month) {
    const months = {
      "jan": 0, "feb": 1, "mar": 2, "apr": 3, "may": 4, "jun": 5, 
      "jul": 6, "aug": 7, "sep": 8, "oct": 9, "nov": 10, "dec": 11,
      "january": 0, "february": 1, "march": 2, "april": 3, "june": 5,
      "july": 6, "august": 7, "september": 8, "october": 9, "november": 10, "december": 11
    };
    return months[month.toLowerCase()] || 0;
  }

  const TimelineItem = ({ item, index }) => {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { 
      once: false,
      margin: "-10% 0px -10% 0px",
      amount: 0.3
    });
    
    const cardVariants = {
      hidden: { 
        opacity: 0, 
        x: index % 2 === 0 ? -60 : 60,
        y: 20
      },
      visible: { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: { 
          type: "spring", 
          stiffness: 100, 
          damping: 12, 
          mass: 0.9,
          delay: 0.1
        }
      }
    };

    const dotVariants = {
      hidden: { 
        scale: 0,
        opacity: 0
      },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 15, 
          delay: 0.3
        }
      }
    };
    
    const contentVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          staggerChildren: 0.1,
          delayChildren: 0.4,
        }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          type: "spring",
          stiffness: 100,
          damping: 10
        }
      }
    };
    
    return (
      <div 
        ref={itemRef}
        className={`relative md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} md:items-start mb-16 md:mb-20`}
      >
        <div className="hidden md:block absolute left-1/2 top-4 transform -translate-x-1/2">
           <motion.div 
             variants={dotVariants}
             initial="hidden"
             animate={isInView ? "visible" : "hidden"}
             className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 border-2 border-gray-900 shadow-lg flex items-center justify-center"
           >
             <i className="fas fa-briefcase text-[8px] text-white/80"></i>
           </motion.div>
        </div>
        <div className="md:hidden flex justify-center mb-3">
           <motion.div 
             variants={dotVariants}
             initial="hidden"
             animate={isInView ? "visible" : "hidden"}
             className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 border-2 border-gray-900 shadow-lg flex items-center justify-center"
           >
             <i className="fas fa-briefcase text-[6px] text-white/80"></i>
           </motion.div>
        </div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{ 
            scale: 1.03, 
            boxShadow: "0 10px 25px -5px rgba(52, 211, 153, 0.2)",
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} p-5 md:p-6 rounded-xl bg-gray-800/60 backdrop-blur-md border border-gray-700/80 shadow-lg hover:shadow-emerald-500/20 transition-all`}
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="flex justify-between items-start mb-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded flex items-center bg-emerald-900/50 text-emerald-300 border border-emerald-700/50">
                <i className="fas fa-briefcase mr-1.5 text-[10px]"></i>
                Experience
              </span>
              <span className="text-xs text-gray-400">{item.date}</span>
            </motion.div>

            <motion.h4 variants={itemVariants} className="text-xl font-bold text-white mb-1">{item.title}</motion.h4>
            <motion.p variants={itemVariants} className="text-sm text-gray-400 mb-3 font-medium">{item.organization}</motion.p>

            {item.description && (
              <motion.p variants={itemVariants} className="text-sm text-gray-300 mb-4">{item.description}</motion.p>
            )}

            {item.skills && item.skills.length > 0 && (
              <motion.div variants={itemVariants} className="mb-4">
                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Skills/Areas</h5>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ 
                        delay: 0.5 + (idx * 0.05),
                        type: "spring",
                        stiffness: 200,
                        damping: 12
                      }}
                      whileHover={{ scale: 1.05, background: "rgba(75, 85, 99, 0.7)" }}
                      className="px-2.5 py-1 bg-gray-700/50 border border-gray-600/70 text-gray-300 rounded-full text-xs"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    );
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const headerVariants = {
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

  return (
    <div id="experiences" className="relative py-20 md:py-28 pt-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px]"></div>
    
    <motion.div
      className="relative z-10 w-full h-full"
      initial="hidden"
      whileInView="visible"
      variants={sectionVariants}
      viewport={{ once: false, margin: "-100px 0px" }}
      ref={sectionRef}
    >
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          variants={headerVariants}
          className="text-center mb-16 md:mb-24"
        >
          <motion.h2 
            className="text-sm uppercase tracking-widest text-emerald-500 mb-2 font-semibold"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Organizations & Teams
          </motion.h2>
          <motion.h3 
            className="text-4xl sm:text-5xl font-bold mb-5 text-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.1,
              type: "spring",
              stiffness: 100
            }}
          >
            Experiences
          </motion.h3>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-800/30 via-teal-700/50 to-emerald-800/30 transform -translate-x-1/2 rounded-full"></div>
          
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-600/50 via-teal-500/70 to-emerald-600/50 transform -translate-x-1/2 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: lineVisible ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          ></motion.div>

          {experienceItems.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 12
          }} 
          viewport={{ once: false }}
          className="mt-16 md:mt-24 text-center"
        >
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            I collaborate with communities and organizations to develop both technical and interpersonal skills,
            contributing to meaningful initiatives and networking with industry professionals.
          </p>
        </motion.div>
      </div>
    </motion.div>
    </div>
  );
};

export default ExperiencesSection;