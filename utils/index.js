import { ethers } from "ethers";

export async function fetchEnsName(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const res = await provider.lookupAddress(address);
  if (res) {
    return res.charAt(0).toUpperCase() + res.slice(1);
  } else {
    return `${address?.slice(0, 4)}...${address?.slice(-4)}`;
  }
}
