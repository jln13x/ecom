import { HiArrowRight } from "react-icons/hi";

export const NewsletterFooter = () => {
  return (
    <div>
      <label
        className="block w-full text-center text-xs uppercase tracking-widest text-stone-200"
        htmlFor="subscribe-to-emails"
      >
        Get notified of exclusive offers, discounts and new innovative product
        releases.
      </label>
      <div className="mt-4 grid w-full place-items-center">
        <div className="flex rounded-lg border border-stone-200 px-4 text-sm">
          <input
            className="border-brand-white grow bg-transparent py-3 text-sm text-white placeholder:uppercase placeholder:text-stone-400 focus:outline-none"
            placeholder="Enter your E-Mail..."
            id="subscribe-to-emails"
          />
          <button
            className="text-white"
            type="submit"
            aria-label="Submit newsletter subscription"
          >
            <HiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
