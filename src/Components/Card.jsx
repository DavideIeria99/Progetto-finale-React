
export default function Card({ game }) {
    return (
        <div className="mb-5 w-1/2 px-2 md:w-1/4">
            <p>{game.name}</p>
            <img
                src={game.background_image}
                alt="img"
                className="h-40 w-full object-cover"
            />
        </div>
    );
}
