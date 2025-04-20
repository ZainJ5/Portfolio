"use client";

import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import dynamic from 'next/dynamic';

import Navbar from './components/NavBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import EducationSection from './components/EducationSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import AchievementsSection from './components/AchievementsSection.jsx';
import CertificatesSection from './components/CertificatesSection.jsx';
import ExperiencesSection from './components/ExperiencesSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

const Cursor = dynamic(() => import('./components/Cursor.jsx'), { ssr: false });

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Cursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <ExperiencesSection />
      <CertificatesSection/>
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}