import { Star } from 'lucide-svelte';

export const markerStyles: Record<string, string> = {
	'[[': 'text-[var(--forest-green)]',
	'{{': 'text-[var(--forest-green)] font-bold',
	'((': 'text-[var(--forest-green)] hover:underline transition-all cursor-pointer',
	'!!': 'font-black uppercase',
	'**': 'bg-yellow-100 text-yellow-800 pl-2 py-1 rounded-lg rounded-r-none ml-1 mr-0'
};

export const markers: Record<string, string> = {
	'[[': ']]',
	'{{': '}}',
	'((': '))',
	'!!': '!!',
	'**': '**'
};

export const markersContent: Record<string, { tag: any; props?: any }> = {
	'&': { tag: 'br' },
	'*': {
		tag: Star,
		props: {
			class:
				'inline-block text-yellow-500 fill-yellow-500 h-8 w-8 -mt-1 mx-0 bg-yellow-100 px-1.5 py-0.5 rounded-lg rounded-l-none'
		}
	}
};
