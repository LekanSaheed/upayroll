import classes from "./Wrapper.module.css";
import Header from "./Header";
import Main from "./Main";
import Nav from "./Nav";

const Wrapper = ({ children }) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.mainFlex}>
        <Nav />
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export default Wrapper;
