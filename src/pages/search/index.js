import Icons from "@/components/atoms/Icons";
import Navbar from "@/components/organism/NavBar";
import Search from "@/components/organism/Search";
import { getTrendingItems } from "@/services/trendingItems";

import React from "react";
import { useSelector } from "react-redux";

const SearchPage = ({ data }) => {
  const { isMobileScreen } = useSelector((state) => state.screen);
  return (
    <div className="bg-black p-4 space-y-6 h-full min-h-screen">
      <Search trendingItems={data} />
      {isMobileScreen && <Navbar />}
    </div>
  );
};
export async function getServerSideProps() {
  const trendingItems = await getTrendingItems();
  return {
    props: {
      data: trendingItems || [],
    },
  };
}
export default SearchPage;
