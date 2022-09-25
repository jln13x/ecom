import autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import NextImage from "next/future/image";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { Image } from "../product";

interface ImageCarouselProps {
  images: Image[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [emblaRef, api] = useEmblaCarousel(
    {
      align: "start",
      // aligns the first slide to the start
      // of the viewport else will align it to the middle.

      // we need the carousel to loop to the
      // first slide once it reaches the last slide.
      loop: true,

      // Allow the carousel to skip scroll snaps if
      // it's dragged vigorously.
      skipSnaps: false,
    },
    [autoplay({})],
  );

  const previous = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  const next = () => {
    if (api) {
      api.scrollNext();
    }
  };

  return (
    <div className="relative w-full">
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="relative flex w-full grow">
          {images.map((image) => (
            <div
              className="relative flex w-full flex-none items-center justify-center p-8"
              key={image.id}
            >
              <figure>
                <NextImage
                  src={image.url}
                  width={image.width}
                  height={image.height}
                  priority={true}
                  alt={image.altText || ""}
                />
                {image.altText && (
                  <figcaption className="mt-6 text-center text-xs uppercase tracking-[0.5em] text-neutral-600">
                    {image.altText}
                  </figcaption>
                )}
              </figure>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 flex items-center">
        <button
          className="rounded-full bg-neutral-200/60 p-2"
          onClick={previous}
          title="Previous slide"
        >
          <HiOutlineChevronLeft />
        </button>
      </div>
      <div className="absolute top-0 bottom-0 right-0 flex items-center">
        <button
          className="rounded-full bg-neutral-200/60 p-2"
          onClick={next}
          title="Next slide"
        >
          <HiOutlineChevronRight />
        </button>
      </div>
    </div>
  );
};
