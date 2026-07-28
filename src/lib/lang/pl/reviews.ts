import doc1 from '$lib/assets/documents/GminaMyszkowPielegnacja.pdf';
import doc2 from '$lib/assets/documents/MOKZawiercieWycinka2024.pdf';
import doc3 from '$lib/assets/documents/MPGLSwietochlowiceZagospodarowanieWspolnota2024.pdf';
import doc4 from '$lib/assets/documents/MyszkowZagospodarowanie-terenow-miejskich.pdf';
import doc5 from '$lib/assets/documents/PowiatZawiercieReferencje.pdf';
import doc6 from '$lib/assets/documents/Referencje-PoswiadczenieGminaMyszkow-usuniecie-drzew.pdf';
import doc7 from '$lib/assets/documents/ReferencjePowiatZawiercieNasadzenie76szt-drzew.pdf';
import doc8 from '$lib/assets/documents/ZGMZawiercieNasadzenie15szt-drzew.pdf';

export interface Review {
	id: string;
	author_name: string;
	text: string;
	date_written: string;
	profile_photo_url?: string;
	pdf_url?: string;
}

export const reviewsData = {
	title: 'Referencje',
	subtitle: 'Co mówią o nas firmy, z którymi współpracowaliśmy.',
	items: [
		{
			id: '1',
			author_name: 'Zarząd Dróg Powiatowych w Zawierciu',
			text: 'Udzielamy rekomendacji firmie SZANTA Pana Klaudiusza Grocholi jako firmie wykazującej się starannością wykonanych usług [oraz] terminowością wykonania.',
			date_written: '13 maja 2026',
			pdf_url: doc5
		},
		{
			id: '2',
			author_name: 'Gmina Myszków',
			text: 'Powyższe usługi zostały zrealizowane z należytą starannością, terminowo oraz w sposób zgodny z wymaganiami określonymi przez Zamawiającego.',
			date_written: '22 października 2025',
			pdf_url: doc4
		},
		{
			id: '3',
			author_name: 'MPGL w Świętochłowicach',
			text: 'Prace zostały ukończone prawidłowo, terminowo, z należytą starannością, zgodnie z zakresem rzeczowym umowy, obowiązującymi normami, przepisami BHP oraz Prawem Budowlanym.',
			date_written: '12 lutego 2025',
			pdf_url: doc3
		},
		{
			id: '4',
			author_name: 'Urząd Gminy w Myszkowie',
			text: 'Wszystkie usługi [...] zostały wykonane bez zastrzeżeń. [...] Firma udowodniła, że jest sprawdzonym, rzetelnym i godnym zaufania profesjonalnym partnerem w realizacji powierzonych zadań.',
			date_written: '5 listopada 2018',
			pdf_url: doc6
		},
		{
			id: '5',
			author_name: 'Starostwo Powiatowe w Zawierciu',
			text: 'Udzielamy rekomendacji firmie SZANTA Pana Klaudiusza Grocholi jako firmie wykazującej się starannością wykonanych usług, [...], a przede wszystkim dobrą jakością nasadzonego materiału.',
			date_written: '25 października 2024',
			pdf_url: doc7
		},
		{
			id: '6',
			author_name: 'ZGM w Zawierciu',
			text: 'Usługa została wykonana terminowo oraz fachowo z należytą starannością. [...] Wykonawca zachował warunki 24 miesięcznej gwarancji, co zostało potwierdzone ostateczną wizją lokalną w terenie.',
			date_written: '8 października 2025',
			pdf_url: doc8
		},
		{
			id: '7',
			author_name: 'Gmina Myszków',
			text: 'Usługa realizowana była należycie, tj. terminowo oraz w sposób zgodny z wymaganiami określonymi przez Zamawiającego.',
			date_written: '28 stycznia 2025',
			pdf_url: doc1
		},
		{
			id: '8',
			author_name: 'MOK "Centrum" w Zawierciu',
			text: 'Polecamy usługi Firmy [...] wszystkim tym, którzy podobnie jak my cenią sobie solidne partnerstwo w biznesie.',
			date_written: '7 lutego 2025',
			pdf_url: doc2
		}
	] as Review[]
};
