import classes from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={classes.container}>
      <div className={classes.banner_container}>
        <div className={classes.banner_text}>
          <div className={classes.banner_title}>
            Welcome Back,<span style={{ color: "black" }}> Master.</span>
          </div>
          <div className={classes.text}>Humpty, Dumpty, Girl say what?</div>
        </div>
        <div className={classes.circleContainer}>
          <div className={classes.circle}></div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
