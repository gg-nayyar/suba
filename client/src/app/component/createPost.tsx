"use client";
import axios from "axios";
import Image from "next/image";
import cookies from "js-cookie";
import React, { useEffect, useState, useRef } from "react";

const CreatePost = () => {
  const [content, setContent] = useState<string | null>("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  function handleSVGClick(e: React.MouseEvent<SVGSVGElement>) {
    if (fileInputRef.current) {
      fileInputRef.current!.click();
    }
  }
  function handleClick(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const selectedFile = target.files ? target.files[0] : null;
    setFile(selectedFile);
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("No File Selected");
      return;
    }
    if (!content) {
      alert("Need to put some content");
      return;
    }

    const formData = new FormData();
    if (content) {
      formData.append("content", content);
    }
    if (file) {
      formData.append("file", file);
    }
    const accessToken = cookies.get("accessToken");
    try {
      const response = await axios.post("http://localhost:8000/api/post", formData, {
        headers: {
          "accessToken": `${accessToken}`,
        },
      });
      console.log(accessToken)
      console.log("Post Created: ", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="flex">
        <div className="m-2 w-10 py-1">
          <Image
            className="inline-block h-10 w-10 rounded-full"
            height={30}
            width={20}
            src="/user.png"
            alt=""
          />
        </div>
        <div className="flex-1 px-2 pt-2 mt-2">
          <textarea
            className=" bg-transparent text-gray-400 font-medium text-lg w-full"
            placeholder="What's happening?"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <div className="flex">
        <div className="w-10"></div>

        <div className="w-64 px-2">
          <div className="flex items-center">
            <div className="flex-1 text-center px-1 py-1 m-2">
              <form
                encType="multipart/form-data"
                className="mt-1 group flex items-center text-purple-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-purple-800 hover:text-purple-300"
              >
                <label htmlFor="media"></label>
                <input
                  className="hidden"
                  ref={fileInputRef}
                  type="file"
                  id="media"
                  name="media"
                  accept="image/*,video/*"
                  onChange={handleClick}
                  required
                />
                <svg
                  onClick={handleSVGClick}
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </form>
            </div>

            {/* <div className="flex-1 text-center py-2 m-2">
                                <a href="#" className="mt-1 group flex items-center text-purple-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-purple-800 hover:text-purple-300">
                                    <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </a>
                            </div>

                            <div className="flex-1 text-center py-2 m-2">
                                <a href="#" className="mt-1 group flex items-center text-purple-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-purple-800 hover:text-purple-300">
                                    <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </a>
                            </div>

                            <div className="flex-1 text-center py-2 m-2">
                                <a href="#" className="mt-1 group flex items-center text-purple-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-purple-800 hover:text-purple-300">
                                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </a>
                            </div> */}
          </div>
        </div>

        <div className="flex-1">
          <button
            onClick={handleSubmit}
            className="bg-purple-400 mt-5 hover:bg-purple-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right"
          >
            Add Post
          </button>
        </div>
      </div>

      <hr className="border-purple-800 border-4" />
      <div></div>
    </div>
  );
};

export default CreatePost;
