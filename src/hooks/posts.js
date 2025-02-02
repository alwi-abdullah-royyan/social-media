// services/useFetchPosts.js
import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, setLoading, setError, setHasMore, setRenderedPage } from "@/redux/postsSlice/postSlice";

const useFetchPosts = (limit = 20) => {
  const dispatch = useDispatch();
  const { posts, page, loading, error, hasMore, renderedPage } = useSelector((state) => state.posts);

  // Ref to prevent duplicate calls in a single render
  const fetchingRef = useRef(false);

  const fetchPosts = async (page) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
        params: { _page: page, _limit: limit },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      //preventing multiple api calls
      if (loading || fetchingRef.current || page <= renderedPage) return;

      fetchingRef.current = true; // Prevent re-triggering
      dispatch(setLoading(true)); //signal loading
      dispatch(setRenderedPage(page)); //check rendered page

      try {
        const newPosts = await fetchPosts(page);
        if (newPosts.length > 0) {
          dispatch(addPosts(newPosts));
        } else {
          dispatch(setHasMore(false));
        }
      } catch (err) {
        dispatch(setError("Failed to fetch posts"));
      } finally {
        dispatch(setLoading(false));
        fetchingRef.current = false; // Reset ref after fetch completes
      }
    };

    loadPosts();
  }, [page, dispatch, loading, renderedPage]);

  return { posts, loading, error, page, hasMore };
};

export default useFetchPosts;
