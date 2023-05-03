import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/Featured.module.css";

const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/img/salad_mixed_I.png",
    "/img/salad_pork.jpg",
    "/img/salad_strawberry.jpg",
  ];

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index != 0 ? index - 1 : 2);
    }
    if (direction === "r") {
      setIndex(index != 2 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}
      >
        <Image
          src="/img/left-arrow-blue.svg"
          alt=""
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" fill style={{ objectFit: "contain" }} />
          </div>
        ))}
      </div>

      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        <Image
          src="/img/right-arrow-blue.svg"
          alt=""
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default Featured;
