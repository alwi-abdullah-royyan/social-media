import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/molecule/card";
import axios from "axios";
import Sidebar from "@/components/organism/Sidebar";
import SidebarTrend from "@/components/organism/SidebarTrend";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "@/components/organism/NavBar";
import useFetchPosts from "@/hooks/posts";
import { setPage } from "@/redux/postsSlice/postSlice";
import { checkUser } from "@/helpers/util";
import { useRouter } from "next/router";
import Link from "next/link";
import { getUserById } from "@/services/user";

export default function SocialFeed() {
  const [users, setUsers] = useState({}); // Store user data
  const { renderedPage, page } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const router = useRouter();
  const [curPage, setCurPage] = useState(renderedPage === 0 ? page : renderedPage);
  dispatch(setPage(curPage)); // Update page in Redux

  const { posts, loading, error } = useFetchPosts(20); // Fetch posts

  /**
   * The Intersection Observer API allows us to track visibility of elements
   * when they come into or go out of view in the viewport.
   */
  const observer = useRef();
  const lastPostRef = useRef(null); // Reference to last post for infinite scroll
  const [visiblePosts, setVisiblePosts] = useState({}); // Store visibility of posts
  const { isMobileScreen } = useSelector((state) => state.screen);

  // Observer to detect when the last post is in view, trigger next page load
  useEffect(() => {
    if (!lastPostRef.current) return;

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCurPage((prev) => prev + 1); // Increment page when last post is in view
      }
    });
    observer.current.observe(lastPostRef.current);

    return () => observer.current && observer.current.disconnect();
  }, [posts]);

  // Track visibility of posts to apply opacity when in view
  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        setVisiblePosts((prev) => {
          const updatedVisibility = { ...prev };
          entries.forEach((entry) => {
            updatedVisibility[entry.target.dataset.id] = entry.isIntersecting;
          });
          return updatedVisibility;
        });
      },
      { threshold: 0.1 }
    ); // Trigger when 10% of the card is visible

    posts.forEach((post) => {
      const cardElement = document.querySelector(`[data-id='${post.id}']`);
      if (cardElement) cardObserver.observe(cardElement);
    });

    return () => cardObserver.disconnect();
  }, [posts]);

  // Fetch user data for posts that don’t have it
  useEffect(() => {
    const getUser = () => {
      posts.forEach((post) => {
        if (!checkUser(users, post.userId)) {
          getUserById(post.userId).then((userData) => {
            setUsers((prevUsers) => ({
              ...prevUsers,
              ...userData, // Merge the fetched user data into state
            }));
          });
        }
      });
    };
    getUser();
  }, [posts, users]);

  return (
    <div className="flex">
      {/* Sidebar - Only show on desktop */}
      {!isMobileScreen && (
        <div className="h-screen bg-gray-900 text-white p-4">
          <Sidebar />
        </div>
      )}

      {/* Main Content (Posts) */}
      <div className="flex">
        <div className="h-screen overflow-y-auto">
          {posts.map((post, index) => (
            <Card
              key={post.id}
              ref={index === posts.length - 3 ? lastPostRef : null} // Set last post ref for infinite scroll
              dataId={post.id}
              className={`${visiblePosts[post.id] ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
            >
              <CardContent
                title={post.title}
                post={post.body}
                className="p-4"
                username={users[post.userId]?.name}
                avatar={users[post.userId]?.avatar}
              />
              <div className="w-full items-center text-center justify-center">
                <Link href={`/home/${post.id}`} className="px-5 py-1 border hover:bg-gray-600 rounded-sm block">
                  Comment
                </Link>
              </div>
            </Card>
          ))}
          {loading && <p className="text-center">Loading...</p>}
        </div>
      </div>

      {/* Trending Sidebar - Only show on desktop */}
      {!isMobileScreen ? (
        <div className="h-screen bg-gray-900 text-white p-4">
          <SidebarTrend />
        </div>
      ) : (
        <NavBar /> // On mobile, show the Navbar
      )}
    </div>
  );
}
