import { BsTwitter, BsInstagram } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";
import IconButton from "./IconButton";
const Footer = () => {
  return (
    <footer className="center bg-black border-t border-red-800 h-[100px] space-x-10 ">
      <IconButton
        icon={<BsTwitter />}
        href="https://twitter.com/Crypto_Skulls"
      />
      <IconButton icon={<SiDiscord />} href="https://discord.gg/cryptoskulls" />
      <IconButton
        icon={<BsInstagram />}
        href="https://www.instagram.com/cryptoskulls.nft/"
      />
    </footer>
  );
};

export default Footer;
