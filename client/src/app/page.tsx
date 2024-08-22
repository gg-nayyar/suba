"use client"
import React, { useEffect } from "react";
import Link from "next/link";

import Icons from "./component/icons";

const page = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-row">
        <h1 className="bold text-4xl text-purple-800">SU</h1>
        <h1 className="bold text-4xl text-white">BA</h1>
      </div>
      <div className="flex align-middle justify-center">
        <Link href="http://localhost:8000/auth/google">
          <button
            type="button"
            className="focus:outline-none text-white bg-purple-800 hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Log In with Google
          </button>
        </Link>
      </div>
    </div>
  );
};

export default page;
