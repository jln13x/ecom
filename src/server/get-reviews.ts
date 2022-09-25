import { Review, Product, reviewsSchema } from "@/features/product";
import { httpClient } from "@/lib/http-client";
import { parse } from "node-html-parser";
import { env } from "@/env/server.mjs";
import { z } from "zod";

const getReviews = async (handle: string) => {
  const params = new URLSearchParams({
    shop_domain: env.SHOP_DOMAIN,
    api_token: env.JUDGEME_API_KEY,
    handle,
  });

  const productReviewWidgetResponse = await httpClient.get(
    `${env.JUDGEME_API_URL}/widgets/product_review?${params.toString()}`,
  );

  const parsedResponse = z
    .object({
      widget: z.string(),
    })
    .safeParse(productReviewWidgetResponse);

  if (!parsedResponse.success) return null;

  const widgetDocument = parse(parsedResponse.data.widget);

  const averageRating = widgetDocument
    .querySelector("[data-average-rating]")
    ?.getAttribute("data-average-rating");

  const fiveStars = widgetDocument
    .querySelector('[data-rating="5"]')
    ?.getAttribute("data-frequency");

  const fourStars = widgetDocument
    .querySelector('[data-rating="4"]')
    ?.getAttribute("data-frequency");

  const threeStars = widgetDocument
    .querySelector('[data-rating="3"]')
    ?.getAttribute("data-frequency");

  const twoStars = widgetDocument
    .querySelector('[data-rating="2"]')
    ?.getAttribute("data-frequency");

  const oneStar = widgetDocument
    .querySelector('[data-rating="1"]')
    ?.getAttribute("data-frequency");

  const totalReviews = widgetDocument
    .querySelector("[data-number-of-reviews]")
    ?.getAttribute("data-number-of-reviews");

  const reviewElements = widgetDocument.querySelectorAll("[data-review-id]");

  const reviews: Review[] = [];

  for (const review of reviewElements) {
    const score = review
      .querySelector("[data-score]")
      ?.getAttribute("data-score");

    const author = review.querySelector(".jdgm-rev__author")?.textContent;
    const body = review.querySelector(".jdgm-rev__body")?.textContent;

    const reviewRating = score ? parseInt(score) : null;

    const isValidReviewRating =
      reviewRating && reviewRating >= 1 && reviewRating <= 5;

    if (isValidReviewRating && author && body)
      reviews.push({
        rating: reviewRating,
        author,
        body,
      });
  }

  if (reviews.length === 0) return null;

  type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
  };

  const toBeParsed: DeepPartial<Product["reviews"]> = {
    averageRating: averageRating ? parseInt(averageRating) : undefined,
    detailedRating: {
      5: fiveStars ? parseInt(fiveStars) : undefined,
      4: fourStars ? parseInt(fourStars) : undefined,
      3: threeStars ? parseInt(threeStars) : undefined,
      2: twoStars ? parseInt(twoStars) : undefined,
      1: oneStar ? parseInt(oneStar) : undefined,
    },
    total: totalReviews ? parseInt(totalReviews) : undefined,
    items: reviews,
  };

  const reviewsData = reviewsSchema.safeParse(toBeParsed);

  if (!reviewsData.success) return null;

  return reviewsData.data;
};
