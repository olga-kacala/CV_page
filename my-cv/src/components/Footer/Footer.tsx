import classes from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={classes.footer}>
      <div>
        <div>My pages:</div>
        <a href="https://www.linkedin.com/in/olga-kacala/" target="_blank" rel="noopener noreferrer">
          <img
            className={classes.Lin}
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
          className={classes.Lin}
            title="My GH"
            alt="GitHub"
            src={process.env.PUBLIC_URL + "/Img/github-logo.webp"}
          />
        </a>
      </div>
    </footer>
  );
}