/* eslint-disable react/jsx-key */
'use client'
import React from "react";
import Bubble from "../../component/bubble"

const page = () => {
  const senderArray = ["Hello","Hi"];
  return (
    <div className="flex">
      <div className="h-screen w-1/4 bg-red-700 flex flex-col"></div>
      <div className="flex flex-col p-5 w-3/4 h-screen justify-between">
        <div className="flex w-full h-20">
          <div className="w-10 h-10 justify-self-end rounded-full ml-auto bg-yellow-300"></div>
        </div>  
        <div className="flex flex-col h-full">
          {senderArray.map((data,idx) => {
            return <div>
              <Bubble senderArray={data} />
            </div>
          })}
        </div>
        <div className="h-10 mb-5 w-full self-end">
          <div className="max-w-2xl mx-auto ">
            <form>
              <label htmlFor="chat" className="sr-only">
                Your message
              </label>
              <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                <input
                  id="chat"
                  className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your message..."
                ></input>
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-6 h-6 rotate-90"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
