import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@component/styles/Home.module.css";
import Featured from "@component/component/Featured";
import SaladList from "@component/component/SaladList";
import axios from "axios";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import AddButton from "@component/component/AddButton";
import Add from "@component/component/Add";

export default function Home({ saladList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Salad Store</title>
        <meta name="description" content="Best salad store in town" />
        <link rel="icon" type="image/x-icon" href="favicon.png" />
      </Head>
      <Featured />
      {<AddButton setClose={setClose} />}
      <SaladList saladList={saladList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

// we are gonna use this response as a prop
export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: { saladList: res.data, admin },
  };
};
