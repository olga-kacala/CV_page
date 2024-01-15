import { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import classes from "./Home.module.css";
import { motion } from "framer-motion";

export function Home() {
  const educationRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const educationElement = educationRef.current;

      if (educationElement) {
        const position = educationElement.getBoundingClientRect();

        const progress = Math.max(
          0,
          Math.min(
            1,
            (position.top + window.innerHeight * 0.1) / window.innerHeight
          )
        );

        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const experiences = [
    {
      class:"education",
      title: "Engineer's Degree",
      institution: "AGH University of Krakow",
      date: "2008 - 2012",
      details: [
        "Faculty of Material Science and Ceramics",
        "Field of Study: Chemical Technology",
        "Field of Specialization: Technology of Building Materials",
      ],
    },
    {
      class:"education",
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
      class:"experience",
      title: "Technology Specialist",
      institution: "The Institute of Ceramics and Building Materials; Opole",
      date: "2014 - 2017",
    },
    {
      class:"experience",
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
      class:"experience",
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
      class:"experience",
      title: "Business Unit QHSE Manager",
      institution: "Skamol; Opole",
      date: "2019 - 2020",
      details: [
        "Standardized QHSE procedures in BU Boards production plants",
        "Led the implementation project of a new production line in Opole plant",
      ],
    },
    {
      class:"experience",
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
      class:"education",
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
      class:"education",
      title: "Postgraduate Diploma",
      institution: "AGH University of Krakow",
      date: "Nov 2023 - Jun 2024",
      details: [
        "Computer Science – Design, Programming, and System Operation postgraduate studies encompass a comprehensive curriculum across two semesters, emphasizing hands-on learning of languages such as Java, Python, HTML, CSS, SQL and computer graphics.",
      ],
    },

  ];

  const listItemVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: 0, transition: {durantion: 1.5, ease:'easeInOut'} },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 1 } },
  };

  return (
    <div className={classes.home}>
      <motion.div
        ref={educationRef}
        animate={{ opacity: 1, y: `${scrollProgress * 0}vh`, translateZ: 0 }}
        initial={{ opacity: 0, y: '-100vh', translateZ: 0 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div>
          <h2>My timeline</h2>
          <motion.ul variants={listVariants} initial="hidden" animate="visible">
            {experiences.map((experience, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                className={classes[experience.class]} // Use the dynamically generated class name
              >
                <h3>{experience.title}</h3>
                <p>{experience.institution}</p>
                <p>{experience.date}</p>
                {experience.details && (
                  <motion.ul variants={listVariants} initial="hidden" animate="visible">
                    {experience.details.map((detail, i) => (
                      <motion.li key={i} variants={listItemVariants}>
                        {detail}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </div>
  );
}