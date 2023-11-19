// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.string(),
      cover: image().refine((img) => img.width >= 1080, {
        message: "Cover image must be at least 1080 pixels wide!",
      }),
      coverAlt: z.string(),
      header: image()
        .refine((img) => img.width >= 1080, {
          message: "Header image must be at least 1080 pixels wide!",
        })
        .optional(),
      headerAlt: z.string().optional(),
      exhibit: z.string().optional(),
      tags: z.array(z.string()),
      team: z.array(z.string()).optional(),
      link: z.object({ url: z.string(), label: z.string() }).optional(),
      color: z.string(),
      order: z.number().optional(),
      images: z
        .array(
          image().refine((img) => img.width >= 480, {
            message: "Image must be at least 4080 pixels wide!",
          })
        )
        .optional(),
      alts: z.array(z.string()).optional(),
    }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  projects: postsCollection,
};
