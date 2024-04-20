'use client'
 
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from "next/link"

const CompletedPage = () => {
  const searchParams = useSearchParams()
  
  return (
    <section className="md:mt-40 mt-2 min-h-screen container overflow-x-hidden 
    flex flex-col items-center justify-center gap-y-8">
      
      <h1 className="text-5xl"> {!searchParams.get('canceled') ?"Transaction completed successfully!" : "Transaction declined!"}</h1>
      <Link href="/">
      <Button variant="main" size="lg">Go to home</Button>
      </Link>
    </section>
  )
}

export default CompletedPage