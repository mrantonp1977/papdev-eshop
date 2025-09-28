import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .min(0, 'Price must be a positive number'),
  status: z.enum(['draft', 'published', 'archived']),
  isFeatured: z.preprocess((val) => {
    if (typeof val === "string") {
      // handle "true" / "false"
      if (val === "true") return true;
      if (val === "false") return false;
    }
    return val;
  }, z.boolean()),
  category: z.enum(['men', 'women', 'kids' ]),
  images: z.array(z.string()).min(1, 'Image cannot be empty'),
});
