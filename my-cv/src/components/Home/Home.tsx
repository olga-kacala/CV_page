import { useEffect, useRef, useState } from "react";
// import { Link } from "react-scroll";
import classes from "./Home.module.css";
import { motion } from "framer-motion";
import { CartoonPerson } from "../CartoonPerson /CartoonPerson";
import {Animation} from "../Animation/Animation"

export function Home() {
  const educationRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const educationElement = educationRef.current;

      if (educationElement) {
        const position = educationElement.getBoundingClientRect();

        const progress = Math.max(
          0,
          Math.min(
            1,
            (position.top + window.innerHeight * 1) / window.innerHeight
          )
        );

        setScrollProgress(progress);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.5 } 
    );
 
    if (educationRef.current) {
      observer.observe(educationRef.current);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const experiences = [
    {
      class: "education",
      title: "Engineer's Degree",
      institution: "AGH University of Krakow",
      date: "2008 - 2012",
      details: [
        "Faculty: Material Science and Ceramics",
        "Field of Study: Chemical Technology",
        "Field of Specialization: Technology of Building Materials",
      ],
    },
    {
      class: "education",
      title: "Master's Degree",
      institution: "AGH University of Krakow",
      date: "2012 - 2013",
      details: [
        "Faculty of Material Science and Ceramics",
        "Field of Study: Chemical Technology",
        "Field of Specialization: Technology of Building Materials",
      ],
    },
    {
      class: "experience",
      title: "Technology Specialist",
      institution: "The Institute of Ceramics and Building Materials; Opole",
      date: "2014 - 2017",
    },
    {
      class: "experience",
      title: "Process & Quality Specialist",
      institution: "Skamol; Opole",
      date: "2017 - 2018",
      details: [
        "Established a new quality laboratory and set procedures",
        "Member of the Start-up Team in Opole plant",
        "Prepared for ISO 9001 and CE marking audits",
      ],
    },
    {
      class: "experience",
      title: "Process & Quality Manager",
      institution: "Skamol; Opole",
      date: "2018 - 2019",
      details: [
        "Extended Quality Department",
        "Verified product quality against the cost of production",
        "Handled customer claims and performed internal audits",
      ],
    },
    {
      class: "experience",
      title: "Business Unit QHSE Manager",
      institution: "Skamol; Opole",
      date: "2019 - 2020",
      details: [
        "Standardized QHSE procedures in BU Boards production plants",
        "Led the implementation project of a new production line in Opole plant",
      ],
    },
    {
      class: "experience",
      title: "QHSE Manager",
      institution: "McBride; Strzelce Opolskie",
      date: "2020 - 2022",
      details: [
        "Managed H&S, Environmental, and Quality Department with 2 laboratories",
        "Coordinated root cause analyses with multi-department teams",
        "Maintained H&S and Environmental standards within ISO 14001 and 45001",
      ],
    },
    {
      class: "education",
      title: "Front-End Developer Diploma",
      institution: "Infoshare Academy Sp. z o.o.",
      date: "Nov 2022 - Feb 2023",
      details: [
        "Worked in HTML, CSS, JavaScript, TypeScript, React, Git, Webpack, Firebase",
        "Developed responsive website and application layouts",
        "Conducted static code analysis (Jest) and e2e tests (Cypress)",
        "Utilized Scrum (Jira) and teamwork for project development",
      ],
    },
    {
      class: "education",
      title: "Postgraduate Diploma",
      institution: "AGH University of Krakow",
      date: "Nov 2023 - Jun 2024",
      details: [
        "Faculty: Computer Science",
        "Field of Study: Design, Programming and System Operation",
        "Worked in Java, Python, HTML, CSS, SQL and computer graphics",
      ],
    },
  ];

  const listItemVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 1.5 } },
  };

  return (
    <div className={classes.home}>
      <motion.div
        ref={educationRef}
        animate={{
          opacity: isVisible ? 1 : 0.5,
          y: isVisible ? `${scrollProgress * 1}vh` : 0,
          translateZ: 0,
        }}
        initial={{ opacity: 0, y: "-0vh", translateZ: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <div>
          <h2>My timeline</h2>
          <motion.ul variants={listVariants} initial="hidden"  animate="visible" >
            {experiences.map((experience, index) => (
              <div
                className={classes.timelineItem}
                key={index}
                onMouseEnter={() => setHoveredExperience(index)}
                onMouseLeave={() => setHoveredExperience(null)}
              >
                <motion.li
                  variants={listItemVariants}
                  className={classes[experience.class]}
                >
                  <h3>{experience.title}</h3>
                  <p>{experience.institution}</p>
                  <p>{experience.date}</p>
                  {hoveredExperience === index && experience.details && (
                    <motion.ul
                      variants={listVariants}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                    >
                      {experience.details.map((detail, i) => (
                        <motion.li key={i} variants={listItemVariants}
                        initial="hidden"
                      animate= "visible">
                          {detail}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </motion.li>
              </div>
            ))}
          </motion.ul>
        </div>
      </motion.div>
      <div> <Animation /></div>
     
    </div>
  );
}
