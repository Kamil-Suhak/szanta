export const sklepData = {
	title: 'Sklep',
	categories: [
		{ id: 'materialy_ogrodowe', name: 'Materiały ogrodowe' },
		{ id: 'trawy', name: 'Trawy' },
		{ id: 'krzewy', name: 'Dzrewa i krzewy' },
		{ id: 'zwiry', name: 'Żwiry' },
		{ id: 'piaski', name: 'Piaski' },
		{ id: 'zywoploty', name: 'Żywopłoty' },
		{ id: 'kamienie', name: 'Kamienie' },
		{ id: 'kostka_brukowa', name: 'Kostka brukowa' },
		{ id: 'wypozyczalnia', name: 'Wypożyczalnia sprzętu' }
	],
	products: [
		{
			id: 'k1',
			categoryId: 'krzewy',
			name: 'Drzewa i krzewy ozdobne',
			description: 'Szeroki wybór drzew i krzewów ozdobnych do każdego ogrodu.',
			images: ['/images/shop/drzewa krzewy.jpeg']
		},
		{
			id: 'k2',
			categoryId: 'krzewy',
			name: 'Duże drzewa',
			description: 'Dojrzałe, duże drzewa pozwalające na natychmiastowy efekt w aranżacji.',
			images: [
				'/images/shop/duże drzewo.jpeg',
				'/images/shop/duże drzewa 2.jpeg',
				'/images/shop/duże drzewa 3.jpeg'
			]
		},
		{
			id: 'k3',
			categoryId: 'krzewy',
			name: 'Krzewy i małe rośliny',
			description: 'Idealne rozwiązanie na mniejsze rabaty i do kompozycji wielopoziomowych.',
			images: [
				'/images/shop/krzewy.jpeg',
				'/images/shop/krzewy małe rośliny.jpeg',
				'/images/shop/krzewy małe rośliny 2.jpeg'
			]
		},
		{
			id: 'k4',
			categoryId: 'krzewy',
			name: 'Kompozycja kwitnąca',
			description:
				'Starannie dobrane, kwitnące byliny i krzewy ożywiające każdą rabatę w sezonie letnim.',
			images: ['/images/shop/kwiaty1A.jpeg']
		},
		{
			id: 'km1',
			categoryId: 'kamienie',
			name: 'Kamienie ozdobne',
			description:
				'Naturalne kamienie ozdobne w różnych frakcjach, idealne do ściółkowania i dekoracji.',
			images: ['/images/shop/kamienie ozdobne.jpeg', '/images/shop/kamienie ozdobne 2.jpeg']
		},
		{
			id: 'kb1',
			categoryId: 'kostka_brukowa',
			name: 'Kostka brukowa',
			description: 'Wysokiej jakości kostka brukowa na podjazdy, ścieżki i tarasy.',
			images: ['/images/shop/kostka brukowa.jpeg']
		},
		{
			id: 'kb2',
			categoryId: 'kostka_brukowa',
			name: 'Płytki i ścieżki ogrodowe',
			description: 'Płyty tarasowe i elementy do tworzenia dekoracyjnych ścieżek ogrodowych.',
			images: [
				'/images/shop/płytki.jpeg',
				'/images/shop/płytki 2.jpeg',
				'/images/shop/ścieżka ozdobna.jpeg'
			]
		},
		{
			id: 'p1',
			categoryId: 'piaski',
			name: 'Piasek ozdobny',
			description:
				'Jasny piasek idealny do tworzenia suchych aranżacji, czy na podłoże do roślin pustynnych.',
			images: ['/images/shop/piasek2A.jpeg']
		},
		{
			id: 'w3',
			categoryId: 'wypozyczalnia',
			name: 'Sprzęt do sadzenia',
			description: 'Wydajny sprzęt i maszyny ułatwiające sadzenie dużych roślin i drzew.',
			images: ['/images/shop/sadzenie drzew.jpeg']
		},
		{
			id: 't1',
			categoryId: 'trawy',
			name: 'Trawniki i trawy',
			description:
				'Trawa z rolki oraz nasiona najwyższej jakości zapewniające gęsty, zielony dywan.',
			images: ['/images/shop/trawniki.jpeg']
		},
		{
			id: 'm1',
			categoryId: 'materialy_ogrodowe',
			name: 'Drewno na wiaty i altanki',
			description: 'Wyselekcjonowane drewno konstrukcyjne do budowy altan, wiat i zadaszeń.',
			images: ['/images/shop/wiaty altanki.jpeg']
		},
		{
			id: 'zw1',
			categoryId: 'zwiry',
			name: 'Żwiry ogrodowe',
			description: 'Dekoracyjny żwir w różnych odcieniach, doskonały na ścieżki i rabaty.',
			images: ['/images/shop/żwiry.jpeg']
		},
		{
			id: 'zy1',
			categoryId: 'zywoploty',
			name: 'Rośliny na żywopłot',
			description: 'Gęsto rosnące gatunki idealne do formowania zielonych, naturalnych ogrodzeń.',
			images: ['/images/shop/żywopłot.jpeg']
		}
	],
	buttons: {
		showMore: 'Pokaż więcej',
		prevImage: 'Poprzednie zdjęcie',
		nextImage: 'Następne zdjęcie'
	}
};
