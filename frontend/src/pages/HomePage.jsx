import React from 'react'
import Navbar from "../components/Navbar"
import { useState, useEffect } from "react";
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios';
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';
//import Note from '../../../backend/src/model/Note';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const fetchNotes = async () =>{
      try {
        const res = await api.get("/notes")
        console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching notes")
        if(error.response?.status === 429){
          setIsRateLimited(true)
        }else{
          toast.error("Failed to load notes")
        }
      } finally{
        setLoading(false)
      }
    }
    fetchNotes();
  },[])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get("/tags");
        setTags(res.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
        toast.error("Failed to load tags");
      }
    };

    fetchTags();
  }, []);


  const filteredNotes = selectedTag
  ? notes.filter((note) => note.tag?._id === selectedTag)
  : notes;


  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto px-4 py-3 mt-2">
        <div className="flex justify-end mb-6">
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">All Notes</option>

            {tags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        
        {!loading && !isRateLimited && (
          <>
            {notes.length === 0 && <NotesNotFound />}

            {notes.length > 0 && filteredNotes.length === 0 && (
              <p className="text-center text-base-content/60 py-10">
                No notes found for this tag.
              </p>
            )}
          </>
        )}

        {filteredNotes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              setNotes={setNotes}
            />
          ))}
        </div>
      )}


      </div>
    </div>
  )
}

export default HomePage
