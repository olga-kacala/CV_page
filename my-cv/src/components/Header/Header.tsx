import classes from "./Header.module.css";

export function Header() {
 
  return (
 <div className={classes.header}>
  <img
          className={classes.profileImg}
            title="My picture"
            alt="Profile picture"
            src={process.env.PUBLIC_URL + "/Img/profilowe.jpeg"}
          />
 <div className={classes.name}>Olga Kacala</div>
 <h1 className={classes.text}>Hi</h1>
 <div className={classes.name}>As a seasoned professional with a multifaceted background, I bring a unique blend of technical expertise and managerial skills. Holding Engineer's degree in Computer Science from the University of Science and Technology in Kraków, I have specialized in the design, programming, and operation of systems.</div>
 </div>
  )
}
