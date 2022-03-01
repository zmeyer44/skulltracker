import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchEnsName } from "../utils";

const ListItem = ({ rank, image, name, owner, allTime }) => {
  const [ownerAddress, setOwnerAddress] = useState(
    `${owner?.slice(0, 4)}...${owner?.slice(-4)}`
  );
  const init = async () => {
    const res = await fetchEnsName(owner);
    setOwnerAddress(res);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="flex hover:shadow-lg text-white items-center">
      <h3 className="font-bold flex mx-4 pr-6">{rank}</h3>
      <div className="flex flex-grow items-center space-x-3 py-4">
        <Image src={image} width={50} height={50} className="rounded-lg" />
        <h3>{name}</h3>
      </div>
      <div className="flex flex-grow-2">
        <a
          href={`https://opensea.io/${owner}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600"
        >
          {ownerAddress}
        </a>
      </div>
      <div className="flex mr-3">
        <h3>{allTime}</h3>
      </div>
    </div>
  );
};

const Table = ({ items }) => {
  return (
    <div className="flex flex-col divide-y divide-slate-400">
      <div className="flex text-white py-2 text-md">
        <div className="flex flex-grow-3 pl-[4em]">
          <h3>Item</h3>
        </div>
        <div className="flex flex-grow-2 lg:flex-grow-3">Owner</div>
        <div className="flex mr-3">Clicks</div>
      </div>
      {items?.map((item, index) => (
        <ListItem {...item} rank={index + 1} key={index} />
      ))}
    </div>
  );
};

export default Table;
