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
        <span>
        Education:

Post Engineer's Degree: University of Science and Technology in Kraków, 2023 - 2024
Faculty of Computer Science
Master's Degree: University of Science and Technology in Kraków, 2012 - 2013
Faculty of Material Science and Ceramics
Field of Study: Chemical Technology
Field of Specialization: Technology of Building Materials
Engineer's Degree: University of Science and Technology in Kraków, 2008 - 2012
        </span>
      </motion.div>

      <motion.div
        ref={educationRef}
        animate={{ opacity: 1, y: `${scrollProgress * 40}vh`, translateZ: 0 }}
        initial={{ opacity: 0, y: '-100vh', translateZ: 0 }}
        transition={{ duration: 2 }}
        style={{ overflow: 'hidden' }}
      >
        <span>
        Professional Experience:

QHSE Manager: McBride; Strzelce Opolskie | Dec 2020 - Nov 2022

Managed H&S, Environmental, and Quality Department with 2 laboratories
Coordinated root cause analyses with multi-department teams
Maintained H&S and Environmental standards within ISO 14001 and 45001.
Business Unit QHSE Manager: Skamol; Opole | Feb 2019 - Dec 2020

Standardized QHSE procedures in BU Boards production plants
Led the implementation project of a new production line in Opole plant
Process & Quality Manager: Skamol; Opole | Oct 2018 - Feb 2019

Extended Quality Department
Verified product quality against the cost of production
Handled customer claims and performed internal audits
Process & Quality Specialist: Skamol; Opole | Feb 2017 - Oct 2018

Established a new quality laboratory and set procedures
Member of the Start-up Team in Opole plant
Prepared for ISO 9001 and CE marking audits
Engineering Technologist: The Institute of Ceramics and Building Materials; Opole | Jun 2014 - Feb 2017
        </span>
      </motion.div>
      <motion.div
        ref={educationRef}
        animate={{ opacity: 1, y: `${scrollProgress * 40}vh`, translateZ: 0 }}
        initial={{ opacity: 0, y: '-100vh', translateZ: 0 }}
        transition={{ duration: 2 }}
        style={{ overflow: 'hidden' }}
      >
        <span>
        Front-End Development Experience:

Front-End Developer: Infoshare Academy Sp. z o.o. | Nov 2022 - Feb 2023
Worked in HTML, CSS, JavaScript, TypeScript, React, Git, Webpack, Firebase
Developed responsive website and application layouts
Conducted static code analysis (Jest) and e2e tests (Cypress)
Utilized Scrum (Jira) and teamwork for project development
        </span>
      </motion.div>

      <motion.div
        ref={educationRef}
        animate={{ opacity: 1, y: `${scrollProgress * 40}vh`, translateZ: 0 }}
        initial={{ opacity: 0, y: '-100vh', translateZ: 0 }}
        transition={{ duration: 2 }}
        style={{ overflow: 'hidden' }}
      >
        <span>
        Skills:

Junior/Mid: HTML, CSS, JavaScript, React, TypeScript, Firebase
Junior: Python, Java, SQL, Jest, Cypress
Strong: ISO 9001, 14001, 45001, CE, Scrum, Jira, Git
Language: English (C1)
        </span>
      </motion.div>

    </div>
  );
}
