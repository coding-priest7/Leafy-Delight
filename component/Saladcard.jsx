import React from "react";
import styles from "../styles/SaladCard.module.css";
import Image from "next/image";
import Link from "next/link";

const Saladcard = ({ salad }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${salad._id}`} passHref>
        <Image src={salad.img} alt="" width={600} height={400} />
      </Link>
      <h1 className={styles.title}>{salad.title}</h1>
      <span className={styles.price}> ${salad.prices[0]} </span>
      <p className={styles.desc}>{salad.desc}</p>
    </div>
  );
};

export default Saladcard;
