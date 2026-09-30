import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const emptyToUndefined = (value: unknown) =>
  value === "" || value === null ? undefined : value;

// O Sveltia CMS grava imagens como "/src/assets/...".
// O Astro precisa do caminho relativo ao arquivo JSON para otimizar a imagem.
const repoAssetPathToRelative = (value: unknown) => {
  const normalizedValue = emptyToUndefined(value);

  if (typeof normalizedValue !== "string") {
    return normalizedValue;
  }

  return normalizedValue.replace(/^\/?src\/assets\//, "../../assets/");
};

const text = z.string().default("");

const home = defineCollection({
  loader: glob({ base: "./src/content/data", pattern: "home.json" }),
  schema: ({ image }) => {
    const img = z.preprocess(repoAssetPathToRelative, image());
    const optionalImg = z.preprocess(repoAssetPathToRelative, image().optional());

    return z.object({
      hero: z.object({
        title: z.string(),
        text,
        image: img,
        imageMobile: optionalImg,
        imageAlt: text,
        primaryButton: z.string(),
        secondaryButton: z.string(),
      }),
      areas: z.object({
        title: z.string(),
        buttonLabel: z.string(),
        items: z.array(
          z.object({
            icon: z.enum(["spa", "person", "syringe"]).default("spa"),
            title: z.string(),
            text,
          }),
        ),
      }),
      whyChoose: z.object({
        title: z.string(),
        image: img,
        imageAlt: text,
        items: z.array(z.object({ text: z.string() })),
      }),
      about: z.object({
        title: z.string(),
        text,
        image: img,
        imageAlt: text,
        buttonLabel: z.string(),
      }),
      instagram: z.object({
        title: z.string(),
        subtitle: text,
        name: z.string(),
        handle: z.string(),
        avatar: optionalImg,
        posts: text,
        followers: text,
        following: text,
        images: z.array(z.object({ image: img, alt: text })),
      }),
      faq: z.object({
        title: z.string(),
        image: img,
        imageAlt: text,
        items: z.array(z.object({ question: z.string(), answer: text })),
      }),
      contact: z.object({
        title: z.string(),
        text,
        buttonLabel: z.string(),
      }),
      ctaFinal: z.object({
        title: z.string(),
        text,
        buttonLabel: z.string(),
        image: img,
        imageAlt: text,
      }),
      footer: z.object({
        addressTitle: z.string(),
        address: text,
        mapsLabel: z.string(),
        socialTitle: z.string(),
        copyright: text,
      }),
    });
  },
});

const settings = defineCollection({
  loader: glob({ base: "./src/content/data", pattern: "settings.json" }),
  schema: ({ image }) =>
    z.object({
      siteTitle: z.string(),
      siteDescription: z.string(),
      logo: z.preprocess(repoAssetPathToRelative, image()),
      footerLogo: z.preprocess(repoAssetPathToRelative, image()),
      whatsappNumber: z.string(),
      whatsappMessage: text,
      instagramUrl: z.preprocess(emptyToUndefined, z.string().optional()),
      tiktokUrl: z.preprocess(emptyToUndefined, z.string().optional()),
      linkedinUrl: z.preprocess(emptyToUndefined, z.string().optional()),
      mapsUrl: z.preprocess(emptyToUndefined, z.string().optional()),
    }),
});

export const collections = { home, settings };
