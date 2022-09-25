import { Button, LoadingOverlay } from "@/components";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { fadeInOut, mergeTransitions, slideInOut } from "../transitions";
import { useContact } from "./use-contact";
import differenceInDays from "date-fns/differenceInDays";

const COUNT_KEY = "lorem-contact-form_submit_count";
const LAST_SUBMIT_KEY = "lorem-contact-form_last-submit";
const MAX_SUBMIT_COUNT = 3;

export const ContactForm = ({}) => {
  const {
    mutate: submitContact,
    isError,
    isSuccess,
    isLoading,
    reset,
  } = useContact();
  const email = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLTextAreaElement>(null);

  // poor mans _temporarly_ quick&dirty client side rate limiting
  const [isRateLimited, setIsRateLimited] = useState(false);

  const isMaxCountReached = () => {
    const count = localStorage.getItem(COUNT_KEY);
    return count && +count >= MAX_SUBMIT_COUNT;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (isRateLimited) return;
    if (isMaxCountReached()) {
      reset();
      setIsRateLimited(true);
      return;
    }

    const emailValue = email.current?.value;
    const messageValue = message.current?.value;

    if (!emailValue || !messageValue) return;

    submitContact({
      email: emailValue,
      message: messageValue,
    });

    const submitCountItem = localStorage.getItem(COUNT_KEY);

    if (submitCountItem && +submitCountItem >= MAX_SUBMIT_COUNT) {
      setIsRateLimited(true);
    }

    localStorage.setItem(
      COUNT_KEY,
      submitCountItem ? `${parseInt(submitCountItem) + 1}` : `${1}`
    );

    localStorage.setItem(LAST_SUBMIT_KEY, new Date().toISOString());
  };

  const resetForm = () => {
    if (isSuccess || isError) reset();
  };

  useEffect(() => {
    const lastSubmit = localStorage.getItem(LAST_SUBMIT_KEY);

    if (lastSubmit) {
      const lastSubmitDate = new Date(lastSubmit);
      const dateDiff = differenceInDays(new Date(), lastSubmitDate);

      if (isMaxCountReached() && dateDiff < 1) {
        setIsRateLimited(true);
        return;
      }

      localStorage.removeItem(LAST_SUBMIT_KEY);
    }

    localStorage.removeItem(COUNT_KEY);
    scrollTo(0, 0);
  }, []);

  return (
    <div>
      <form className="relative" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col ">
            <label
              htmlFor="email"
              className="text-sm font-medium uppercase tracking-wider text-stone-600"
            >
              E-Mail
              <span className="font-bold text-rose-600">*</span>
            </label>
            <input
              required
              maxLength={100}
              ref={email}
              type="email"
              id="email"
              className="mt-1 rounded-md border border-stone-200 py-2 px-2 caret-brand-primary shadow-md selection:bg-brand-primary/20 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary-lighter sm:max-w-sm"
              autoComplete="email"
              onChange={resetForm}
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-sm font-medium uppercase tracking-wider text-stone-600"
            >
              Message
              <span className="font-bold text-rose-600">*</span>
            </label>
            <textarea
              minLength={10}
              required
              maxLength={2000}
              ref={message}
              id="message"
              rows={6}
              className="relative mt-1 resize-none rounded-md border border-stone-200 py-2 px-2 caret-brand-primary  shadow-md selection:bg-brand-primary/20 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary-lighter"
              onChange={resetForm}
              disabled={isLoading}
            />
          </div>
          <Transition
            show={isError || isSuccess || isRateLimited}
            {...mergeTransitions([slideInOut("top"), fadeInOut("full")])}
            enter="transition-all duration-200"
            leave="transition-all duration-200 absolute "
            className="relative z-10 text-xs"
            as="div"
          >
            {isError && (
              <div className="absolute flex w-full items-center space-x-2 rounded-md bg-rose-100 px-2 py-4">
                <HiOutlineExclamationCircle className="flex-shrink-0 text-lg text-rose-700" />
                <p className="font-bold text-rose-700">
                  An error occured. Please try again later.
                </p>
              </div>
            )}
            {isRateLimited && (
              <div className="absolute flex w-full items-center space-x-2 rounded-md bg-amber-100 px-2 py-4">
                <HiOutlineExclamationCircle className="flex-shrink-0 text-lg text-amber-700" />
                <p className="font-bold text-amber-700">
                  You have to wait before sending another message. We will get
                  back to you.
                </p>
              </div>
            )}

            {isSuccess && (
              <div className="absolute flex w-full items-center space-x-2 rounded-md bg-emerald-100 px-2 py-4 text-emerald-700">
                <HiOutlineCheckCircle className="flex-shrink-0 text-lg" />
                <p className="font-bold text-emerald-700">
                  Your message has been sent.
                </p>
              </div>
            )}
          </Transition>

          <Button
            type="submit"
            disabled={isLoading || isSuccess || isError || isRateLimited}
            isLoading={isLoading}
            className={clsx(
              "mt-6 font-bold transition-all duration-200 sm:self-start",
              {
                "translate-y-[50px]": isSuccess || isError || isRateLimited,
              }
            )}
          >
            <span>Submit your message</span>
          </Button>
        </div>
        {isLoading && <LoadingOverlay />}
      </form>
    </div>
  );
};
