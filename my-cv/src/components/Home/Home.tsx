import { Link } from 'react-scroll';
import classes from "./Home.module.css";
import { motion } from 'framer-motion';


export function Home () {
return (

<motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -100 }} transition={{ duration: 1 }}>
<Link to="education" smooth={true} duration={500}>Education</Link>
</motion.div>
)


}

