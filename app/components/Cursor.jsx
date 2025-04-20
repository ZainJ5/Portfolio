import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false); 

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });

    const element = document.elementFromPoint(e.clientX, e.clientY);

    
    const pointerElements = ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL'];
    const isPointerElement = element && (
      pointerElements.includes(element.tagName) ||
      element.closest('button, a, input, textarea, select, label') || 
      element.classList.contains('cursor-pointer') ||
      getComputedStyle(element).cursor === 'pointer'
    );
    setIsPointer(isPointerElement);

    
    const textElements = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI'];
    const isTextElement = element && textElements.includes(element.tagName);
    setIsHoveringText(isTextElement && !isPointerElement); 
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  
  const cursorVariants = {
    default: {
      scale: 1,
      borderWidth: '1px',
      opacity: 1,
    },
    pointer: {
      scale: 1.5, 
      borderWidth: '2px', 
      opacity: 0.8,
    },
    text: { 
      scale: 1.2,
      borderWidth: '0px', 
      opacity: 0.5,
      backgroundColor: 'rgba(0, 0, 255, 0.1)', 
    }
  };

  const dotVariants = {
      default: {
          scale: 1,
          backgroundColor: 'rgb(59 130 246)', 
      },
      pointer: {
          scale: 0, 
          backgroundColor: 'rgb(37 99 235)', 
      },
      text: { 
          scale: 0.5, 
          backgroundColor: 'rgb(96 165 250)', 
      }
  }

  let currentVariant = "default";
  if (isPointer) {
      currentVariant = "pointer";
  } else if (isHoveringText) {
      currentVariant = "text";
  }


  return (
    <>
      <motion.div
        className="fixed w-8 h-8 rounded-full border border-blue-500/80 pointer-events-none z-50 hidden md:block"
        variants={cursorVariants}
        animate={currentVariant}
        transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.2 }}
        style={{
            x: position.x - 16, 
            y: position.y - 16,
        }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-blue-500 mix-blend-difference pointer-events-none z-[51] hidden md:block" 
        variants={dotVariants}
        animate={currentVariant}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.1 }} 
         style={{
            x: position.x - 4, 
            y: position.y - 4,
        }}
      />
    </>
  );
};

export default Cursor;