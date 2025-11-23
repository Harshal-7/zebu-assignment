import { Send, User2Icon } from "lucide-react";

interface PostInputProps {
  postText: string;
  setPostText: (text: string) => void;
  handlePost: () => void;
}

export default function PostInput({ postText, setPostText, handlePost }: PostInputProps) {
  return (
    <div className="flex flex-col w-full max-w-2xl p-4 gap-4 rounded-2xl bg-card border border-border shadow-2xs">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary text-secondary flex items-center justify-center text-xl font-semibold">
          <User2Icon size={24} />
        </div>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          className="rounded-2xl bg-input/50 flex-1 h-28 px-3 py-1.5 resize-none border border-border focus:outline-none focus:ring-0 focus:border-border"
        />
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={handlePost}
          className="bg-primary text-secondary font-bold h-9 px-4 rounded-2xl flex gap-2 items-center hover:bg-primary/95 transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
          disabled={postText.trim().length === 0}
        >
          <Send size={16} />
          <span>Post</span>
        </button>
      </div>
    </div>
  );
}

