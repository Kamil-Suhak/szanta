/// <reference types="@cloudflare/workers-types" />
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				// Add your Cloudflare bindings here (e.g. KVNamespace, D1Database, etc.)
			};
		}
	}
}

export {};
