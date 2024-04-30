import Navbar from "@/app/(root)/_components/Navbar";
import "@uploadthing/react/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "./_components/Footer";
import { ShoppingCartWrapper } from "@/context/shoppingCart";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ShoppingCartWrapper>
        <ToastContainer position="top-left" />
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </ShoppingCartWrapper>
    </>
  );
}
