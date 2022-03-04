import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { HiHeart } from "react-icons/hi";
import { db } from "../config/firebase";
import { recordScan } from "../config/firebase/functions";
import Layout from "../layout";
import Map from "../components/Map";
import Table from "../components/Table";

export default function Home() {
  const router = useRouter();
  const { t } = router.query;
  const [coors, setCoors] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const getData = async () => {
    if (!localStorage.getItem("deviceId")) {
      localStorage.setItem(
        "deviceId",
        Math.random().toString(36).substr(2, 12)
      );
    }

    await navigator.geolocation.getCurrentPosition(function (position) {
      return setCoors({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  useEffect(() => {
    if (coors) {
      recordScan(
        coors?.latitude,
        coors?.longitude,
        t,
        localStorage.getItem("deviceId")
      );
      setCoors(null);
    }
  }, [coors]);

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
    if (t) {
      getData();
    }
  }, [t]);

  return (
    <>
      <Head>
        <title>Skull Tracker</title>
        <meta name="description" content="Welcome to Skull Nation" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/skulltracker.appspot.com/o/www.skulltracker.app_.png?alt=media&token=a0c84ca4-e4c6-426e-a1f1-5af09cd9b1cb"
        />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/skulltracker.appspot.com/o/www.skulltracker.app_.png?alt=media&token=a0c84ca4-e4c6-426e-a1f1-5af09cd9b1cb"
        />
      </Head>
      <Layout>
        <div className="bg-dark w-full flex flex-col justify-center">
          <div className="flex max-w-8xl flex-col py-16 px-4 w-full items-center">
            <h1 className="font-crush text-white text-[3em] md:text-[4.5em] text-center tracking-wide">
              Skull <span className="text-red-700">Tracker</span>
            </h1>
            <div className="w-full max-w-5xl my-2 px-3 sm:px-10 sm:mt-4 lg:mt-6 lg:mb-4 relative h-[400px] lg:h-[500px]">
              <Map />
            </div>
            <div className="flex justify-center max-w-lg w-full mt-2">
              <p className="text-slate-300 text-center font-mono text-sm lg:text-lg">
                Here is a live map of Skull Nation! Every time a Skull Tracker
                QR Code is scanned the location will be added to the map.
              </p>
            </div>
          </div>
          <div className="flex  w-full flex-col pt-4 pb-16 px-4 items-center max-w-xl lg:max-w-5xl self-center">
            <h1 className="font-crush text-white text-[3em] md:text-[4em] text-center tracking-wide">
              Top <span className="text-red-700">leaderboard</span>
            </h1>
            <div className="flex flex-col justify-center w-full space-y-5 px-3 mt-2 overflow-x-auto">
              <Table items={leaderboard} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-slate-400 text-[.9em] self-center mb-3">
            <p className="">Made with</p>
            <HiHeart className="mx-2" />
            <p>
              by{" "}
              <a
                href="https://twitter.com/zmeyer44"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 ml-1"
              >
                Zachm.eth
              </a>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
