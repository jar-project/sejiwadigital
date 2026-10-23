import { Funnel, Megaphone, Monitor, Search } from "./icons";
import type { ServiceKey } from "@/lib/site";

export const SERVICE_ICON: Record<ServiceKey, typeof Monitor> = {
  web: Monitor,
  ads: Megaphone,
  seo: Search,
  funnel: Funnel,
};
