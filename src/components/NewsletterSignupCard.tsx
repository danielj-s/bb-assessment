import React, { useState } from "react";
import "./newsletterSignupCard.css";
import { ReactComponent as Checkmark } from "../assets/images/check.svg";

type NewsletterSignupCardProps = {
  id: string;
  name: string;
  description: string;
  color: string;
  image: string;
  subscribed: boolean;
};

export const NewsletterSignupCard = ({
  id,
  name,
  description,
  color,
  image,
  subscribed,
}: NewsletterSignupCardProps) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribed);

  const handleClick = () =>
    fetch(`http://localhost:5001/subscriptions/${id}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setIsSubscribed(data[id]));

  return (
    <div className="card">
      <div className="header" style={{ backgroundColor: color }}>
        <img alt={`logo for ${name}`} src={image}></img>
      </div>
      <div className="content">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: isSubscribed ? color : "inherit",
          border: isSubscribed ? "none" : "1px solid black",
        }}
      >
        {isSubscribed ? (
          <span className="subscribed">
            <Checkmark /> Signed Up
          </span>
        ) : (
          <span className="unsubscribed">Sign Up</span>
        )}
      </button>
    </div>
  );
};
