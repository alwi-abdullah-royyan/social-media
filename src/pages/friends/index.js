import Icons from "@/components/atoms/Icons";
import React from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/organism/Sidebar";
import { useSelector } from "react-redux";
import Navbar from "@/components/organism/NavBar";
import { getUsers } from "@/services/user";
import Image from "next/image";
const Friends = ({ users }) => {
  const router = useRouter();

  const { isMobileScreen } = useSelector((state) => state.screen);
  return (
    <div className="flex">
      {/* Sidebar */}
      {isMobileScreen ? (
        ""
      ) : (
        <div className="h-screen bg-gray-900 text-white p-4">
          <Sidebar />
        </div>
      )}
      <div className="w-full bg-black min-h-screen flex flex-col text-white ">
        <div className="w-full p-6 space-y-6 overflow-y-auto">
          <button onClick={router.back} className="flex gap-2">
            <Icons.Back />
            Back
          </button>
          <div className="flex justify-center items-center w-full">
            <h1 className="text-3xl font-semibold text-center">Friends</h1>
          </div>

          {/* Username Section */}
          <div className="flex-1 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(users).map((user) => (
                <div
                  key={user.id}
                  className="bg-black border-white p-4 border rounded-lg shadow-md flex flex-col items-center"
                >
                  <Image
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    width={100}
                    height={100}
                    className="rounded-full w-24 h-24 mb-4"
                  />
                  <h2 className="text-lg font-medium">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.username}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              ))}
            </div>
          </div>

          {isMobileScreen && <Navbar />}
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  try {
    // Fetch the user data
    const users = await getUsers();
    return {
      props: {
        users,
      },
    };
  } catch (err) {
    console.error("Error fetching users:", err);

    return {
      props: {
        users: {},
      },
    };
  }
}

export default Friends;
