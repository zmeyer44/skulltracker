import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button";
import { fetchEnsName } from "../utils";

const Item = ({ title, value }) => {
  return (
    <div className="flex py-2 justify-between">
      <h3>{title}</h3>
      <h3 className="">{value}</h3>
    </div>
  );
};

const InfoBox = ({ image, name, owner, last7, allTime, rank, openseaUrl }) => {
  const [ownerAddress, setOwnerAddress] = useState(
    `${owner?.slice(0, 3)}...${owner?.slice(-3)}`
  );
  const init = async () => {
    const res = await fetchEnsName(owner);
    setOwnerAddress(res);
  };
  useEffect(() => {
    init();
  }, [name]);
  return (
    <div
      className={`absolute top-10 right-0 flex flex-col bg-white w-[300px] h-auto m-4 rounded-lg border-red-600 border-2 divide-y divide-slate-400 drop-shadow-lg`}
    >
      <div className="flex items-center justify-between space-x-3 ">
        <Image src={image} height={120} width={120} className="rounded-lg" />
        <div className="flex flex-col grow space-y-1 max-w-[170px]">
          <h3 className="font-semibold">{name}</h3>
          <p className="font-mono text-[.8em] text-slate-400 overflow-hidden line-clamp-1 break-all">{`Owned by  ${ownerAddress}`}</p>
        </div>
      </div>
      <div className="flex flex-col py-2 px-3 divide-y divide-slate-200 ">
        <Item title="Last 7 days" value={`${last7} scans`} />
        <Item title="All time" value={`${allTime} scans`} />
        <Item title="Leaderboard Rank" value={`#${rank}`} />
      </div>
      <div className="flex justify-around items-center py-4">
        <Button small label="View on opensea" type="anchor" href={openseaUrl} />
      </div>
    </div>
  );
};

export default InfoBox;
