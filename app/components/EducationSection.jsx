import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const educationData = [
    {
      id: 1,
      period: "2023–2027",
      degree: "B.S. in Software Engineering",
      institution: "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology (GIKI)",
      description:
        "Currently pursuing a Bachelor of Science in Software Engineering with coursework in advanced programming, software architecture, database systems, and machine learning.",
      icon: "🎓",
      colorClass: "from-blue-600 to-blue-400",
      shadowClass: "shadow-blue-500/30",
      tagColorClass: "bg-blue-500/20 text-blue-300"
    },
    {
      id: 2,
      period: "2021–2023",
      degree: "F.Sc. Pre‑Engineering",
      institution: "Forman Christian College (FCC)",
      description:
        "Completed intermediate studies (F.Sc. Pre‑Engineering) with a focus on mathematics, physics, and chemistry.",
      icon: "📚",
      colorClass: "from-purple-600 to-purple-400",
      shadowClass: "shadow-purple-500/30",
      tagColorClass: "bg-purple-500/20 text-purple-300"
    },
    {
      id: 3,
      period: "2019–2021",
      degree: "Matriculation",
      institution: "Army Public School & College (APS)",
      description:
        "Completed matriculation in the science stream, achieving top marks in physics, maths, and computers.",
      icon: "🏫",
      colorClass: "from-emerald-600 to-emerald-400",
      shadowClass: "shadow-emerald-500/30",
      tagColorClass: "bg-emerald-500/20 text-emerald-300"
    },
  ];
  
  return (
    <div id="education" className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-purple-500 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-20"
        >
          <h2 className="text-sm uppercase tracking-widest text-blue-400 font-semibold mb-3">My Journey</h2>
          <h3 className="text-5xl font-bold mb-8 text-white tracking-tight">Education & Learning Path</h3>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {educationData.map((item, index) => (
            <motion.div 
              key={item.id}
              variants={itemVariants}
              className="relative pl-20 mb-20 last:mb-0"
            >
              {index < educationData.length - 1 && (
                <div className="absolute left-7 top-14 bottom-0 w-1 bg-gradient-to-b from-blue-500/70 to-purple-600/70 rounded-full glow-timeline"></div>
              )}
              
              <div className={`absolute left-0 top-0 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${item.colorClass} text-2xl shadow-lg ${item.shadowClass} z-10 border border-white/10`}>
                {item.icon}
              </div>
              
              <motion.div 
                whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-8 bg-gray-800/60 backdrop-blur-lg border border-gray-700/70 rounded-2xl shadow-xl transition-all group"
              >
                <span className={`inline-block px-4 py-1.5 text-sm ${item.tagColorClass} rounded-full mb-4 font-medium`}>
                  {item.period}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {item.degree}
                </h3>
                <h4 className="text-lg font-medium text-blue-300 mb-5 italic">
                  {item.institution}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
                
                <div className={`w-20 h-1 bg-gradient-to-r ${item.colorClass} rounded-full mt-6 opacity-50 group-hover:w-32 transition-all duration-300`}></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EducationSection;