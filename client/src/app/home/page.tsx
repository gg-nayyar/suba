"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Post from "../component/post";
import Icons from "../component/icons";
import Newpost from "../component/createPost";
// import {Matemasie} from 'next/font/google';

// const matemasie  = Matemasie({
//   subsets: ['latin'],
//   weight: '400'
// })

const page = () => {
  return (
    <div className="flex flex-row">
      <div className="w-1/5 h-screen">
        <Icons />
      </div>
      <div className="m-5 w-2/4 h-screen">
        <Newpost />
        <Post />
      </div>
      <div className="w-2/6 h-screen">Pls</div>
    </div>
  );
};

export default page;