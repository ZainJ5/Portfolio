import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ProjectsSection = () => {
  const ref = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const projects = [
    {
      id: 1,
      title: "Real Time Chatting Application",
      description:
        "A real-time chat application built with Express.js, EJS, Socket Programming, and MongoDB. It enables seamless live messaging through an intuitive interface.",
      image: "/project/chatapp.jpg",
      tags: ["Express.js", "EJS", "Socket Programming", "MongoDB"],
      link: "https://jellyfish-app-2-s6s5k.ondigitalocean.app/",
      github: "https://github.com/ZainJ5/ChatApp",
    },
    {
      id: 2,
      title: "E-commerce Platform (Nike Store)",
      description:
        "A full-stack shoe store. Users can browse through various categories of shoes, view product information, and place orders. Admin panel allows to manage entire store.",
      image: "/project/nike.png",
      tags: ["React", "Node.js", "MongoDB", "Express", "Firebase"],
      link: "https://reimaginednikeapp.vercel.app/",
      github: {
        frontend: "https://github.com/ZainJ5/frontendNike",
        backend: "https://github.com/ZainJ5/backendNike",
      },
    },    
    {
      id: 3,
      title: "GIKI Chatbot (RAG)",
      description:
        "A custom chatbot leveraging Retrieval Augmented Generation (RAG) to provide accurate responses by scraping data from various social media platforms. Led as part of a GDSC project.",
      image: "/project/giki_chatbot.png",
      tags: ["React.js", "OpenAI Embeddings", "OpenAI", "Flask"],
      video: "/project/giki_chatbot_video.mp4",
      link: "#",
      github: "https://github.com/ZainJ5/GIKI_chatBot",
    },
    {
      id: 4,
      title: "Restaurant Website with Admin Portal",
      description:
        "A comprehensive restaurant website featuring an integrated admin portal for managing orders, menu updates, and reservations. Built using Next.js, Firebase, and MongoDB.",
      image: "/project/resturant.jpg",
      tags: ["Next.js", "Firebase", "MongoDB"],
      link: "https://restaurant-website-h3zupaafp-zain-jamshaids-projects.vercel.app/",
      github: "https://github.com/ZainJ5/Restaurant-website",
    },
    {
      id: 5,
      title: "Social Connect",
      description:
        "A social networking platform that enables real-time interactions, post sharing, and friend connections. It features an efficient backend built with C++ (Crow) alongside a dynamic React.js interface.",
      image: "/project/socialconnect.jpg",
      tags: ["React.js", "Data Structures & Algorithms", "C++ (Crow)"],
      video: "/project/socialconnect.mp4",
      link: "#",
      github: "https://github.com/ZainJ5/SocialConnect",
    },
    {
      id: 6,
      title: "YouTube Clone",
      description:
        "A video streaming application replicating core features of YouTube. Developed using Qt and C++ with robust file handling to ensure smooth video management. Creator poratal to add videos and users can view like comment on them",
      image: "/project/youtube.png", 
      tags: ["Qt", "C++", "File Handling"],
      video: "/project/youtube.mp4", 
      link: "#",
      github: "https://github.com/ZainJ5/Video-Streaming-app-Youtube-clone-",
    },
  ];
  
  const getGithubUrl = (github) => {
    if (typeof github === 'string') return github;
    return github?.frontend || "#";
  };
  
  return (
 <div id="projects" className="py-20 bg-gradient-to-b from-gray-900 pt-0 via-black to-gray-900">
        <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-widest text-blue-500 mb-2 font-semibold">My Work</h2>
          <h3 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-100">Featured Projects</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
              className="rounded-xl overflow-hidden group transition-all duration-300 flex flex-col h-full"
            >
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col h-full">
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10" />
                  
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 w-full h-full"
                  />
                  
                  <div className="absolute bottom-4 right-4 z-20 flex space-x-3">
                    <a 
                      href={getGithubUrl(project.github)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 bg-gray-900/90 hover:bg-gray-800 rounded-full text-gray-300 hover:text-white transition-colors shadow-md hover:shadow-lg"
                      aria-label="View GitHub repository"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    
                    {project.link !== "#" && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2.5 bg-gray-900/90 hover:bg-gray-800 rounded-full text-gray-300 hover:text-white transition-colors shadow-md hover:shadow-lg"
                        aria-label="View live demo"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    
                    {project.video && (
                      <button
                        onClick={() => setSelectedVideo(project.video)}
                        className="p-2.5 bg-blue-600/90 hover:bg-blue-700 rounded-full text-white transition-colors shadow-md hover:shadow-lg"
                        aria-label="Watch video demo"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {project.video && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/90 text-white text-xs font-medium rounded-full shadow-lg">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Demo Video
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h4>
                  <div className="description-container flex-grow mb-5" style={{ minHeight: '100px' }}>
                    <p className="text-gray-300 text-sm md:text-base">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: false }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/ZainJ5" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all shadow-blue-500/20 shadow-md"
          >
            View More Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
        
        <AnimatePresence>
          {selectedVideo && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
              >
                <div className="absolute top-4 right-4 z-10">
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="p-2 bg-gray-800/90 hover:bg-gray-700 rounded-full text-white transition-colors"
                    aria-label="Close video"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="relative pt-[56.25%]"> 
                  <video 
                    className="absolute inset-0 w-full h-full object-cover"
                    src={selectedVideo}
                    controls
                    autoPlay
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Gradient transition at the end */}
{/* <div className="h-24 md:h-32 w-full bg-gradient-to-b from-black to-gray-900" /> */}

    </div>
  );
};

export default ProjectsSection;