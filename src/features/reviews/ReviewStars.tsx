import { FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";
import { MdStar, MdStarBorder, MdStarHalf } from "react-icons/md";

interface ReviewStarsProps {
  rating: number;
}

const maxRating = 5;

export const ReviewStars: React.FC<ReviewStarsProps> = ({ rating }) => {
  if (rating > maxRating) {
    throw new Error(`Max allowed rating is ${maxRating}`);
  }

  const fullStars = Math.floor(rating);
  const halfStars = Math.round(rating - fullStars);
  const emptyStars = maxRating - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, idx) => (
        <MdStar className="text-amber-500" key={idx} />
      ))}

      {halfStars > 0 &&
        [...Array(Math.floor(halfStars))].map((_, idx) => (
          <MdStarHalf className="text-amber-500" key={idx} />
        ))}

      {emptyStars > 0 &&
        [...Array(Math.floor(emptyStars))].map((_, idx) => (
          <MdStarBorder className="text-amber-500" key={idx} />
        ))}
    </div>
  );
};
