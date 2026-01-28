"use client";
import { useState, useEffect } from "react";
import { TrendingPost } from "@/types/campaign";
import { getTrendingPosts } from "@/services/api";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

export default function TrendingPosts() {
  const [posts, setPosts] = useState<TrendingPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getTrendingPosts();
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="bg-secondary text-black rounded-lg shadow-lg p-6 mb-8">
        <div className="text-center">
          <div className="loader mx-auto mb-2" />
          <p className="text-center">Loading Trending Posts...</p>
        </div>
      </div>
    );
  }

  //   console.log(posts);
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-trinary">
      <h2 className="text-xl font-semibold text-gray mb-4">Trending Posts</h2>

      <div className="space-y-4">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="border-l-4 border-trinary border p-4 rounded hover:bg-secondary transition"
          >
            <h3 className="font-semibold text-black mb-2">{post.title}</h3>
            <p className="text-sm text-gray mb-2 line-clamp-2">{post.body}</p>
            <div className="flex justify-between items-center gap-2">
              <div>
                {post.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-gray px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-end items-center gap-4 text-xs text-gray">
                <span className="flex items-center gap-1 text-green">
                  <AiFillLike />
                  <span>{post.reactions.likes}</span>
                </span>

                <span className="flex items-center gap-1">
                  <AiFillDislike />
                  <span>{post.reactions.dislikes}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
