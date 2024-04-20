import Navbar from "@/app/(root)/_components/Navbar"
import "@uploadthing/react/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify'
import Footer from "./_components/Footer";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className="flex h-screen flex-col">
      <ToastContainer position="top-left"/>
      <Navbar/>
      <main className="">{children}</main>
      <Footer/>
    </div>
  )
}