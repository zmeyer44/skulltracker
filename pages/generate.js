import { useState } from "react";
import Head from "next/head";
import Layout from "../layout";
import LargeInfoBox from "../components/LargeInfoBox";
import QRCode from "react-qr-code";
import { HiHeart } from "react-icons/hi";
import { newToken } from "../config/firebase/functions";

export default function Generate() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = () => {
    if (!input) {
      return setError("*** Please enter a Token ID ***");
    }
    if (input < 0 || input > 9999) {
      return setError("*** Please enter a Valid Token ID ***");
    }
    const options = { method: "GET" };
    fetch(
      `https://api.opensea.io/api/v1/asset/0xc1Caf0C19A8AC28c41Fe59bA6c754e4b9bd54dE9/${input}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setData({
          name: response.name,
          num_sales: response.num_sales,
          image: response.image_url,
          owner: response.owner.address,
          ui: response.traits[0].value,
        });
        setError(null);
        setShowQRCode(true);
        newToken(
          response.token_id,
          response.owner.address,
          response.permalink,
          response.name,
          response.image_url
        );
      })
      .catch((err) => console.error(err));
  };

  const onImageCownload = () => {
    const svg = document.getElementById("SkullTrackerQRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "SkullTrackerQRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <>
      <Head>
        <title>Skull Tracker | Generate</title>
        <meta name="description" content="Skull Tracker QR Code generater" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="bg-dark w-full flex flex-col justify-center grow">
          <div className="flex  w-full flex-col pt-16 pb-4 px-4 items-center max-w-xl lg:max-w-5xl self-center mb-auto">
            <h1 className="font-crush text-white text-[3em] md:text-[4.5em] text-center tracking-wide mb-10">
              Generate <span className="text-red-700">QR Code</span>
            </h1>

            {showQRCode ? (
              <div className="flex flex-col items-center">
                <div className="flex flex-col-reverse lg:flex-row justify-center lg:justify-around items-center w-full mt-4">
                  <LargeInfoBox {...data} download={onImageCownload} />
                  <QRCode
                    id="SkullTrackerQRCode"
                    value={`https://skullnation.app?t=${input}`}
                  />
                </div>
                <p
                  className="text-red-700 underline font-mono cursor-pointer lg:mt-4"
                  onClick={() => {
                    setInput("");
                    setShowQRCode(false);
                  }}
                >
                  reset
                </p>
                <p className="text-slate-400 font-mono text-center mt-2 text-[.9em]">
                  We recommend marking the QR Code at least a half an inch in
                  width to ensure easy scanning
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center w-full mt-4 space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
                <input
                  className={`appearance-none block  bg-slate-600 text-gray-700 font-mono border border-slate-400 ${
                    error && "border-red-500"
                  }  py-3 px-4  leading-tight focus:outline-none focus:bg-slate-400 text-3xl flex-grow-3`}
                  type="num"
                  name="input"
                  value={input}
                  onChange={(text) => setInput(text.target.value)}
                  placeholder="Token ID..."
                />
                <div
                  className="center bg-slate-600 text-gray-700 border border-slate-400 mt-0 px-5 cursor-pointer grow"
                  onClick={handleSearch}
                >
                  <h3 className="text-slate-400 font-pixel uppercase text-2xl">
                    Generate
                  </h3>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center mt-4 text-slate-400 text-[.9em] self-center mb-3">
            <p className="">Made with</p>
            <HiHeart className="mx-2" />
            <p>
              by{" "}
              <a
                href="https://twitter.com/zmeyer44"
                target="_blank"
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
