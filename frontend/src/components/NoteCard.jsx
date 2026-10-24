import React from 'react'
import { Link } from 'react-router'           
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({note, setNotes}) => {

    const handleDelete = async (e, id) => {
        e.preventDefault(); 

        if(!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter(note => note._id !== id)) 
            toast.success("Note deleted successfully")
        } catch (error) {
            console.log("Error in handleDelete", error)
            toast.error("Failed to delete note")
        }
    }

    return (
       <Link to={`/note/${note._id}`}
          className="card bg-base-300 border border-gray-600
            hover:border-[#818CF8]
            hover:shadow-lg
            transition-all duration-200
            border-t-4 border-t-[#818CF8]"
      >
          <div className="card-body">
              <h3 className="card-title text-base-content">{note.title}</h3>
                {note.tag && (
                <span className="badge badge-primary badge-sm w-fit">
                    {note.tag}
                </span>
                )}
              <p className="text-base-content/70 line-clamp-3">{note.content}</p>
              <div className="card-actions justify-between items-center mt-4">
                  <span className="text-sm text-base-content/60">
                      {formatDate(new Date(note.createdAt))}
                  </span>
  
                  <div className="flex items-centergap-1">
                      <PenSquareIcon className="size-4 text-[#818CF8]"/>
                      <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e,note._id)}>
                          <Trash2Icon className="size-4"/>
                      </button>
                  </div>
              </div>
          </div>
  
       </Link>
    )
  }

export default NoteCard
