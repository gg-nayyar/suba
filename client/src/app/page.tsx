"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();

  const accessToken = Cookie.get("accessToken");

  const [isValid, setIsValid] = useState("loading");
  const [userExist, setUserExitst] = useState("loading");
  async function checkSignedIn(accessToken: string | undefined) {
    const response = await axios.post("http://localhost:8000/is-signed-in", {
      accessToken: accessToken,
    });
    if (response.data.validity && !response.data.userExist) {
      router.push("/home");
    }
    else if(response.data.userExist){
      router.push("/username");
    }
    /**
     * if(response.data.validity == "no username") redirect('/username')
     */
    setUserExitst(response.data.userExist ? "user doesn't exist" : "user exists");
    setIsValid(response.data.validity ? "valid" : "not-valid");
  }
  useEffect(() => {
    (async () => {
      await checkSignedIn(accessToken);
    })();
  }, []);
  return (
    <>
      {isValid == "loading" && userExist == "loading" ? (
        <div className="h-screen w-screen self-center justify-center ">
          <Image
            src="/nyan.gif"
            width={80}
            height={80}
            alt="Nyan Cat"
            unoptimized
          />
        </div>
      ) : isValid == "not-valid" ? (
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
      ) : null}
    </>
  );
};

export default Page;
