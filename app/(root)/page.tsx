"use client";
import { useEffect, useState } from "react";
import AllProducts from "./components/AllProducts";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
      </div>
    );
  }
  return (
    <section className="flex flex-col items-center mt-40 container">
      <h1 className="text-5xl font-semibold">What are you looking for?</h1>
      <AllProducts />
    </section>
  );
};

export default Home;
