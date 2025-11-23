import { TrendingUp } from "lucide-react";

const trendingTopics = [
  { topic: "#Technology", posts: "12.5K" },
  { topic: "#WebDevelopment", posts: "8.2K" },
  { topic: "#React", posts: "6.7K" },
  { topic: "#NextJS", posts: "5.1K" },
  { topic: "#TypeScript", posts: "4.3K" },
];

export default function TrendingTopics() {
  return (
    <div className="hidden sm:flex w-64 h-fit bg-card border border-border rounded-2xl p-4 shadow-2xs">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-2.5">
          <TrendingUp size={22} />
          <span className="text-lg font-bold">Trending Topics</span>
        </div>
        <div className="flex flex-col gap-3">
          {trendingTopics.map((item, index) => (
            <div key={index} className="flex flex-col gap-1 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="font-semibold text-sm">{item.topic}</div>
              <div className="text-xs text-muted-foreground">{item.posts} posts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

