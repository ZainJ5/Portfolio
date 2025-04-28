"use client";

import React from "react";
import { motion } from "framer-motion";
// import { FaTrophy } from "react-icons/fa";

const achievements = [
  {
    id: 1,
    title: "Micathon",
    organization: "Microsoft",
    date: "Mar 2023",
    description:
      "Secured 3rd Place in Microsoft's Micathon, developing an innovative solution for specially abled.",
    skills: ["Python/Qt", "Problem Solving", "Team Collaboration", "Presentation"],
    liveLink: "https://1drv.ms/v/s!AsLeCa7Olk9Hg65gVIya-iUHlqFj3w?e=gTlkE4",
  },
  {
    id: 2,
    title: "Hackathon Runner-up",
    organization: "GDSC GIKI",
    date: "Feb 2024",
    description:
      "Achieved 2nd Place in the GDSC Hackathon, building a project focused on sustainable tech solutions.",
    skills: ["Rapid Prototyping", "Web Development", "Teamwork", "Problem Solving"],
    liveLink: "https://aidpath-gdsc-hackathon.vercel.app/",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-20 px-6 bg-black text-white pt-4 pb-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-purple-500 text-sm uppercase font-semibold tracking-widest"
          >
            Recognition & Awards
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mt-2"
          >
            Achievements
          </motion.h3>
          <motion.div
            className="w-24 h-1 mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "96px", opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </div>

        <motion.div
          className="grid sm:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {achievements.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 20px rgba(139,92,246,0.2)",
              }}
              className="bg-gray-900/80 border border-gray-700/70 p-6 rounded-xl transition-all backdrop-blur-md shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs bg-purple-800/40 text-purple-300 px-2 py-1 rounded-full font-medium flex items-center gap-2">
                  {/* <FaTrophy className="text-[10px]" /> Achievement */}
                </span>
                <span className="text-xs text-gray-400">{item.date}</span>
              </div>
              <h4 className="text-xl font-bold mb-1">{item.title}</h4>
              <p className="text-sm text-gray-400 mb-2 font-medium">
                {item.organization}
              </p>
              <p className="text-sm text-gray-300 mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-full border border-gray-600/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {item.liveLink && (
                <a
                  href={item.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-emerald-400 hover:text-emerald-300 inline-flex items-center group"
                >
                  View Project
                  <svg
                    className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-gray-400 max-w-2xl mx-auto mt-16"
        >
          Driven by a passion for innovation and problem-solving, I consistently
          strive to make an impact through technology-focused competitions and
          challenges.
        </motion.p>
      </div>
    </section>
  );
};

export default AchievementsSection;
