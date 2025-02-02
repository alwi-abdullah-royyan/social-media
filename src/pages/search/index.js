import Icons from "@/components/atoms/Icons";
import Search from "@/components/organism/Search";
import { getTrendingItems } from "@/services/trendingItems";

import React from "react";

const SearchPage = ({ data }) => {
  return (
    <div className="bg-black p-4 space-y-6 h-full min-h-screen">
      <Search trendingItems={data} />
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
