import React, { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { api } from "../api";

function FeedPage({ user, token, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newType, setNewType] = useState("Lost");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getPosts();
      setPosts(data);
    } catch (err) {
      setError("Could not load posts. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleLike = async (id) => {
    try {
      const updated = await api.toggleLike(token, id);
      setPosts((prev) => prev.map((p) => (p._id === id ? updated : p)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddComment = async (id, text) => {
    try {
      const updated = await api.addComment(token, id, text);
      setPosts((prev) => prev.map((p) => (p._id === id ? updated : p)));
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setNewTitle("");
    setNewDescription("");
    setNewLocation("");
    setNewType("Lost");
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    setSubmitting(true);
    try {
      const created = await api.createPost(token, {
        type: newType,
        title: newTitle,
        description: newDescription,
        location: newLocation || "Not specified",
      });
      setPosts([created, ...posts]);
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))]">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-2xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[rgb(var(--text-primary))]">
            Recent Posts
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-amber-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-amber-700"
          >
            <FaPlus className="w-3.5 h-3.5" />
            New Post
          </button>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        {loading && (
          <p className="text-sm text-[rgb(var(--text-secondary))] text-center py-6">
            Loading posts...
          </p>
        )}

        {!loading && posts.length === 0 && !error && (
          <p className="text-sm text-[rgb(var(--text-secondary))] text-center py-6">
            No posts yet. Be the first to post!
          </p>
        )}

        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            currentUserId={user?.id}
            onToggleLike={() => handleToggleLike(post._id)}
            onAddComment={(text) => handleAddComment(post._id, text)}
          />
        ))}
      </div>

      {/* New Post Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-20"
          onClick={closeModal}
        >
          <div
            className="bg-[rgb(var(--bg-card))] border border-[rgb(var(--border-color))] rounded-xl p-5 w-full max-w-md shadow-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">
                Create New Post
              </h3>
              <button
                onClick={closeModal}
                className="text-[rgb(var(--text-secondary))] hover:text-amber-400"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPost} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text-primary))] mb-1">
                  Type
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full border border-[rgb(var(--border-color))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text-primary))] mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-[rgb(var(--border-color))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g. Lost phone near canteen"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text-primary))] mb-1">
                  Description
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full border border-[rgb(var(--border-color))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows="3"
                  placeholder="Add some details..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text-primary))] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full border border-[rgb(var(--border-color))] rounded-lg px-3 py-2 text-sm bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g. Canteen, Room 105"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-1/2 border border-[rgb(var(--border-color))] text-[rgb(var(--text-primary))] py-2 rounded-lg font-medium text-sm hover:bg-[rgb(var(--bg-secondary))]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 bg-amber-600 text-white py-2 rounded-lg font-medium hover:bg-amber-700 text-sm disabled:opacity-60"
                >
                  {submitting ? "Posting..." : "Submit Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedPage;
