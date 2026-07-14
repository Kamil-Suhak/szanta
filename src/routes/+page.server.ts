import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { env } from '$env/dynamic/private';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		// 1. Honeypot check (bots will fill this field)
		const honeypot = formData.get('b_phone');
		if (honeypot && honeypot.toString().trim() !== '') {
			console.warn('[Security] Bot submission caught by honeypot.');
			// Return a mock success response so the bot believes it succeeded
			return { success: true, mocked: true };
		}

		// 2. Extract fields
		const name = formData.get('name')?.toString().trim();
		const email = formData.get('email')?.toString().trim();
		const phone = formData.get('phone')?.toString().trim();
		const service = formData.get('service')?.toString().trim();
		const message = formData.get('message')?.toString().trim();

		// 3. Validation
		const errors: Record<string, string> = {};

		if (!name) {
			errors.name = 'nameRequired';
		}

		if (!email) {
			errors.email = 'emailRequired';
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				errors.email = 'emailInvalid';
			}
		}

		if (phone) {
			const cleanPhone = phone.replace(/\s+/g, '');
			if (!/^\d{9}$/.test(cleanPhone)) {
				errors.phone = 'phoneInvalid';
			}
		}

		if (!service) {
			errors.service = 'serviceRequired';
		}

		if (!message) {
			errors.message = 'messageRequired';
		} else {
			// 4. Anti-bot string length filter (words > 50 characters)
			const longWordRegex = /\S{50,}/;
			if (longWordRegex.test(message) || (name && longWordRegex.test(name))) {
				console.warn('[Security] Bot submission caught by long word filter.');
				return fail(400, {
					values: { name, email, phone, service, message },
					errors: { global: 'botDetected' }
				});
			}
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, {
				values: { name, email, phone, service, message },
				errors
			});
		}

		// 5. Construct and Send Email via Brevo API
		const brevoKey = env.BREVO_API_KEY;
		const isTestMode = env.TEST_MODE === 'true';
		const recipientEmail = isTestMode
			? env.ADMIN_EMAIL || 'admin@szantaogrody.pl'
			: env.RECIPIENT_EMAIL || 'szanta.ogrody@gmail.com';
		const senderEmail = env.SENDER_EMAIL || 'no-reply@szantaogrody.pl';

		const emailSubject = `[Kontakt Szanta.com] Nowe zapytanie od: ${name} na temat: ${service}`;
		const emailHtml = `
			<h2>Nowe zapytanie z formularza kontaktowego Szanta.com</h2>
			<hr />
			<p><strong>Imię i nazwisko:</strong> ${name}</p>
			<p><strong>E-mail:</strong> ${email}</p>
			<p><strong>Telefon:</strong> ${phone || 'Nie podano'}</p>
			<p><strong>Wybrana usługa:</strong> ${service}</p>
			<hr />
			<p><strong>Treść wiadomości:</strong></p>
			<p style="white-space: pre-wrap; background-color: #f7f7f7; padding: 15px; border-radius: 5px; border-left: 4px solid #2d5a27;">${message}</p>
		`;

		// If no Brevo API key is defined in environment, log to console for easy local development
		if (!brevoKey) {
			console.log('--------------------------------------------------');
			console.warn('[Development Mode] BREVO_API_KEY is not defined.');
			console.log('Email would have been sent to:', recipientEmail);
			console.log('Subject:', emailSubject);
			console.log('Content:', emailHtml.replace(/<[^>]*>/g, ' ').trim());
			console.log('--------------------------------------------------');

			// Simulate network latency in dev
			await new Promise((resolve) => setTimeout(resolve, 800));
			return { success: true, devMode: true };
		}

		try {
			const response = await fetch('https://api.brevo.com/v3/smtp/email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'api-key': brevoKey
				},
				body: JSON.stringify({
					sender: {
						name: 'Formularz Szanta',
						email: senderEmail
					},
					to: [
						{
							email: recipientEmail,
							name: 'Szanta Ogrody'
						}
					],
					replyTo: {
						email: email,
						name: name
					},
					subject: emailSubject,
					htmlContent: emailHtml
				})
			});

			if (!response.ok) {
				const errorDetails = await response.text();
				console.error('[Brevo Error] Failed to send email via Brevo:', errorDetails);
				return fail(500, {
					values: { name, email, phone, service, message },
					errors: { global: 'sendFailed' }
				});
			}

			console.log('[Email] Form inquiry successfully dispatched via Brevo.');
			return { success: true };
		} catch (error) {
			console.error('[Network Error] Failed to connect to Brevo API:', error);
			return fail(500, {
				values: { name, email, phone, service, message },
				errors: { global: 'sendFailed' }
			});
		}
	}
};
