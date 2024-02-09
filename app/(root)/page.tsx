"use client";
import { useEffect, useState } from "react";
import Choice from "./_components/Choice";
import LatestProducts from "./_components/LatestProducts";
import AllProducts from "./_components/AllProducts";
import Loading from "@/components/shared/Loading";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="flex flex-col items-center md:mt-40 mt-28 container">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
        What are you looking for?
      </h1>
      <Choice />
      <LatestProducts />
      <AllProducts/>
    </section>
  );
};

export default Home;
