"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Post from "../component/post";
import Icons from "../component/icons";
import Newpost from "../component/createPost";
import React, { useEffect, useState } from "react";

const Page = () => {
  interface Post {
    _id: string;
    text: string;
    user: {
      username: string;
      firstName: string;
      lastName: string;
    };
    media: string[];
  }
  const [posts,setPosts] = useState<Post[]>([]);
  const fetchPosts = async()=>{
    const posts = await axios.get("http://localhost:8000/api/getPosts");
     setPosts(posts.data);
     console.log(posts.data)
  }
  useEffect(()=>{
    fetchPosts();
  },[]);
  return (
    <div className="flex flex-row fixed w-screen">
      <div className="w-1/5 h-screen ">
        <Icons />
      </div>
      <div className="m-5 w-2/4 h-screen overflow-y-scroll no-scrollbar">
        <Newpost />
        <div>
          {posts.length === 0 ? (
            <Image
            src="/nyan.gif"
            width={80}
            height={80}
            alt="Nyan Cat"
            unoptimized
          />
          ):(
            posts.map((post)=>{
              return <Post key={post._id} post ={post} />
            })
          )}
        </div>
      </div>
      <div className="w-2/6 h-screen cursor-pointer">
        <Link
          href="http://localhost:8000/auth/logout"
        >
          <button type="button">
          <svg
            className="ml-auto h-8 w-8 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
