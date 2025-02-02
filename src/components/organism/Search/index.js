import Icons from "@/components/atoms/Icons";
import { useMemo, useState } from "react";
import Router, { useRouter } from "next/router";
const Search = ({ trendingItems }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  // Filter trending items based on search input

  const filteredTrending = useMemo(() => {
    return trendingItems.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [trendingItems, searchTerm]);

  return (
    <div className="w-full h-full text-white p-4 space-y-6">
      <button onClick={router.back} className="flex gap-2">
        <Icons.Back />
        Back
      </button>
      {/* Search Bar */}
      <div className="flex items-center bg-gray-800 p-2 rounded-md">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="text-xl font-semibold">Trending</div>

      <div className="space-y-2">
        {/* Trending List */}
        {filteredTrending.length > 0 ? (
          filteredTrending.map((item, index) => (
            <div key={index} className="p-1 hover:bg-gray-700 rounded-md">
              {item}
            </div>
          ))
        ) : (
          <div className="text-gray-400">No trending items found</div>
        )}
      </div>
    </div>
  );
};

export default Search;
