import Icons from "@/components/atoms/Icons";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around items-center space-x-4">
      <Link href="/" className="flex flex-col items-center text-lg hover:bg-gray-700 p-2 rounded-lg gap-2">
        <Icons.Feeds />
      </Link>
      <Link href="#" className="flex flex-col items-center text-lg hover:bg-gray-700 p-2 rounded-lg gap-2">
        <Icons.Notification />
      </Link>
      <Link href="/search" className="flex flex-col items-center text-lg hover:bg-gray-700 p-2 rounded-lg gap-2">
        <Icons.Search />
      </Link>
      <Link href="#" className="flex flex-col items-center text-lg hover:bg-gray-700 p-2 rounded-lg gap-2">
        <Icons.Friends />
      </Link>
      <Link href="#" className="flex flex-col items-center text-lg hover:bg-gray-700 p-2 rounded-lg gap-2">
        <Icons.Settings />
      </Link>
    </div>
  );
};

export default Navbar;
