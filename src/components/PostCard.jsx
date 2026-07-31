import React, { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaPaperPlane,
  FaMapMarkerAlt,
} from "react-icons/fa";
import CommentSection from "./CommentSection";

function PostCard({ post, currentUserId, onToggleLike, onAddComment }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const liked = post.likedBy?.includes(currentUserId);
  const displayDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "";

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText("");
    }
  };

  const typeColors = {
    Lost: "bg-amber-900/30 text-amber-400 border-amber-700",
    Found: "bg-green-900/30 text-green-400 border-green-700",
  };

  return (
    <div className="bg-[rgb(var(--bg-card))] border border-[rgb(var(--border-color))] rounded-xl p-5 mb-5 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border ${
            typeColors[post.type] || "bg-gray-700 text-gray-300 border-gray-600"
          }`}
        >
          {post.type}
        </span>
        <span className="text-xs text-[rgb(var(--text-secondary))]">
          {displayDate} • by {post.author}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))] leading-tight">
        {post.title}
      </h3>

      <p className="text-sm text-[rgb(var(--text-secondary))] mt-2 leading-relaxed">
        {post.description}
      </p>

      {post.location && (
        <p className="text-xs text-[rgb(var(--text-secondary))] mt-2 flex items-center gap-1">
          <FaMapMarkerAlt className="text-amber-500 w-3 h-3" />
          {post.location}
        </p>
      )}

      <div className="flex items-center gap-6 mt-4 pt-3 border-t border-[rgb(var(--border-color))]">
        <button
          onClick={onToggleLike}
          className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
            liked
              ? "text-amber-400"
              : "text-[rgb(var(--text-secondary))] hover:text-amber-400"
          }`}
        >
          {liked ? (
            <FaHeart className="w-4 h-4" />
          ) : (
            <FaRegHeart className="w-4 h-4" />
          )}
          <span>{post.reactions}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-amber-400 transition-colors"
        >
          <FaComment className="w-4 h-4" />
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-[rgb(var(--border-color))]">
          <CommentSection comments={post.comments || []} />
          <form onSubmit={handleCommentSubmit} className="mt-3 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded-lg bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))] focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="px-4 py-2 text-sm font-medium bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <FaPaperPlane className="w-3 h-3" />
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostCard;
