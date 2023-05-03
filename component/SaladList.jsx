import React from "react";
import styles from "../styles/SaladList.module.css";
import SaladCard from "./Saladcard";

const SaladList = ({ saladList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BEST SALAD IN TOWN</h1>
      <p className={styles.desc}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur."
      </p>

      <div className={styles.wrapper}>
        {saladList &&
          saladList.map((salad) => <SaladCard key={salad._id} salad={salad} />)}
      </div>
    </div>
  );
};

export default SaladList;
