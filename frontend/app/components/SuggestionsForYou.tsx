"use client";

import { User2Icon } from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  username: string;
}

const dummyUsers: User[] = [
  { id: "1", name: "John", username: "johncena" },
  { id: "2", name: "Sarah", username: "sarahw" },
  { id: "3", name: "Mike Chen", username: "mikec" },
];

export default function SuggestionsForYou() {
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const handleFollow = (userId: string) => {
    setFollowing((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  return (
    <div className="hidden lg:flex w-64 h-fit bg-card border border-border rounded-2xl p-4 shadow-2xs">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">Suggestions For You</span>
        </div>
        <div className="flex flex-col gap-4">
          {dummyUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold shrink-0">
                <User2Icon size={20} />
              </div>
              <div className="flex-1 flex flex-col justify-start items-start min-w-0">
                <div className="font-semibold text-sm truncate w-full">
                  {user.name}
                </div>
                <div className="text-xs text-muted-foreground truncate w-full">
                  @{user.username}
                </div>
              </div>
              <button
                onClick={() => handleFollow(user.id)}
                className={`text-xs font-bold h-7 px-3 rounded-full flex items-center hover:opacity-90 transition-colors duration-150 cursor-pointer shrink-0 ${
                  following.has(user.id)
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary text-secondary"
                }`}
              >
                {following.has(user.id) ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
