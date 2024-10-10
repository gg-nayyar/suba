"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  axios.defaults.withCredentials = true;

  const router = useRouter();
  const [username, setUserName] = useState("");
  const [userExists, setUserExitsts] = useState("");
  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // [['accessToken', 'something'], ['x', 'y']]
    let c = document.cookie.split(";");
    let key_value = c.map((x) => {
      return x.split("=");
    });
    let accessTokenValue = key_value.filter((x) => {
      return x[0] == "accessToken";
    }); // [[accessToken, something]]

    const response = await axios.post(
      "http://localhost:8000/api/username",
      JSON.stringify({ username }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenValue[0][1]}`,
        },
      }
    );
    if (response.data.username == "username saved") {
      setUserExitsts(response.data.username);
      router.push("/home");
    } else if ((response.data.username == "username already exist")) {
      setUserExitsts(response.data.username);
    }
  }
  useEffect(()=>{
    handleClick;
  },[userExists]);
  return (
    <div>
      <div className="flex flex-row">
        <h1 className="bold text-4xl text-purple-800">SU</h1>
        <h1 className="bold text-4xl text-white">BA</h1>
      </div>
      <div>
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Your User Name
            </label>
            <div className="flex flex-row">
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="username"
              required
            />
          <div>
            {userExists == "username already exist" ? (
              <h3 className="text-red-700 ml-5">Username Already Exists!</h3>
            ) : null}
          </div>
          </div>
          </div>
          <button
            onClick={handleClick}
            type="submit"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
