"use client"
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { Environment, PresentationControls, Stars, Sparkles } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

function CosmicBackground() {
  const galaxyRef = useRef();
  
  useFrame(({ clock }) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      galaxyRef.current.rotation.z = clock.getElapsedTime() * 0.03;
    }
  });
  
  return (
    <group ref={galaxyRef}>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      <Sparkles 
        count={100}
        scale={10}
        size={2}
        speed={0.3}
        color="#8b2bfb"
      />
      <Sparkles 
        count={100}
        scale={15}
        size={1}
        speed={0.2}
        color="#ffffff"
      />
    </group>
  );
}

function BackgroundCanvas() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: 'black',
        pointerEvents: 'none' 
      }}
    >
      <ambientLight intensity={0.4} />
      <CosmicBackground />
    </Canvas>
  );
}

function Model({ setModelLoaded }) {
  const gltf = useLoader(GLTFLoader, '/models/gaming-pc/scene.gltf');
  const modelRef = useRef();

  const [scale, setScale] = useState(0.45);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 480) setScale(0.40);
      else if (width < 640) setScale(0.50);
      else if (width < 900) setScale(0.50);
      else if (width < 1280) setScale(0.60);
      else setScale(0.45);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (gltf) {
      setTimeout(() => setModelLoaded(true), 500);
    }
  }, [gltf, setModelLoaded]);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2,
        0.02
      );
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={scale}
      position={[0, -0.5, 0]}
      rotation={[0, -0.2, 0]}
    />
  );
}

