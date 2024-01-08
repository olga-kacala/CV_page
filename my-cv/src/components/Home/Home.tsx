import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import classes from './Home.module.css';
import { motion } from 'framer-motion';

export function Home() {
  const educationRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const educationElement = educationRef.current;

      // Check if educationElement is not null before proceeding
      if (educationElement) {
        const position = educationElement.getBoundingClientRect();

        // Calculate scroll progress based on the position of the education section
        const progress = Math.max(0, Math.min(1, (position.top + window.innerHeight * 0.75) / window.innerHeight));

        // Update scroll progress state
        setScrollProgress(progress);
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={classes.home}>
      <motion.div
        ref={educationRef}
        animate={{ opacity: 1, y: `${scrollProgress * 40}vh`, translateZ: 0 }}
        initial={{ opacity: 0, y: '-100vh', translateZ: 0 }}
        transition={{ duration: 2 }}
        style={{ overflow: 'hidden' }}
      >
        <Link to="education" smooth={true} duration={500}>
          Education
        </Link>
      </motion.div>
    </div>
  );
}
