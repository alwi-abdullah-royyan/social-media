import Icons from "@/components/atoms/Icons";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="w-40 h-full bg-gray-900 text-white  space-y-6">
      <div className="text-xl font-semibold">SocialMedia</div>
      <div className="space-y-4">
        <Link href="/" className="flex items-center text-lg hover:bg-gray-700 p-2 rounded-lg gap-2">
          <Icons.Feeds />
          Home
        </Link>
        <Link href="#" className="flex items-center text-lg hover:bg-gray-700 p-2 rounded-lg gap-2">
          <Icons.Notification />
          Notifications
        </Link>
        <Link href="#" className="flex items-center text-lg hover:bg-gray-700 p-2 rounded-lg gap-2">
          <Icons.Messages />
          Messages
        </Link>
        <Link href="#" className="flex items-center text-lg hover:bg-gray-700 p-2 rounded-lg gap-2">
          <Icons.Friends />
          Friends
        </Link>
        <Link href="#" className="flex items-center text-lg hover:bg-gray-700 p-2 rounded-lg gap-2">
          <Icons.Settings />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
