import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Head>
        <meta
          name="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/skulltracker.appspot.com/o/www.skulltracker.app_.png?alt=media&token=a0c84ca4-e4c6-426e-a1f1-5af09cd9b1cb"
        />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/skulltracker.appspot.com/o/www.skulltracker.app_.png?alt=media&token=a0c84ca4-e4c6-426e-a1f1-5af09cd9b1cb"
        />
      </Head>
      <Header />
      <main className="pt-[72px] flex grow flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
