import classes from "./Header.module.css";
import { useState } from "react";

export function Header() {
  const [coverContainerState, setCoverContainerState] = useState({
    translateX: 0,
    opacity: 1,
    coverClicked: false,
  });

  const handleCoverContainerClick = () => {
    setCoverContainerState((prevState) => ({
      translateX: prevState.coverClicked ? 0 : 55,
      opacity: prevState.coverClicked ? 1 : 0.09,
      coverClicked: !prevState.coverClicked,
    }));
  };
  return (
    <div className={classes.header} onClick={handleCoverContainerClick}>
      <div
        className={classes.sliderContainer}
        style={{
          transform: `translateX(${coverContainerState.translateX}vw)`,
          opacity: coverContainerState.opacity,
          width: coverContainerState.coverClicked ? "0vw" : "40vw",
        }}
      >
        <img
          className={classes.profileImg}
          title="My picture"
          alt="Profile picture"
          src={process.env.PUBLIC_URL + "/Img/profiloweGRAY.jpg"}
        />
        <div className={classes.contactContainer}>
          <h1>Olga Kacala</h1>
          <div className={classes.contact}>Phone: +48 509 646 459</div>
          <div className={classes.contact}>Email: olga.kacala@gmail.com</div>
          <div className={classes.contact}>Location: Opole, Poland</div>
          <a
            href="https://www.linkedin.com/in/olga-kacala/?locale=en_US"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={classes.Logo}
              title="My LinkedIn"
              alt="LinkedIn"
              src={process.env.PUBLIC_URL + "/Img/LI-logo.webp"}
            />
          </a>

          <a
            href="https://github.com/olga-kacala"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={classes.Logo}
              title="My GH"
              alt="GitHub"
              src={process.env.PUBLIC_URL + "/Img/github-logo.webp"}
            />
          </a>
        </div>

        <div className={classes.coverContainer}></div>
      </div>
      <div
        className={classes.profileTextContainer}
        style={{
          width: coverContainerState.coverClicked ? "100vw" : "60vw",
          display: coverContainerState.coverClicked ? "flex" : "block",
          lineHeight: coverContainerState.coverClicked ? "2.5" : "1.0",
          alignItems: coverContainerState.coverClicked ? "center" : "center",
        }}
      >
        <h1>Hi</h1>
        <div className={classes.profile}>
          As a seasoned professional with a multifaceted background, I bring a
          unique blend of technical expertise and managerial skills. Holding
          Engineer's degree in Computer Science from the University of Science
          and Technology in Kraków, I have specialized in the design,
          programming, and operation of systems.
        </div>
      </div>
    </div>
  );
}
