import { useState, useEffect } from "react";
import Head from "next/head";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { HiHeart } from "react-icons/hi";
import { db } from "../config/firebase";
import Layout from "../layout";
import Table from "../components/Table";
import Author from "../components/Author";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  const init = async () => {
    const q = query(
      collection(db, `tokens`),
      orderBy("allTime", "desc"),
      limit(15)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempLeaderboard = [];
      let rank = 1;
      querySnapshot.forEach((doc) => {
        let skull = doc.data();
        tempLeaderboard.push({ ...skull, rank });
        rank++;
      });
      setLeaderboard(tempLeaderboard);
    });
    return unsubscribe;
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Head>
        <title>Leaderboard | Skull Tracker</title>
        <meta name="description" content="Skull Tracker Leaderboard" />
      </Head>
      <Layout>
        <div className="bg-dark w-full flex flex-col justify-center grow">
          <div className="flex  w-full flex-col py-16 px-4 items-center max-w-xl lg:max-w-5xl self-center mb-auto">
            <h1 className="font-crush text-white text-[3em] md:text-[4.5em] text-center tracking-wide">
              Top <span className="text-red-700">leaderboard</span>
            </h1>
            <div className="flex flex-col justify-center w-full space-y-5 px-3 mt-4 overflow-x-auto">
              <Table items={leaderboard} />
            </div>
          </div>
          <Author />
        </div>
      </Layout>
    </>
  );
}
