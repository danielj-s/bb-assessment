import React, { useEffect, useState } from "react";
import { NewsletterSignupCard } from "./components/NewsletterSignupCard";
import "./App.css";

// The data for each newsletter tile would come from an API in production (I hope!)
// so there'd be a generic loading state for each card while we wait on that GET call.
const newsletters = [
  {
    id: "the-scan",
    name: "The Scan",
    description:
      "Get essential news and engaging features in your inbox curated by Banner staff.",
    color: "#FFDC00",
  },
  {
    id: "the-dish",
    name: "The Dish",
    description:
      "Dive into what's going on in the food industry every Wednesday with food reporter Christina Tkacik.",
    color: "#00C035",
  },
];
function App() {
  const [subscriptions, setSubscriptions] = useState<Record<
    string,
    boolean
  > | null>(null);

  useEffect(() => {
    // In a production environment or anything that would want to scale,
    // the api calls would likely be defined outside of the components
    // and would probably leverage a library that handles caching/state management,
    // like Axios or something that plays nicely with Redux like RTKQuery
    const fetchSubscriptions = async () =>
      fetch("http://localhost:5001/subscriptions")
        .then((res) => res.json())
        .then((data) => setSubscriptions(data));
    fetchSubscriptions();
  }, []);

  return subscriptions ? (
    <div className="App">
      <h1>Email Newsletters</h1>
      <div className="tiles">
        {newsletters.map(({ id, name, description, color }) => (
          <NewsletterSignupCard
            color={color}
            description={description}
            id={id}
            image={`images/${id}.png`}
            key={id}
            name={name}
            subscribed={subscriptions[id]}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
