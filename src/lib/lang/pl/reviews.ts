export interface Review {
	id: string;
	author_name: string;
	rating: number;
	text: string;
	relative_time_description: string;
	profile_photo_url?: string;
	initial: string;
}

export const reviewsData = {
	title: 'Opinie Naszych Klientów',
	subtitle: 'Zobacz, co mówią o nas osoby, z którymi mieliśmy przyjemność współpracować.',
	items: [
		{
			id: '1',
			author_name: 'Anna Kowalska',
			rating: 5,
			text: 'Firma Szanta całkowicie odmieniła nasz ogród! Zespół był bardzo profesjonalny, punktualny i pełen świetnych pomysłów. Trawa jest teraz idealnie zielona, a nowe rabaty kwiatowe zapierają dech w piersiach. Polecam z całego serca każdemu, kto marzy o pięknym otoczeniu domu.',
			relative_time_description: '2 miesiące temu',
			initial: 'A'
		},
		{
			id: '2',
			author_name: 'Michał Nowak',
			rating: 5,
			text: 'Pełen profesjonalizm od pierwszego spotkania aż po realizację. Panowie wykonali system automatycznego nawadniania w zaledwie kilka dni, nie niszcząc przy tym istniejących już roślin. Świetny kontakt i doradztwo na każdym etapie prac.',
			relative_time_description: '3 miesiące temu',
			initial: 'M'
		},
		{
			id: '3',
			author_name: 'Katarzyna Wiśniewska',
			rating: 5,
			text: 'Zleciliśmy firmie Szanta wiosenne porządki i wertykulację trawnika. Efekt przerósł nasze najśmielsze oczekiwania. Dodatkowo otrzymaliśmy cenne wskazówki dotyczące pielęgnacji ogrodu na cały sezon. Zdecydowanie nawiążemy stałą współpracę!',
			relative_time_description: 'tydzień temu',
			initial: 'K'
		},
		{
			id: '4',
			author_name: 'Tomasz Dąbrowski',
			rating: 5,
			text: 'Zaprojektowanie i wykonanie ogrodu od zera to nie lada wyzwanie, ale ekipa Szanta poradziła sobie z nim celująco. Wszystkie prace, od niwelacji terenu po nasadzenia, zostały wykonane z największą starannością. Nasz nowy ogród to teraz ulubione miejsce całej rodziny.',
			relative_time_description: 'pół roku temu',
			initial: 'T'
		},
		{
			id: '5',
			author_name: 'Agnieszka Kamińska',
			rating: 5,
			text: 'Szybka i sprawna przycinka drzew i krzewów. Firma dysponuje profesjonalnym sprzętem i wiedzą. Zostawili po sobie idealny porządek. Bardzo przystępne ceny jak na tak wysoką jakość usług. Gorąco polecam!',
			relative_time_description: 'miesiąc temu',
			initial: 'A'
		}
	] as Review[]
};
