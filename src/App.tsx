import './App.css';
import { NewsletterSignupCard } from './components/NewsletterSignupCard';

//The data for each newsletter tile would come from an API in production (I hope!)
//so there'd be a generic loading state for each card while we wait on that GET call.
const newsletters = [
  {
    id: "the-scan",
    name: "The Scan",
    description: "Get essential news and engaging features in your inbox curated by Banner staff.",
    color: "#FFDC00",
  },
  {
    id: "the-dish",
    name: "The Dish",
    description: "Dive into what's going on in the food industry every Wednesday with food reporter Christina Tkacik.",
    color: "#00C035",
  }
]

function App() {

  return (
    <div className="App">
      <h1>Email Newsletters</h1>
      <div className="tiles">
        {newsletters.map(({ name, description, color }) =>
          <NewsletterSignupCard
            name={name}
            key={name}
            description={description}
            color={color}
            subscribed={false}
            //This is probably too cute, would just pull the img src url from the newsletter data
            image={`images/${name.toLowerCase().split(' ').join('-')}.png`} />)}
      </div>
    </div>
  );
}

export default App;
