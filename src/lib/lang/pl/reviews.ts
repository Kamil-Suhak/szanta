export interface Review {
	id: string;
	author_name: string;
	rating: number;
	text: string;
	relative_time_description: string;
	profile_photo_url?: string;
	initial: string;
	pdf_url?: string;
}

export const reviewsData = {
	title: 'Referencje',
	subtitle: 'Co mówią o nas firmy, z którymi współpracowaliśmy.',
	items: [
		{
			id: '1',
			author_name: 'Urząd Miasta Katowice',
			rating: 5,
			text: 'Firma Szanta wywiązała się z umowy w sposób terminowy i rzetelny. Prace polegały na rewitalizacji zieleni miejskiej. Z pełnym przekonaniem polecamy firmę jako rzetelnego wykonawcę.',
			relative_time_description: '2 miesiące temu',
			initial: 'U',
			pdf_url: '/src/lib/assets/documents/urzad-katowice.pdf'
		},
		{
			id: '2',
			author_name: 'Firma Budowlana Kowalski',
			rating: 5,
			text: 'Współpraca przy zakładaniu zieleni wokół nowo wybudowanych osiedli przebiegła bezproblemowo. Doceniamy fachowe doradztwo i sprawne przeprowadzenie prac. Polecamy do współpracy.',
			relative_time_description: '3 miesiące temu',
			initial: 'F',
			pdf_url: '/src/lib/assets/documents/firma-kowalski.pdf'
		},
		{
			id: '3',
			author_name: 'Spółdzielnia Mieszkaniowa',
			rating: 5,
			text: 'Zleciliśmy firmie Szanta wiosenne porządki i pielęgnację terenów zielonych na naszych osiedlach. Efekt przerósł nasze najśmielsze oczekiwania. Zdecydowanie nawiążemy stałą współpracę!',
			relative_time_description: 'tydzień temu',
			initial: 'S',
			pdf_url: '/src/lib/assets/documents/spoldzielnia.pdf'
		},
		{
			id: '4',
			author_name: 'Parki Miejskie Sp. z o.o.',
			rating: 5,
			text: 'Wszystkie prace, od niwelacji terenu po nasadzenia, zostały wykonane z największą starannością. Ekipa Szanta posiada odpowiedni sprzęt i wiedzę potrzebną do realizacji dużych inwestycji.',
			relative_time_description: 'pół roku temu',
			initial: 'P',
			pdf_url: '/src/lib/assets/documents/parki-miejskie.pdf'
		},
		{
			id: '5',
			author_name: 'Zarząd Zieleni Miejskiej',
			rating: 5,
			text: 'Szybka i sprawna przycinka drzew w parkach. Firma dysponuje profesjonalnym sprzętem i wiedzą. Zostawili po sobie idealny porządek. Gorąco polecamy!',
			relative_time_description: 'miesiąc temu',
			initial: 'Z',
			pdf_url: '/src/lib/assets/documents/zarzad-zieleni.pdf'
		},
		{
			id: '6',
			author_name: 'Deweloper Silesia',
			rating: 5,
			text: 'Zieleń wokół naszej nowej inwestycji została zaprojektowana i wykonana wzorowo. Estetyka, staranność i dobór roślin stoją na najwyższym poziomie.',
			relative_time_description: '4 miesiące temu',
			initial: 'D',
			pdf_url: '/src/lib/assets/documents/deweloper-silesia.pdf'
		},
		{
			id: '7',
			author_name: 'Hotel Zielony Kąt',
			rating: 5,
			text: 'Dzięki firmie Szanta otoczenie naszego hotelu zyskało nowy, reprezentacyjny wygląd. Nasi goście są zachwyceni ogrodem. Profesjonalizm w każdym calu.',
			relative_time_description: '5 miesięcy temu',
			initial: 'H',
			pdf_url: '/src/lib/assets/documents/hotel-zielony-kat.pdf'
		},
		{
			id: '8',
			author_name: 'Centrum Logistyczne',
			rating: 5,
			text: 'Prace pielęgnacyjne i utrzymanie terenów zielonych na rozległym terenie centrum przebiegają zawsze bez zakłóceń. Cieszymy się z długofalowej współpracy.',
			relative_time_description: '8 miesięcy temu',
			initial: 'C',
			pdf_url: '/src/lib/assets/documents/centrum-logistyczne.pdf'
		}
	] as Review[]
};
