import Icons from "@/components/atoms/Icons";
import { Card, CardContent } from "@/components/molecule/tmpCard";
import Navbar from "@/components/organism/NavBar";
import Sidebar from "@/components/organism/Sidebar";
import { getCommentById } from "@/services/comment";
import { getPostById } from "@/services/post";
import { getUserById } from "@/services/user";
import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const CommentSection = ({ post, comments }) => {
  const [users, setUsers] = useState({});
  const { isMobileScreen } = useSelector((state) => state.screen);
  const router = useRouter();
  // Use useCallback to memoize the fetchUser function
  const fetchUser = useCallback(async (userId) => {
    const userData = await getUserById(userId); // Call the async function
    setUsers((prev) => ({
      ...prev,
      ...userData, // Merge the fetched user data into state
    }));
  }, []); // Empty dependency array ensures the callback is memoized

  useEffect(() => {
    if (post?.userId && !users[post.userId]) {
      fetchUser(post.userId); // Fetch user data when post userId is available and not already in state
    }
  }, [post, users, fetchUser]); // Dependency array ensures the effect runs when post or users change

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        {isMobileScreen ? (
          ""
        ) : (
          <div className="h-screen bg-gray-900 text-white p-4">
            <Sidebar />
          </div>
        )}

        <div className="h-screen p-5 overflow-y-auto">
          <button onClick={router.back} className="flex gap-2">
            <Icons.Back />
            Back
          </button>
          <div className="flex justify-center items-center w-full ">
            <h1 className="text-3xl font-semibold text-center ">Post</h1>
          </div>
          <Card key={post.id} dataId={post.id}>
            <CardContent
              title={post.title}
              post={post.body}
              className="p-4"
              username={users[post.userId]?.name} // Access username from the fetched user data
              avatar={users[post.userId]?.avatar} // Access avatar from the fetched user data
            />
          </Card>

          <div className="flex justify-center items-center w-full p-3">
            <h2 className="text-2xl font-semibold text-center ">Comment</h2>
          </div>
          {comments.map((post, index) => (
            <Card key={`${post.id}-comment`} dataId={post.id}>
              <CardContent
                title={post.name}
                post={post.body}
                className="p-4"
                username={users[post.userId]?.name} // Access username from the fetched user data
                avatar={users[post.userId]?.avatar} // Access avatar from the fetched user data
              />
            </Card>
          ))}
        </div>
        {isMobileScreen && <Navbar />}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params; // Access slug from context.params

  try {
    const post = await getPostById(slug); // Use slug here
    if (!post) return { notFound: true };

    const comments = await getCommentById(slug); // Use slug here
    if (!comments) return { notFound: true };

    return {
      props: { post, comments },
    };
  } catch (err) {
    console.log(err);
    return { props: { error: "error" } };
  }
}

export default CommentSection;
