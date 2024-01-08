import classes from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={classes.footer}>
      <div>&copy; 2023 Krzykalski-kursy. Wszelkie prawa zastrzeżone.</div>
      <div className={classes.logos}>
        <div>Projekt i wykonanie:</div>
        <a href="https://www.linkedin.com/in/olga-kacala/" target="_blank" rel="noopener noreferrer">
          <img
            className={classes.Lin}
            title="My LinkedIn"
            alt="LinkedIn"
            src={process.env.PUBLIC_URL + "/Img/LI-logo.webp"}
          />
        </a>
      </div>
    </footer>
  );
}
