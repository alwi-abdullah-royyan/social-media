import Icons from "@/components/atoms/Icons";
import React from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/organism/Sidebar";
import { useSelector } from "react-redux";
import Navbar from "@/components/organism/NavBar";

const Settings = () => {
  const router = useRouter();
  const { isMobileScreen } = useSelector((state) => state.screen);

  return (
    <div className="flex">
      {/* Sidebar */}
      {isMobileScreen ? (
        ""
      ) : (
        <div className="h-screen bg-gray-900 text-white p-4 w-72">
          <Sidebar />
        </div>
      )}

      <div className="w-full bg-black min-h-screen flex flex-col text-white p-6">
        <button onClick={router.back} className="flex gap-2 text-white mb-6">
          <Icons.Back />
          Back
        </button>

        <div className="flex justify-center items-center w-full mb-6">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>

        {/* Settings Form */}
        <div className="w-full max-w-2xl mx-auto space-y-6">
          {/* Username Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <label htmlFor="username" className="text-lg">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-72 p-2 bg-gray-800 text-white rounded-lg"
                defaultValue="User123"
              />
            </div>
            {/* Email Section */}
            <div className="flex justify-between items-center">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-72 p-2 bg-gray-800 text-white rounded-lg"
                defaultValue="user123@example.com"
              />
            </div>
            {/* Password Section */}
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-72 p-2 bg-gray-800 text-white rounded-lg"
                defaultValue="********"
              />
            </div>
            {/* Save Changes Button */}
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700 transition duration-200">
              Save Changes
            </button>
          </div>
        </div>

        {/* Navbar for mobile screens */}
        {isMobileScreen && <Navbar />}
      </div>
    </div>
  );
};

export default Settings;
