"use client";

import { Bookmark, Heart, MessageCircle, Share2, User2Icon } from "lucide-react";
import { useState } from "react";
import { Post } from "../types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(parseInt(post.likes) || 0);

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl p-4 gap-3 rounded-2xl bg-card border border-border flex-wrap shadow-2xs">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary text-secondary flex items-center justify-center text-xl font-semibold">
          <User2Icon size={24} />
        </div>
        <div className="flex-1 flex flex-col justify-start items-start">
          <div className="font-semibold">{post.name}</div>
          <div className="text-sm text-muted-foreground">@{post.username}</div>
        </div>
      </div>
      <div className="flex flex-wrap pl-16">
        <div>{post.body}</div>
      </div>
      <div className="flex items-center justify-between text-muted-foreground text-sm pl-16 mt-1">
        <button onClick={handleLike} className="flex items-center gap-1.5 cursor-pointer">
          <div className="w-4 h-4 flex items-center justify-center shrink-0 overflow-hidden" style={{ minWidth: '16px', minHeight: '16px' }}>
            <Heart 
              className={liked ? "fill-red-500 text-red-500" : ""} 
              size={16} 
              strokeWidth={2}
              style={{ width: '16px', height: '16px', flexShrink: 0 }}
            />
          </div>
          <span className="tabular-nums">{likeCount}</span>
        </button>
        <button className="flex items-center gap-1.5 cursor-pointer">
          <div className="w-4 h-4 flex items-center justify-center shrink-0" style={{ minWidth: '16px', minHeight: '16px' }}>
            <MessageCircle size={16} strokeWidth={2} style={{ width: '16px', height: '16px', flexShrink: 0 }} />
          </div>
          <span className="tabular-nums">{post.comments}</span>
        </button>
        <button className="flex items-center gap-1.5 cursor-pointer">
          <div className="w-4 h-4 flex items-center justify-center shrink-0" style={{ minWidth: '16px', minHeight: '16px' }}>
            <Share2 size={16} strokeWidth={2} style={{ width: '16px', height: '16px', flexShrink: 0 }} />
          </div>
          <span className="tabular-nums">{post.shares}</span>
        </button>
        <button className="flex items-center gap-1.5 cursor-pointer">
          <div className="w-4 h-4 flex items-center justify-center shrink-0" style={{ minWidth: '16px', minHeight: '16px' }}>
            <Bookmark size={16} strokeWidth={2} style={{ width: '16px', height: '16px', flexShrink: 0 }} />
          </div>
        </button>
      </div>
    </div>
  );
}

