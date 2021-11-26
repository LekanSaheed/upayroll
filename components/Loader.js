import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loaders}></div>
    </div>
  );
};

export default Loader;
