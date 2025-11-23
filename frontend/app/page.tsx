"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "./components/Header";
import PostInput from "./components/PostInput";
import PostCard from "./components/PostCard";
import TrendingTopics from "./components/TrendingTopics";
import SuggestionsForYou from "./components/SuggestionsForYou";
import { Post } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function Home() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts`);
        setPosts(response.data.data);
      } catch (error) {
        toast.error(`Error fetching posts: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    };

    fetchPosts();
  }, []);

  const handlePost = async () => {
    const text = postText.trim();
    setPostText("");

    if (text === "") {
      toast.error("Post cannot be empty");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/posts`, {
        name: "Harshal Shinde",
        username: "huhharshal",
        body: text,
      });
      const newPost: Post = response.data.data;
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error("An error occurred while creating the post.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="bg-stone-50 p-10 flex gap-8 justify-center flex-1">
        <TrendingTopics />

        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
          <PostInput postText={postText} setPostText={setPostText} handlePost={handlePost} />

          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <SuggestionsForYou />
      </main>
    </div>
  );
}