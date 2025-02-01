import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/molecule/card";
import axios from "axios";
import Sidebar from "@/components/organism/Sidebar";
import SidebarTrend from "@/components/organism/SidebarTrend";
import { useSelector } from "react-redux";
import NavBar from "@/components/organism/NavBar";

// Function to fetch the posts (same as before)
const fetchPosts = async (page, limit = 20) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
      params: {
        _page: page, // API pagination
        _limit: limit, // Number of posts per page
      },
    });
    return response.data; // API returns an array of posts
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

// SSR Function to fetch posts
export async function getServerSideProps(context) {
  console.log("server getting posts...");

  const posts = await fetchPosts(1); // Fetch initial page of posts
  return { props: { initialPosts: posts } };
}

export default function SocialFeed({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [users, setUsers] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  /**The Intersection Observer is a web API that allows you to asynchronously observe changes in
   * the intersection of an element with a parent element or with the viewport (the visible part of
   * the browser window).
   * In simpler terms, it lets you know when an element becomes visible
   * (or intersects) within a defined area, such as the browser's viewport.
   */
  const observer = useRef();
  const lastPostRef = useRef(null);
  const [visiblePosts, setVisiblePosts] = useState({});
  const { isMobileScreen } = useSelector((state) => state.screen);
  const checkUser = (userId) => {
    return users[userId] ? true : false;
  };
  const getUser = async (userId) => {
    if (!checkUser(userId)) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);

        setUsers((prevUsers) => ({
          ...prevUsers,
          [userId]: {
            ...response.data, // Spread the user data
            avatar: `https://picsum.photos/id/${userId}/100`, // Add the avatar property
          },
        }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };
  //useEffect to load posts more
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const newPosts = await fetchPosts(page);
      setPosts((prev) => [...prev, ...newPosts]);
      setLoading(false);
    };
    //triggered when observer increase the page
    if (page > 1) {
      loadPosts();
    }
  }, [page]);
  //observer to detect last post reference before modify page which trigger use effect to load post more
  useEffect(() => {
    //detect if lastPostRev is in the page to avoid error
    if (!lastPostRef.current) return;
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        //increase page value
        setPage((prev) => prev + 1);
      }
    });
    //observe the last post
    observer.current.observe(lastPostRef.current);
    return () => observer.current && observer.current.disconnect();
  }, [posts]);
  //useEffect for post visibility and opacity. when not in view opacity is 0, when it in view opacity 100
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
      { threshold: 0.1 } // how much of the observed element must be visible in the viewport, this one means 10%
    );

    posts.forEach((post) => {
      const cardElement = document.querySelector(`[data-id='${post.id}']`);
      if (cardElement) cardObserver.observe(cardElement);
    });

    return () => cardObserver.disconnect();
  }, [posts]);

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

      {/* Main Content (Posts) */}
      <div className="flex">
        <div className="h-screen overflow-y-auto">
          {/* Container to make only the posts scrollable */}
          {posts.forEach((post) => {
            checkUser(post.userId) || getUser(post.userId); // Fetch user data if it doesn't exist
          })}
          {posts.map((post, index) => (
            <Card
              key={post.id}
              ref={index === posts.length - 3 ? lastPostRef : null}
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
            </Card>
          ))}
          {loading && <p className="text-center">Loading...</p>}
        </div>
      </div>
      {/* trending */}
      {isMobileScreen ? (
        <NavBar />
      ) : (
        <div className="h-screen bg-gray-900 text-white p-4">
          <SidebarTrend />
        </div>
      )}
    </div>
  );
}
