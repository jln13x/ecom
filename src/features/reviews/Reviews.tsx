import autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { ReviewStars } from "./ReviewStars";
import { MdFormatQuote } from "react-icons/md";

const reviews: Review[] = [
  {
    name: "C. M. Parker",
    rating: 5,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat in minus ducimus aperiam, magnam consequatur ipsum voluptatem dicta accusantium sed?",
  },
];

interface Review {
  rating: number;
  text: string;
  name: string;
}

export const Reviews = () => {
  const [emblaRef, embla] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      skipSnaps: false,
    },
    [autoplay()]
  );

  const previous = () => embla && embla.scrollPrev();
  const next = () => embla && embla.scrollNext();

  return (
    <div className="h-full w-full">
      <div className="h-full w-full overflow-hidden" ref={emblaRef}>
        <div className="flex w-full items-start py-4">
          {reviews.map((review, idx) => (
            <div key={idx} className="flex w-full flex-none px-2 md:w-2/4">
              <div className="flex w-full flex-col items-center rounded-md border border-neutral-100 py-4 text-center shadow-md">
                <MdFormatQuote className="text-4xl font-bold text-brand-primary" />
                <p className="mt-2 flex-grow px-4 text-sm leading-6">
                  {review.text}
                </p>
                <div className="mt-4 flex flex-col items-center">
                  <ReviewStars rating={review.rating} />
                  <p className="mt-1 text-xs font-bold">{review.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs font-light text-neutral-400">
        Contact us if you would like to share your experience.
      </p>
      <div className="mt-4 flex justify-center space-x-4 text-sm text-brand-primary">
        <button
          className="rounded-md border p-2 focus:outline-none focus-visible:ring focus-visible:ring-brand-primary focus-visible:ring-opacity-75"
          aria-label="Previous Review"
          title="Previous Review"
          onClick={previous}
        >
          <HiArrowLeft />
        </button>
        <button
          className="rounded-md border p-2 focus:outline-none focus-visible:ring focus-visible:ring-brand-primary focus-visible:ring-opacity-75"
          aria-label="Next Review"
          title="Next Review"
          onClick={next}
        >
          <HiArrowRight />
        </button>
      </div>
    </div>
  );
};
