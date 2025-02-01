import { useState } from "react";
const SidebarTrend = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mockup data for trending items
  const trendingItems = [
    "React 18 Released",
    "JavaScript Tips",
    "Next.js vs Gatsby",
    "Web3 Development",
    "CSS Grid Layout",
    "AI in Web Development",
    "Frontend Frameworks",
    "Node.js Performance",
  ];

  // Filter trending items based on search input
  const filteredTrending = trendingItems.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-48 h-full bg-gray-900 text-white p-4 space-y-6">
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

export default SidebarTrend;
