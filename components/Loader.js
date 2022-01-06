import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loader_container}>
        {" "}
        <div className={classes.loaders}></div>
        <div className={classes.loaders}></div>
        <div className={classes.loaders}></div>
      </div>
    </div>
  );
};

export default Loader;
