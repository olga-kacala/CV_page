import classes from "./Header.module.css";
import { useState } from "react";

interface CoverContainerState {
  translateX: number;
  opacity: number;
  coverClicked: boolean;
  transition: string;
}

export function Header() {
  const [coverContainerState, setCoverContainerState] =
    useState<CoverContainerState>({
      translateX: 0,
      opacity: 1,
      coverClicked: false,
      transition: "transform 1.1s ease, opacity 1.1s ease",
    });

  const handleCoverContainerClick = () => {
    setCoverContainerState((prevState) => ({
      ...prevState,
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
          transition: coverContainerState.transition,
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
          <div className={classes.contact}>
            Phone:
            <br /> +48 509 646 459
          </div>
          <div className={classes.contact}>
            Email:
            <br /> olga.kacala@gmail.com
          </div>
          <div className={classes.contact}>
            Location:
            <br /> Opole, Poland
          </div>
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

          <img
              className={classes.Logo}
              title="CV"
              alt="CV download"
              src={process.env.PUBLIC_URL + "/Img/download.png"}
            />

          
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
        With a diverse professional background, I offer a unique combination of technical expertise and managerial skills. Having pursued postgraduate studies in Computer Science at the University of Science and Technology in Krakow, I have specialized in the design, programming, and operation of systems
        </div>
      </div>
    </div>
  );
}
