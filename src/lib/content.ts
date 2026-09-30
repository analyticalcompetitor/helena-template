import { getEntry } from "astro:content";
import { marked } from "marked";

export async function getHome() {
  const entry = await getEntry("home", "home");
  if (!entry) throw new Error("src/content/data/home.json não encontrado.");
  return entry.data;
}

export async function getSettings() {
  const entry = await getEntry("settings", "settings");
  if (!entry) throw new Error("src/content/data/settings.json não encontrado.");
  return entry.data;
}

export function whatsappLink(number: string, message?: string) {
  const digits = number.replace(/\D/g, "");
  const text = message?.trim() ? `?text=${encodeURIComponent(message.trim())}` : "";
  return `https://wa.me/${digits}${text}`;
}

/** Markdown do CMS em blocos (parágrafos). */
export function md(value: string) {
  return marked.parse(value ?? "", { async: false }) as string;
}

/** Markdown do CMS em uma linha (sem <p>). */
export function mdInline(value: string) {
  return marked.parseInline(value ?? "", { async: false }) as string;
}
