import React, { useState } from "react";
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "@component/redux/cartSlice";

const Product = ({ salad }) => {
  const [price, setPrice] = useState(salad.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  // const salad = {
  //   id: 1,
  //   img: "/img/salad_mixed_I.png",
  //   name: "CILANTRO",
  //   price: [19.9, 23.9, 27.9],
  //   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
  // };

  const handleSize = (sizeIndex) => {
    const difference = salad.prices[sizeIndex] - salad.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...salad, extras, price, quantity }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={salad.img} fill style={{ objectFit: "contain" }} alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{salad.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{salad.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>

        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/salad_bowl_size.png" alt="" fill />
            <span className={styles.number}>Small</span>
          </div>

          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/salad_bowl_size.png" alt="" fill />
            <span className={styles.number}>Medium</span>
          </div>

          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/salad_bowl_size.png" alt="" fill />
            <span className={styles.number}>Large</span>
          </div>
        </div>

        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {salad.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            defaultValue={1}
            min={1}
            className={styles.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// we are gonna use this response as a prop
export const getServerSideProps = async (context) => {
  const { id } = context.query;
  // console.log("ID", id);

  const res = await axios.get(`http://localhost:3000/api/products/${id}`);
  // console.log(res.data);
  return {
    props: { salad: res.data },
  };
};

export default Product;
