import { Star } from 'lucide-svelte';

export const markerStyles: Record<string, string> = {
  "[[": "text-[var(--forest-green)]",
  "{{": "text-[var(--forest-green)] font-bold",
  "((": "text-[var(--forest-green)] hover:underline transition-all cursor-pointer",
  "!!": "font-black uppercase",
  "**": "bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-md mx-1",
};

export const markers: Record<string, string> = {
  "[[": "]]",
  "{{": "}}",
  "((": "))",
  "!!": "!!",
  "**": "**",
};

export const markersContent: Record<string, { tag: any; props?: any }> = {
  "&": { tag: "br" },
  "*": { tag: Star, props: { class: "inline-block text-yellow-500 fill-yellow-500 h-6 w-6 -mt-1 mx-1" } },
};
