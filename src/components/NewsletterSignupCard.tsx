import './newsletterSignupCard.css'

type NewsletterSignupCardProps = {
    name: string;
    description: string;
    color: string;
    image: string;
    checked: boolean;
};

export const NewsletterSignupCard = ({
    name,
    description,
    color,
    image,
    checked,
}: NewsletterSignupCardProps) =>
    <div className='card'>
        <div className='header' style={{ backgroundColor: color }}>
            <img alt={`logo for ${name}`} src={image}></img>
        </div>
        <h3>
            {name}
        </h3>
        <p>
            {description}
        </p>
        <button onClick={() => console.log('clicked')} style={{ backgroundColor: color }}>
            {checked ? "✓ Signed Up" : "Sign Up"}
        </button>
    </div>

