import { useEffect, useRef, useState } from "react";
import classes from "./Home.module.css";
import { motion } from "framer-motion";
import { Animation } from "../Animation/Animation";

export function Home() {
  const educationRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);
  const projectsTextRef = useRef<HTMLDivElement>(null);
  const [isProjectsTextVisible, setIsProjectsTextVisible] = useState(false);

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

  useEffect(() => {
    const handleVisibility = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        setIsProjectsTextVisible(true);
      } else {
        setIsProjectsTextVisible(false);
      }
    };

    const projectsTextObserver = new IntersectionObserver(handleVisibility, {
      threshold: 0.1,
    });

    if (projectsTextRef.current) {
      projectsTextObserver.observe(projectsTextRef.current);
    }

    return () => {
      if (projectsTextRef.current) {
        projectsTextObserver.unobserve(projectsTextRef.current);
      }
    };
  }, []);

  return (
    <div className={classes.home}>
      <motion.div
        ref={educationRef}
        animate={{
          opacity: isVisible ? 1 : 0.9,
          y: isVisible ? `${scrollProgress * 1}vh` : 0,
          translateZ: 0,
        }}
        initial={{ opacity: 0, y: "-0vh", translateZ: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <div>
          <h2>My timeline</h2>
          <motion.ul variants={listVariants} initial="hidden" animate="visible">
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
                        <motion.li
                          key={i}
                          variants={listItemVariants}
                          initial="hidden"
                          animate="visible"
                        >
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

      <Animation />

      <div
        className={`${classes.projectsText} ${
          isProjectsTextVisible && classes.visible
        }`}
        ref={projectsTextRef}
      >
        Alright, let's get back to business...
      </div>

      <h2>My Projects</h2>

      <div
        className={classes.project}
        data-hover-text="PANDOTEKA - Group Project"
      >
        <div className={classes.box}>
          <a
            href="https://infoshareacademy.github.io/jfddr8-team-pandy-z-kosmosu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              title="Pandoteka"
              alt="Pandoteka"
              src={process.env.PUBLIC_URL + "/Img/Pandoteka.png"}
            />
          </a>
          <div className={classes.projectDescription}>
            Introducing Pandoteka, the universe's cutest book search app! 📚
            Pandoteka is your go-to book database, enabling users to search,
            view book details, add to wishlists, and explore purchase options.
            For logged-in members, it offers wishlists, comments, and a unique
            panda rating system. Technology Stack: React (with React Router and
            CSS Modules), TypeScript, CSS3, HTML5, Firebase, Cypress, Jest,
            Adobe XD. May the panda be with you 🐼
          </div>
        </div>
      </div>
      <div
        className={classes.project}
        data-hover-text="KRAKOW COURSES - Commercial Project"
      >
        <div className={classes.box}>
          <a
            href="https://www.kursy-krakow-krzykalski.pl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              title="Krakow Courses"
              alt="Krakow Courses"
              src={process.env.PUBLIC_URL + "/Img/KrakowCourses.png"}
            />
          </a>
          <div className={classes.projectDescription}>
            Introducing Pandoteka, the universe's cutest book search app! 📚
            Pandoteka is your go-to book database, enabling users to search,
            view book details, add to wishlists, and explore purchase options.
            For logged-in members, it offers wishlists, comments, and a unique
            panda rating system. Technology Stack: React (with React Router and
            CSS Modules), TypeScript, CSS3, HTML5, Firebase, Cypress, Jest,
            Adobe XD. May the panda be with you 🐼
          </div>
        </div>
      </div>

      <div
        className={classes.project}
        data-hover-text="WALKIE - Passion Project"
      >
        <div className={classes.box}>
          <a
            href="https://www.kursy-krakow-krzykalski.pl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              title="Walkie"
              alt="Walkie"
              src={process.env.PUBLIC_URL + "/Img/Walkie.png"}
            />
          </a>
          <div className={classes.projectDescription}>
            Welcome to Walkie! 🐾 Unleash the fun with our app, connecting pet
            owners for paws-itively delightful walks. Manage your pet squad with
            ease—add details like names, ages, breeds, and more. Spice up their
            profiles with cute photos. Check the weather, grab the leash, and
            have a 'paw-some' time with your furry friends! 🐶🚶‍♂️ #WalkieTime"
          </div>
        </div>
      </div>

      <h2>My Technology</h2>
      <div className={classes.myTechnologyContainer}>
        <div className={classes.mainTechnology}>
          <img
            title="React"
            alt="React icon"
            src={process.env.PUBLIC_URL + "/Img/React-icon.png"}
          />
          <img
            title="HTML5"
            alt="HTML5 icon"
            src={process.env.PUBLIC_URL + "/Img/HTML5.png"}
          />
          <img
            title="CSS3"
            alt="CSS3 icon"
            src={process.env.PUBLIC_URL + "/Img/CSS3.png"}
          />
          <img
            title="JavaScript"
            alt="JavaScript icon"
            src={process.env.PUBLIC_URL + "/Img/Javascript.png"}
          />
          <img
            title="Firebase"
            alt="Firebase icon"
            src={process.env.PUBLIC_URL + "/Img/firebase.png"}
          />
          <img
            title="Linux"
            alt="Linux icon"
            src={process.env.PUBLIC_URL + "/Img/Linux.png"}
          />
          <img
            title="Visual Studio Code"
            alt="Visual Studio Code icon"
            src={process.env.PUBLIC_URL + "/Img/Visual_Studio.png"}
          />

          <div className={classes.basicTechnology}>
            <img
              title="SQL"
              alt="SQL icon"
              src={process.env.PUBLIC_URL + "/Img/Sql.png"}
            />

            <img
              title="java"
              alt="java icon"
              src={process.env.PUBLIC_URL + "/Img/java.png"}
            />

            <img
              title="python"
              alt="python icon"
              src={process.env.PUBLIC_URL + "/Img/Python.png"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
