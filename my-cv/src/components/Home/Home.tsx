import { useRef, useState, useEffect } from "react";
import classes from "./Home.module.css";
import { Animation } from "../Animation/Animation";
import { Link } from "react-router-dom";

export function Home() {
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(
    null
  );
  const projectsTextRef = useRef<HTMLDivElement>(null);
  const [isProjectsTextVisible, setIsProjectsTextVisible] = useState(false);

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

  const windowScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={classes.home}>
      <div>
        <div>
          <h2>My timeline</h2>
          <ul>
            {experiences.map((experience, index) => (
              <div
                className={classes.timelineItem}
                key={index}
                onMouseEnter={() => setHoveredExperience(index)}
                onMouseLeave={() => setHoveredExperience(null)}
              >
                <li className={classes[experience.class]}>
                  <h3>{experience.title}</h3>
                  <p>{experience.institution}</p>
                  <p>{experience.date}</p>
                  {hoveredExperience === index && experience.details && (
                    <ul>
                      {experience.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <Animation />
      
      <div
        className={`${classes.projectsText} ${
          isProjectsTextVisible && classes.visible
        }`}
        ref={projectsTextRef}
      >
        ...Alright, let's get back to business...
      </div>

      <h2>My Projects</h2>

      <div className={classes.project} data-hover-text="Group Project">
        <div className={classes.box}>
          <img
            className={classes.projectQR}
            title="Scan me"
            alt="QR code"
            src={process.env.PUBLIC_URL + "/Img/qrPandoteka.png"}
          />
          <a
            className={classes.projectLinks}
            href="https://infoshareacademy.github.io/jfddr8-team-pandy-z-kosmosu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={classes.projectScreen}
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
            <a
              href="https://github.com/olga-kacala/Pandoteka"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={classes.Logo}
                title="GH"
                alt="GitHub"
                src={process.env.PUBLIC_URL + "/Img/github-logo.webp"}
              />
            </a>
          </div>
        </div>
      </div>
      <div className={classes.project} data-hover-text="Commercial Project">
        <div className={classes.box}>
          <img
            className={classes.projectQR}
            title="Scan me"
            alt="QR code"
            src={process.env.PUBLIC_URL + "/Img/qrKursy.png"}
          />
          <a
            className={classes.projectLinks}
            href="https://www.kursy-krakow-krzykalski.pl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={classes.projectScreen}
              title="Krakow Courses"
              alt="Krakow Courses"
              src={process.env.PUBLIC_URL + "/Img/KrakowCourses.png"}
            />
          </a>
          <div className={classes.projectDescription}>
            This React-based project utilizes React Router for navigation,
            featuring pages such as Home, Tour, Language, and Contact. The
            application incorporates responsive design with CSS modules for
            styling, ensuring a visually appealing user interface. Language
            courses are highlighted, complete with dynamic scrolling
            functionality. The Tour section showcases a carousel of images and
            detailed information about guided tours in Krakow, demonstrating the
            project's interactive and informative nature.
          </div>
        </div>
      </div>

      <div className={classes.project} data-hover-text="Passion Project">
        <div className={classes.box}>
          <img
            className={classes.projectQR}
            title="Scan me"
            alt="QR code"
            src={process.env.PUBLIC_URL + "/Img/qrWalkie.png"}
          />
          <a
            className={classes.projectLinks}
            href="https://olga-kacala.github.io/Go-for-a-walkie/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={classes.projectScreen}
              title="Walkie"
              alt="Walkie"
              src={process.env.PUBLIC_URL + "/Img/Walkie.png"}
            />
          </a>

          <div className={classes.projectDescription}>
            🚧🚧!UNDER CONSTRUCTION!🚧🚧
            <br /> Welcome to Walkie! 🐾 Unleash the fun with our app,
            connecting pet owners for paws-itively delightful walks. Manage your
            pet squad with ease—add details like names, ages, breeds, and more.
            Spice up their profiles with cute photos. Check the weather, grab
            the leash, and have a 'paw-some' time with your furry friends! 🐶
            <a
              href="https://github.com/olga-kacala/Go-for-a-walkie"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={classes.Logo}
                title="GH"
                alt="GitHub"
                src={process.env.PUBLIC_URL + "/Img/github-logo.webp"}
              />
            </a>
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
      <h2>My languages</h2>
      <div className={classes.myLangContainer}>
        <div className={classes.mainLang}>
          <img
            title="English language"
            alt="English language"
            src={process.env.PUBLIC_URL + "/Img/eng.svg.webp"}
          />
          <img
            title="Polish language"
            alt="Polish language"
            src={process.env.PUBLIC_URL + "/Img/pol.png"}
            className={classes.polishFlag}
          />
        </div>
        <div className={classes.basicLang}>
          <img
            title="Norwegian language"
            alt="Norwegian language"
            src={process.env.PUBLIC_URL + "/Img/nor.jpeg"}
          />
          <img
            title="Danish language"
            alt="Danish language"
            src={process.env.PUBLIC_URL + "/Img/dk.png"}
          />
        </div>
      </div>

      <h2>My References</h2>
      <div className={classes.referencesContainer}>
        <img
          title="My partner in crime"
          alt="ChatGPT icon"
          src={process.env.PUBLIC_URL + "/Img/gpt.png"}
        />
        <figure className={classes.gpt}>
          <div className={classes.gptText}>
            "Working with Olga was like having a coding wizard on the team! Her
            solutions were as elegant as a perfectly crafted algorithm, and her
            positive energy added a dash of magic to every project. Olga's
            dedication to excellence and knack for turning challenges into
            triumphs made our coding adventures truly unforgettable. If software
            development were a symphony, Olga would be the virtuoso composer
            orchestrating success with every line of code. Cheers to the tech
            maestro –{" "}
            <span className={classes.signature} onClick={windowScrollTop}>
              Olga
            </span>
            , where brilliance meets humor!" <strong>ChatGPT 3.5</strong>
          </div>
        </figure>
      </div>
      <div className={classes.loading}>
        Loading
        <span
          className={`${classes.loadingAnime} ${classes.dot} ${classes.dot1}`}
        >
          .
        </span>
        <span
          className={`${classes.loadingAnime} ${classes.dot} ${classes.dot2}`}
        >
          .
        </span>
        <span
          className={`${classes.loadingAnime} ${classes.dot} ${classes.dot3}`}
        >
          .
        </span>
      </div>
    </div>
  );
}
