/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

export default function bubble(props: { senderArray: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) {
  return (
    <div>
        <div className="flex w-full justify-end">

            <div className="chat chat-start">
                <div className="chat-image avatar">
                <div className="w-10 ml-auto">
                    <img
                    className="rounded-full"
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                </div>
                </div>
                <div className="chat-header">
                Obi-Wan Kenobi
                </div>
                <div className="chat-bubble">{props.senderArray}</div>
                <div className="chat-footer opacity-50">Delivered</div>
            </div>
        </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 ">
            <img className="rounded-full"
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Anakin
        </div>
        <div className="chat-bubble">I hate you!</div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
      </div>
    </div>
  );
}
