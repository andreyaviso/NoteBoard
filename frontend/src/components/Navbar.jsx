import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'
import { TagsIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#818CF8] font-mono tracking-tight">
                    NoteBoard
                </h1>
                <div className="flex items-center gap-4">
                    <Link to={"/create"} className="btn bg-[#818CF8] text-gray-900 border-none hover:bg-[#6366F1]">
                        <PlusIcon className="size-5"/>
                        <span>New Note</span>
                    </Link>
                    
                    <Link to="/tags" className="btn btn-ghost">
                        <TagsIcon className="size-5" />
                        <span>Tags</span>
                    </Link>
                </div>
            </div>

        </div>
    </header>
  )
}

export default Navbar
