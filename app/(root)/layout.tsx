import Navbar from "@/components/shared/Navbar"
import "@uploadthing/react/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify'
import { auth } from "@clerk/nextjs";
import { getCart } from "@/lib/db/cart";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className="flex h-screen flex-col">
      <ToastContainer position="top-left"/>
      <Navbar/>
      <main className="flex-1">{children}</main>
    </div>
  )
}