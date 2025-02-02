import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Sidebar from "@/components/organism/Sidebar";
import Icons from "@/components/atoms/Icons";
import Navbar from "@/components/organism/NavBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/molecule/card";
import Link from "next/link";
const Notification = () => {
  const [posts, setPosts] = useState([]);
  const limit = 10;
  const { isMobileScreen } = useSelector((state) => state.screen);
  const router = useRouter();
  // Fetch posts using axios
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: { _limit: limit },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [limit]);

  // Memoize the posts to avoid re-computation unless 'posts' changes
  const memoizedPosts = useMemo(() => {
    return posts;
  }, [posts]);

  return (
    <div className="flex bg-black">
      {/* Sidebar */}
      {isMobileScreen ? (
        ""
      ) : (
        <div className="h-screen bg-gray-900 text-white p-4">
          <Sidebar />
        </div>
      )}
      <div className="w-full bg-black min-h-screen flex flex-col  text-white ">
        <div className="w-full p-6 space-y-6">
          <button onClick={router.back} className="flex gap-2">
            <Icons.Back />
            Back
          </button>
          <div className="flex justify-center items-center w-full ">
            <h1 className="text-3xl font-semibold text-center ">Notification</h1>
          </div>

          {/* Username Section */}
          <ul>
            {memoizedPosts.map((post) => (
              <Card key={post.id} dataId={post.id}>
                <div>Someone post</div>
                <Link href={`/home/${post.id}`} className="hover:bg-gray-600">
                  <CardContent title={post.title} post={post.body} className="p-4" />
                </Link>
              </Card>
            ))}
          </ul>
          {isMobileScreen && <Navbar />}
        </div>
      </div>
    </div>
  );
};

export default Notification;
