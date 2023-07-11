"use client"; // This is a client component
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import { client } from "@/lib/contentful/client";
import ProductsCategoryPage from "./products/[category]/page";
import { useEffect, useState } from "react";

export default function Home() {
  const [heroCarouselList, setHeroCarouselList] = useState([]);

  const getCarousel = async () => {
    const response = await client.getEntries({ content_type: "heroBanner" });
    const responseData = response.items;
    setHeroCarouselList(responseData);
    console.log("heroBanner", responseData);
  };
  useEffect(() => {
    getCarousel();
  }, []);
  return (
    <div>
      <HeroCarousel contentData={heroCarouselList}></HeroCarousel>
      <ProductsCategoryPage></ProductsCategoryPage>
    </div>
  );
}
