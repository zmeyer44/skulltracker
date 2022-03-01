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
    <tr className="text-slate-200">
      <td className="flex items-center hover:shadow-lg ">
        <h3 className="font-bold flex mx-4 pr-6">{rank}</h3>
        <div className="flex flex-grow items-center space-x-3 py-4">
          <Image src={image} width={50} height={50} className="rounded-lg" />
          <h3>{name}</h3>
        </div>
      </td>
      <td>
        <a
          href={`https://opensea.io/${owner}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600"
        >
          {ownerAddress}
        </a>
      </td>
      <td>{allTime}</td>
    </tr>
  );
};

const Table = ({ items }) => {
  return (
    <table class="table-fixed md:table-auto text-slate-200">
      <thead>
        <tr>
          <th className="flex">Item</th>
          <th>Owner</th>
          <th className="flex">Clicks</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item, index) => (
          <ListItem {...item} rank={index + 1} key={index} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
