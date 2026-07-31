import React, { useState } from "react";

function CommentSection({ comments }) {
  const [showAll, setShowAll] = useState(false);

  if (!comments || comments.length === 0) {
    return (
      <p className="text-sm text-[rgb(var(--text-secondary))]">
        No comments yet. Be the first to comment.
      </p>
    );
  }

  const visibleComments = showAll ? comments : comments.slice(0, 2);

  return (
    <div>
      {visibleComments.map((c, idx) => (
        <div key={c._id || idx} className="text-sm mb-2">
          <span className="font-semibold text-[rgb(var(--text-primary))]">
            {c.author}:{" "}
          </span>
          <span className="text-[rgb(var(--text-secondary))]">{c.text}</span>
        </div>
      ))}

      {comments.length > 2 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-[rgb(var(--accent))] text-sm hover:underline"
        >
          View all {comments.length} comments
        </button>
      )}
    </div>
  );
}

export default CommentSection;
