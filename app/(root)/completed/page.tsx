import { Button } from "@/components/ui/button"
import Link from "next/link"

const CompletedPage = () => {
  return (
    <section className="md:mt-40 mt-28 container overflow-x-hidden 
    flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-5xl">Transaction completed successfully!</h1>
      <Link href="/">
      <Button variant="main" size="lg">Go to home</Button>
      </Link>
    </section>
  )
}

export default CompletedPage