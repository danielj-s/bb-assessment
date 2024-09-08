import './newsletterSignupCard.css'
import { useState } from 'react';

type NewsletterSignupCardProps = {
    name: string;
    description: string;
    color: string;
    image: string;
    subscribed: boolean;
};

export const NewsletterSignupCard = ({
    name,
    description,
    color,
    image,
    subscribed,
}: NewsletterSignupCardProps) => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribed)

    const urlName = (() => {
        const split: string[] = name.split(' ')
        return [split[0].toLowerCase(), split[1]].join('')
    })()

    const handleClick = () => fetch(`http://localhost:5001/subscriptions/${urlName}`, { method: 'POST' })
        .then(res => res.json()).then(data => setIsSubscribed(data[urlName]))

    return <div className='card'>
        <div className='header' style={{ backgroundColor: color }}>
            <img alt={`logo for ${name}`} src={image}></img>
        </div>
        <h3>
            {name}
        </h3>
        <p>
            {description}
        </p>
        <button onClick={handleClick} style={{ backgroundColor: color }}>
            {isSubscribed ? "✓ Signed Up" : "Sign Up"}
        </button>
    </div>
}
