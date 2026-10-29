import React, { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

const TagsPage = () => {

  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);


    useEffect(() => {
        const fetchTags = async () => {
        try {
            const res = await api.get("/tags");
            setTags(res.data);
        } catch (error) {
            console.error("Error fetching tags:", error);
            toast.error("Failed to load tags");
        } finally {
            setLoading(false);
        }
        };
    
        fetchTags();
    }, []);


    const handleCreateTag = async (e) => {
        e.preventDefault();
    
        if (!name.trim()) {
        toast.error("Please enter a tag name");
        return;
        }
    
        setCreating(true);
    
        try {
        const res = await api.post("/tags", {
            name: name.trim()
        });
    
        setTags((prev) =>
            [...prev, res.data].sort((a, b) =>
            a.name.localeCompare(b.name)
            )
        );
    
        setName("");
        toast.success("Tag created successfully");
    
        } catch (error) {
        console.error("Error creating tag:", error);
    
        if (error.response?.status === 409) {
            toast.error("Tag already exists");
        } else {
            toast.error("Failed to create tag");
        }
        } finally {
        setCreating(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <Link to="/" className="btn btn-ghost mb-6">
                    <ArrowLeftIcon className="size-5" />
                    Back to Notes
                </Link>
              <h1 className="text-2xl font-bold mb-6">
                My Tags
              </h1>
      
              <div className="card bg-base-100">
                <div className="card-body">
      
                  <h2 className="card-title mb-4">
                    Create New Tag
                  </h2>
      
                  <form onSubmit={handleCreateTag}>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Enter tag name"
                        className="input input-bordered flex-1 min-w-0"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
      
                      <button
                        type="submit"
                        className="btn bg-[#818CF8] text-gray-900 border-none hover:bg-[#6366F1]"
                        disabled={creating}
                      >
                        {creating ? "Creating..." : "Add Tag"}
                      </button>
                    </div>
                  </form>
      
                  <div className="divider my-6"></div>
      
                  <h2 className="card-title mb-4">
                    Existing Tags
                  </h2>
      
                  {loading ? (
                    <p>Loading tags...</p>
                  ) : tags.length === 0 ? (
                    <p className="text-base-content/60">
                      No tags created yet.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {tags.map((tag) => (
                        <span
                          key={tag._id}
                          className="badge badge-primary badge-lg"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
      
                </div>
              </div>
      
            </div>
          </div>
        </div>
      );
      
};

export default TagsPage;
