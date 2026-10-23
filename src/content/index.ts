import { id } from "./id";
import { en } from "./en";
import type { SiteContent } from "./types";
import type { ServiceKey } from "@/lib/site";
import { SERVICE_KEYS } from "@/lib/site";

const dict = { id, en } as const;

export function getContent(locale: string): SiteContent {
  return locale === "en" ? en : id;
}

export function getServices(locale: string) {
  const c = getContent(locale);
  return SERVICE_KEYS.map((k: ServiceKey) => c.services[k]);
}

export type { SiteContent };
export { dict };
