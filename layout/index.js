import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header />
      <main className="pt-[72px] flex grow flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