const HeroSection = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [stars, setStars] = useState([]);
  const [glows, setGlows] = useState([]);

  useEffect(() => {
    const starsArr = Array.from({ length: 80 }).map((_, i) => ({
      width: `${Math.random() * 2 + 0.5}px`,
      height: `${Math.random() * 2 + 0.5}px`,
      backgroundColor: i % 5 === 0 ? '#8b2bfb' : '#ffffff',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.7 + 0.1,
      boxShadow: i % 5 === 0 ? '0 0 4px 1px rgba(139, 43, 251, 0.6)' : '0 0 2px rgba(255, 255, 255, 0.6)'
    }));
    
    const glowsArr = Array.from({ length: 12 }).map(() => ({
      width: `${Math.random() * 3 + 2}px`,
      height: `${Math.random() * 3 + 2}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      boxShadow: '0 0 6px 2px rgba(139, 43, 251, 0.5)',
      duration: Math.random() * 3 + 3
    }));
    
    setStars(starsArr);
    setGlows(glowsArr);
    
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  return (
    <div id="home" className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <BackgroundCanvas />
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.15]"
          style={{
            background:
              'radial-gradient(circle at center, #8b2bfb 0%, rgba(139, 43, 251, 0.2) 30%, transparent 70%)'
          }}
        ></div>
        <div
          className="absolute -left-20 top-1/4 w-[300px] h-[300px] rounded-full opacity-[0.12]"
          style={{
            background:
              'radial-gradient(circle at center, #8b2bfb 0%, rgba(139, 43, 251, 0.2) 35%, transparent 70%)'
          }}
        ></div>
        {stars.map((style, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={style}
          ></div>
        ))}
        {glows.map((style, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute rounded-full bg-[#8b2bfb]"
            style={style}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: style.duration,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          ></motion.div>
        ))}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(139, 43, 251, 0.8) 0%, transparent 20%),
              radial-gradient(circle at 80% 40%, rgba(139, 43, 251, 0.8) 0%, transparent 25%)
            `,
            filter: 'blur(40px)'
          }}
        ></div>
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="30%" x2="15%" y2="60%" stroke="#8b2bfb" strokeWidth="0.3" />
          <line x1="15%" y1="60%" x2="40%" y2="80%" stroke="#8b2bfb" strokeWidth="0.3" />
          <line x1="40%" y1="80%" x2="60%" y2="40%" stroke="#8b2bfb" strokeWidth="0.3" />
          <line x1="80%" y1="10%" x2="90%" y2="30%" stroke="#8b2bfb" strokeWidth="0.3" />
          <line x1="90%" y1="30%" x2="75%" y2="50%" stroke="#8b2bfb" strokeWidth="0.3" />
          <circle cx="10%" cy="30%" r="1" fill="#8b2bfb" />
          <circle cx="15%" cy="60%" r="0.8" fill="#8b2bfb" />
          <circle cx="40%" cy="80%" r="1.2" fill="#8b2bfb" />
          <circle cx="60%" cy="40%" r="1" fill="#8b2bfb" />
          <circle cx="80%" cy="10%" r="0.8" fill="#8b2bfb" />
          <circle cx="90%" cy="30%" r="1" fill="#8b2bfb" />
          <circle cx="75%" cy="50%" r="0.8" fill="#8b2bfb" />
        </svg>
        <div
          className="absolute bottom-0 left-0 w-full h-[150px] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, black)'
          }}
        ></div>
      </div>

      <div className="h-16 sm:h-20"></div>

      <div className="container mx-auto pl-4 pr-0 sm:pl-6 py-4 sm:py-8 md:py-10 lg:py-12 min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center">
        <div className="flex flex-col lg:flex-row w-full items-center gap-6 sm:gap-8 lg:gap-12">
          <motion.div
            className="w-full lg:w-3/5 z-10 text-center lg:text-left pt-4 sm:pt-8 lg:pt-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-xl md:text-2xl font-medium text-blue-400 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hello, I'm
            </motion.h2>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Zain Jamshaid
            </motion.h1>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mb-6 rounded-full mx-auto lg:mx-0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: 'center left' }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-md sm:max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Software Engineering Student & Web Developer passionate about creating innovative digital experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(139, 43, 251, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = "#projects"}
                className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg transition-all duration-300 text-sm sm:text-base"
              >
                View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = "#contact"}
                className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 border-2 border-white/20 text-white font-medium rounded-lg transition-all duration-300 text-sm sm:text-base"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div
            className={`w-full lg:w-3/5 z-10
              ${isPortrait ? 'mt-10 lg:mt-0' : 'mt-8 lg:mt-0'}
              min-h-[280px] xs:min-h-[320px] sm:min-h-[350px] 
              h-[40vw] max-h-[75vh] flex items-center justify-center
              relative`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full rounded-lg overflow-visible">
              <motion.div
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/60"
                initial={{ opacity: 1 }}
                animate={{ opacity: modelLoaded ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                style={{ pointerEvents: modelLoaded ? 'none' : 'auto' }}
              >
                <div className="text-center">
                  <div className="inline-block w-8 h-8 border-4 border-blue-500/50 border-t-blue-500 rounded-full animate-spin mb-3"></div>
                  <p className="text-sm text-blue-300">Loading 3D Model...</p>
                </div>
              </motion.div>
              <div className="absolute inset-0">
                <Canvas
                  shadows
                  dpr={[1, 2]}
                  camera={{ position: [0, 0, 7.2], fov: 50 }}
                  style={{
                    background: 'transparent',
                    width: '80%',
                    height: '80%',
                    pointerEvents: 'auto',
                    margin: 'auto'
                  }}
                >
                  <PresentationControls
                    global
                    zoom={0.92}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                  >
                    <Suspense fallback={null}>
                      <Model setModelLoaded={setModelLoaded} />
                      <Environment preset="city" background={false} />
                    </Suspense>
                  </PresentationControls>
                  <ambientLight intensity={0.6} />
                  <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.2} castShadow />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                </Canvas>
              </div>
              <div
                className="absolute left-1/2 bottom-6 -translate-x-1/2 pointer-events-none z-20"
                style={{
                  width: '60%',
                  height: '36px',
                  filter: 'blur(8px)',
                  opacity: 0.25
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, #8b2bfb33 40%, transparent 80%)'
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;