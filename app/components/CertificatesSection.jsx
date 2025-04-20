"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const CertificatesSection = () => {
  const certificateItems = [
    {
      id: 1,
      title: "Advanced React",
      organization: "Coursera",
      date: "7 August 2024",
      verifyLink: "https://www.coursera.org/account/accomplishments/records/IKVL10PXERYB",
      skills: ["Context API", "Higher-Order Components", "React Performance", "Advanced Hooks"],
      type: "Certification",
    },
    {
      id: 2,
      title: "React Basics",
      organization: "Coursera",
      date: "31 July 2024",
      verifyLink: "https://www.coursera.org/account/accomplishments/records/WUSX4Y4P4Q9E",
      skills: ["JSX", "Component Architecture", "Props & State", "React Hooks"],
      type: "Certification",
    },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const CertificateCard = ({ certificate, index }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const [hover, setHover] = useState(false);
    const cardRef = useRef(null);
    const isCardInView = useInView(cardRef, { once: false, amount: 0.3 });

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setRotation({
        x: y * -8,
        y: x * 5,
        z: 0,
      });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0, z: 0 });
      setHover(false);
    };

    return (
      <motion.div
        className="w-full h-full"
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={
          isCardInView
            ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: index * 0.2,
              },
            }
            : {}
        }
      >
        <motion.div
          className="relative w-full h-full perspective-1000 "
          style={{
            perspective: "2000px",
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={handleMouseLeave}
          animate={{
            scale: 1,
            rotateX: rotation.x,
            rotateY: rotation.y,
            z: rotation.z,
            y: 0,
            boxShadow: hover
              ? "0 20px 40px -12px rgba(0, 0, 0, 0.3), 0 12px 24px -12px rgba(0, 0, 0, 0.4)"
              : "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 15,
              mass: 0.8,
            },
          }}
        >
          <motion.div
            className="relative w-full rounded-xl overflow-hidden transform-style-3d bg-gray-900 border border-gray-800 h-full"
            animate={{
              borderColor: "rgb(31, 41, 55)",
            }}
          >
            <div className="relative p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <div className="px-3 py-1 bg-purple-900/50 rounded-md text-purple-300 text-xs font-medium">
                  {certificate.type}
                </div>
                <span className="text-gray-500 text-sm">{certificate.date}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">{certificate.title}</h3>

              <p className="text-gray-400 text-base mb-4">{certificate.organization}</p>

              {certificate.description && (
                <p className="text-gray-400 text-sm mb-5">{certificate.description}</p>
              )}

              <div className="mb-2 mt-auto">
                <p className="text-gray-500 text-xs uppercase mb-2 font-medium">Key Skills/Areas</p>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-2 border-t border-gray-800 flex">
                <a
                  href={certificate.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-teal-500 text-sm hover:text-teal-400 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Certificate
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="ml-1"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -bottom-2 left-2 right-2 h-8 rounded-xl bg-black/40 blur-md z-0"
            animate={{
              opacity: hover ? 0.3 : 0.2,
              scale: hover ? 0.97 : 0.95,
              x: rotation.y * -3,
              y: 2 + rotation.x * 0.3,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          ></motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="certificates" className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 bg-black" ref={sectionRef}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#555_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <motion.div
        className="container relative z-10 mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? {
              opacity: 1,
              transition: { duration: 0.8 },
            }
            : {}
        }
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={
            isInView
              ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.2 },
              }
              : {}
          }
        >
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-2 font-semibold">
            Professional Development
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-5 text-white">Certificates</h3>
          <motion.div
            className="w-24 h-1 bg-purple-700 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={
              isInView
                ? {
                  width: 96,
                  transition: { duration: 0.8, delay: 0.4 },
                }
                : {}
            }
          ></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {certificateItems.map((certificate, index) => (
            <div className="h-full" key={certificate.id}>
              <CertificateCard certificate={certificate} index={index} />
            </div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={
            isInView
              ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.6 },
              }
              : {}
          }
        >
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">
            Continuously enhancing my skills through professional certifications and technical
            courses to stay current with industry best practices.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CertificatesSection;
