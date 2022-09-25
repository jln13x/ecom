import { z } from "zod";

const imageSchema = z.object({
  width: z.number(),
  altText: z.string().nullable(),
  height: z.number(),
  id: z.string(),
  url: z.string(),
});

const optionsSchema = z.array(
  z.object({
    name: z.string(),
    values: z.array(z.string()),
  }),
);

const variantSchema = z.object({
  id: z.string(),
  title: z.string(),
  selectedOptions: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),
  priceV2: z.object({
    amount: z.string(),
  }),
  product: z.object({
    id: z.string(),
    title: z.string(),
  }),
  compareAtPriceV2: z
    .object({
      amount: z.string(),
    })
    .nullable(),
});

const variantsSchema = z.object({
  nodes: z.array(variantSchema),
});

export const reviewSchema = z.object({
  rating: z.number(),
  author: z.string(),
  body: z.string(),
});

export const reviewsSchema = z.object({
  averageRating: z.number(),
  detailedRating: z.object({
    5: z.number(),
    4: z.number(),
    3: z.number(),
    2: z.number(),
    1: z.number(),
  }),
  items: z.array(reviewSchema),
  total: z.number(),
});

export const productSchema = z.object({
  title: z.string(),
  handle: z.string(),
  id: z.string(),
  options: optionsSchema,
  images: z.object({
    nodes: z.array(imageSchema),
  }),
  variants: variantsSchema,
});

export const featuredProductSchema = z.object({
  title: z.string(),
  handle: z.string(),
  id: z.string(),
  featuredImage: imageSchema.nullable(),
  compareAtPriceRange: z.object({
    maxVariantPrice: z.object({
      amount: z.string(),
    }),
  }),
  priceRange: z.object({
    minVariantPrice: z.object({
      amount: z.string(),
    }),
    maxVariantPrice: z.object({
      amount: z.string(),
    }),
  }),
  options: optionsSchema,
});

export const shopifyProductResponseSchema = z.object({
  product: productSchema.nullable(),
});

export type Product = z.infer<typeof productSchema> & {
  reviews: z.infer<typeof reviewsSchema> | null;
};

export type FeaturedProduct = z.infer<typeof featuredProductSchema>;
export type Image = z.infer<typeof imageSchema>;
export type ProductVariant = z.infer<typeof variantSchema>;
export type ProductOptions = z.infer<typeof optionsSchema>;
export type Review = z.infer<typeof reviewSchema>;
