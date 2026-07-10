<script lang="ts">
	import { common } from '$lib/lang/pl/common';
	import { contact } from '$lib/lang/pl/contact';
	import { services } from '$lib/lang/pl/services';
	import { enhance } from '$app/forms';
	import { fade, slide, fly } from 'svelte/transition';
	import Button from './Button.svelte';
	import {
		Phone,
		Mail,
		MapPin,
		Clock,
		ChevronDown,
		CheckCircle2,
		CircleAlert,
		PenTool,
		Sprout,
		Scissors,
		Droplets,
		Hammer
	} from 'lucide-svelte';

	const iconMap: Record<string, any> = {
		PenTool,
		Sprout,
		Scissors,
		Droplets,
		Hammer
	};

	let { form } = $props<{ form: any }>();

	// Form values state
	let values = $state({
		name: '',
		email: '',
		phone: '',
		message: ''
	});

	let selectedServiceId = $state('');
	let selectedService = $derived(services.list.find((s) => s.id === selectedServiceId) || null);

	// Focus states for floating labels
	let focused = $state({
		name: false,
		email: false,
		phone: false,
		message: false
	});

	// Dropdown states
	let isDropdownOpen = $state(false);
	let dropdownRef = $state<HTMLElement | null>(null);

	// Extract initial form state values
	// svelte-ignore state_referenced_locally
	const initialSuccess = form?.success || false;
	// svelte-ignore state_referenced_locally
	const initialErrors = form?.errors || {};

	// Async state
	let isSubmitting = $state(false);
	let isSuccess = $state(initialSuccess);
	let serverErrors = $state<Record<string, string>>(initialErrors);

	// Reset form action
	function handleReset() {
		values = { name: '', email: '', phone: '', message: '' };
		selectedServiceId = '';
		isSuccess = false;
		serverErrors = {};
	}

	// Close dropdown when clicking outside
	function handleWindowClick(e: MouseEvent) {
		if (isDropdownOpen && dropdownRef && !dropdownRef.contains(e.target as Node)) {
			isDropdownOpen = false;
		}
	}

	// Dynamic Lucide icon getter
	function getServiceIcon(iconName: string) {
		return iconMap[iconName] || Sprout;
	}
</script>

<svelte:window onclick={handleWindowClick} />

<section id="kontakt" class="relative overflow-hidden bg-gray-50 py-24">
	<!-- Decorative background organic shapes -->
	<div class="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-(--forest-green)/5 blur-3xl"></div>
	<div class="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-(--forest-green)/5 blur-3xl"></div>

	<div class="container mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-extrabold tracking-tight text-(--forest-green) sm:text-5xl">
				{contact.title}
			</h2>
			<p class="mx-auto max-w-2xl text-base text-(--text-muted)">
				{contact.subtitle}
			</p>
			<div class="mx-auto mt-4 h-1 w-24 rounded bg-(--forest-green)"></div>
		</div>

		<!-- Main Grid -->
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
			<!-- Left Column: Info Cards -->
			<div class="space-y-6 lg:col-span-5">
				<!-- Elegant Sidebar Container -->
				<div class="rounded-3xl bg-linear-to-br from-(--forest-green) to-(--forest-green-dark) p-8 text-white shadow-2xl transition-transform duration-500 hover:scale-[1.01] lg:p-10">
					<h3 class="mb-4 text-2xl font-bold tracking-tight">{contact.info.title}</h3>
					<p class="mb-8 text-white/80 leading-relaxed">{contact.info.subtitle}</p>

					<!-- Info Cards List -->
					<div class="space-y-6">
						<!-- Phone -->
						<a
							href="tel:{common.company.phone.replace(/\s+/g, '')}"
							class="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:bg-white/10 hover:border-white/20"
						>
							<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-transform group-hover:scale-110">
								<Phone size={22} />
							</div>
							<div>
								<span class="block text-xs font-bold text-white/50 uppercase tracking-widest">{contact.info.phoneLabel}</span>
								<span class="block text-lg font-semibold tracking-wide">{common.company.phoneFormatted}</span>
							</div>
						</a>

						<!-- Email -->
						<a
							href="mailto:{common.company.email}"
							class="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:bg-white/10 hover:border-white/20"
						>
							<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-transform group-hover:scale-110">
								<Mail size={22} />
							</div>
							<div class="min-w-0">
								<span class="block text-xs font-bold text-white/50 uppercase tracking-widest">{contact.info.emailLabel}</span>
								<span class="block truncate text-lg font-semibold tracking-wide">{common.company.email}</span>
							</div>
						</a>

						<!-- Address -->
						<div class="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-4">
							<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
								<MapPin size={22} />
							</div>
							<div>
								<span class="block text-xs font-bold text-white/50 uppercase tracking-widest">{contact.info.addressLabel}</span>
								<span class="block text-lg font-semibold tracking-wide">{common.company.address}</span>
							</div>
						</div>

						<!-- Hours -->
						<div class="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-4">
							<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
								<Clock size={22} />
							</div>
							<div class="w-full">
								<span class="block text-xs font-bold text-white/50 uppercase tracking-widest">{contact.info.hoursLabel}</span>
								<div class="mt-1 space-y-1 text-sm font-medium">
									{#each common.company.hoursList as item (item.days)}
										<div class="flex justify-between gap-2 text-white/90">
											<span>{item.days}</span>
											<span class="font-semibold">{item.time}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Column: Interactive Form Card -->
			<div class="lg:col-span-7">
				<div class="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl sm:p-10 lg:min-h-[550px]">
					{#key isSuccess}
						{#if isSuccess}
							<!-- Success State Grid -->
							<div
								class="flex h-full min-h-[450px] flex-col items-center justify-center text-center"
								in:fade={{ duration: 400 }}
							>
								<div class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-inner">
									<CheckCircle2 size={48} />
								</div>
								<h3 class="mb-4 text-3xl font-bold text-(--text-dark)">
									{contact.form.successTitle}
								</h3>
								<p class="mb-8 max-w-md text-lg text-(--text-muted) leading-relaxed">
									{contact.form.successMessage}
								</p>
								<Button
									onclick={handleReset}
									class="px-8 py-3.5 text-sm"
								>
									{contact.form.sendAnother}
								</Button>
							</div>
						{:else}
							<!-- Contact Form State -->
							<div in:fade={{ duration: 350 }}>
								<!-- Global Server Error Display -->
								{#if serverErrors.global}
									<div class="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-700 border border-red-100" transition:slide>
										<CircleAlert size={20} class="shrink-0" />
										<p class="text-sm font-semibold">{contact.form.errors[serverErrors.global as keyof typeof contact.form.errors] || contact.form.errors.sendFailed}</p>
									</div>
								{/if}

								<form
									method="POST"
									use:enhance={() => {
										isSubmitting = true;
										serverErrors = {};
										return async ({ result }) => {
											isSubmitting = false;
											if (result.type === 'success') {
												isSuccess = true;
												serverErrors = {};
											} else if (result.type === 'failure') {
												serverErrors = (result as any).data?.errors || {};
											} else if (result.type === 'error') {
												serverErrors = { global: 'sendFailed' };
											}
										};
									}}
									class="space-y-6"
								>
									<!-- Honeypot (Security field for spam-bot prevention) -->
									<input
										type="text"
										name="b_phone"
										style="display: none;"
										tabindex="-1"
										autocomplete="off"
									/>

									<!-- Two Column Grid for Name and Email -->
									<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
										<!-- Input Name -->
										<div class="relative rounded-2xl border {serverErrors.name ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus-within:border-(--forest-green)'} bg-white px-4 pt-5 pb-1.5 transition-colors duration-300">
											<label
												for="name"
												class="absolute left-4 top-1.5 origin-top-left pointer-events-none transition duration-300 ease-out text-xs font-bold
													{focused.name || values.name
													? 'text-(--forest-green) translate-y-0 scale-100'
													: 'text-gray-400 translate-y-[10px] scale-[1.333]'}"
											>
												{contact.form.nameLabel}
											</label>
											<input
												id="name"
												name="name"
												type="text"
												required
												bind:value={values.name}
												onfocus={() => (focused.name = true)}
												onblur={() => (focused.name = false)}
												class="w-full border-none p-0 text-base font-semibold text-(--text-dark) bg-transparent focus:outline-hidden focus:ring-0"
												placeholder={focused.name ? contact.form.namePlaceholder : ''}
											/>
											{#if serverErrors.name}
												<span class="absolute bottom-[-22px] left-1 text-[11px] font-bold text-red-500" transition:slide>
													{contact.form.errors.nameRequired}
												</span>
											{/if}
										</div>

										<!-- Input Email -->
										<div class="relative rounded-2xl border {serverErrors.email ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus-within:border-(--forest-green)'} bg-white px-4 pt-5 pb-1.5 transition-colors duration-300">
											<label
												for="email"
												class="absolute left-4 top-1.5 origin-top-left pointer-events-none transition duration-300 ease-out text-xs font-bold
													{focused.email || values.email
													? 'text-(--forest-green) translate-y-0 scale-100'
													: 'text-gray-400 translate-y-[10px] scale-[1.333]'}"
											>
												{contact.form.emailLabel}
											</label>
											<input
												id="email"
												name="email"
												type="email"
												required
												bind:value={values.email}
												onfocus={() => (focused.email = true)}
												onblur={() => (focused.email = false)}
												class="w-full border-none p-0 text-base font-semibold text-(--text-dark) bg-transparent focus:outline-hidden focus:ring-0"
												placeholder={focused.email ? contact.form.emailPlaceholder : ''}
											/>
											{#if serverErrors.email}
												<span class="absolute bottom-[-22px] left-1 text-[11px] font-bold text-red-500" transition:slide>
													{contact.form.errors[serverErrors.email as keyof typeof contact.form.errors] || contact.form.errors.emailRequired}
												</span>
											{/if}
										</div>
									</div>

									<!-- Input Phone -->
									<div class="relative rounded-2xl border {serverErrors.phone ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus-within:border-(--forest-green)'} bg-white px-4 pt-5 pb-1.5 transition-colors duration-300">
										<label
											for="phone"
											class="absolute left-4 top-1.5 origin-top-left pointer-events-none transition duration-300 ease-out text-xs font-bold
												{focused.phone || values.phone
												? 'text-(--forest-green) translate-y-0 scale-100'
												: 'text-gray-400 translate-y-[10px] scale-[1.333]'}"
										>
											{contact.form.phoneLabel}
										</label>
										<input
											id="phone"
											name="phone"
											type="tel"
											bind:value={values.phone}
											onfocus={() => (focused.phone = true)}
											onblur={() => (focused.phone = false)}
											class="w-full border-none p-0 text-base font-semibold text-(--text-dark) bg-transparent focus:outline-hidden focus:ring-0"
											placeholder={focused.phone ? contact.form.phonePlaceholder : ''}
										/>
										{#if serverErrors.phone}
											<span class="absolute bottom-[-22px] left-1 text-[11px] font-bold text-red-500" transition:slide>
												{contact.form.errors.phoneInvalid}
											</span>
										{/if}
									</div>

									<!-- Custom Service Dropdown Section -->
									<div class="relative" bind:this={dropdownRef}>
										<label for="service-btn" class="mb-2 block text-sm font-bold text-gray-500">
											{contact.form.serviceLabel}
										</label>

										<!-- Selected Service Face Button -->
										<button
											id="service-btn"
											type="button"
											onclick={() => (isDropdownOpen = !isDropdownOpen)}
											class="flex w-full items-center justify-between rounded-2xl border {serverErrors.service ? 'border-red-500 bg-red-50/5' : 'border-gray-200 focus:border-(--forest-green)'} bg-white px-5 py-4 text-left font-semibold text-(--text-dark) shadow-xs transition-colors duration-300"
										>
											{#if selectedService}
												{@const IconCmp = getServiceIcon(selectedService.icon)}
												<span class="flex items-center gap-3">
													<IconCmp size={18} class="text-(--forest-green)" />
													{selectedService.title}
												</span>
											{:else}
												<span class="text-gray-400 font-medium">{contact.form.servicePlaceholder}</span>
											{/if}
											<ChevronDown
												size={20}
												class="text-gray-400 transition-transform duration-300 {isDropdownOpen ? 'rotate-180' : ''}"
											/>
										</button>

										<!-- Hidden input for SvelteKit server action submission -->
										<input type="hidden" name="service" value={selectedServiceId} />

										{#if serverErrors.service}
											<span class="absolute bottom-[-20px] left-1 text-[11px] font-bold text-red-500" transition:slide>
												{contact.form.errors.serviceRequired}
											</span>
										{/if}

										<!-- Dropdown Drawer Panel -->
										{#if isDropdownOpen}
											<div
												class="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl"
												transition:slide={{ duration: 250 }}
											>
												<ul class="space-y-1">
													{#each services.list as service (service.id)}
														{@const IconCmp = getServiceIcon(service.icon)}
														<li>
															<button
																type="button"
																onclick={() => {
																	selectedServiceId = service.id;
																	isDropdownOpen = false;
																}}
																class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold transition-colors duration-200 hover:bg-(--forest-green)/5
																	{selectedServiceId === service.id
																	? 'bg-(--forest-green)/10 text-(--forest-green)'
																	: 'text-(--text-dark)'}"
															>
																<IconCmp size={18} class={selectedServiceId === service.id ? 'text-(--forest-green)' : 'text-gray-400'} />
																{service.title}
															</button>
														</li>
													{/each}
												</ul>
											</div>
										{/if}
									</div>

									<!-- Input Message -->
									<div class="relative mt-8 rounded-2xl border {serverErrors.message ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus-within:border-(--forest-green)'} bg-white px-4 pt-5 pb-2 transition-colors duration-300">
										<label
											for="message"
											class="absolute left-4 top-1.5 origin-top-left pointer-events-none transition duration-300 ease-out text-xs font-bold
												{focused.message || values.message
												? 'text-(--forest-green) translate-y-0 scale-100'
												: 'text-gray-400 translate-y-[12px] scale-[1.333]'}"
										>
											{contact.form.messageLabel}
										</label>
										<textarea
											id="message"
											name="message"
											required
											rows="4"
											bind:value={values.message}
											onfocus={() => (focused.message = true)}
											onblur={() => (focused.message = false)}
											class="w-full resize-none border-none p-0 text-base font-semibold text-(--text-dark) bg-transparent focus:outline-hidden focus:ring-0"
											placeholder={focused.message ? contact.form.messagePlaceholder : ''}
										></textarea>
										{#if serverErrors.message}
											<span class="absolute bottom-[-22px] left-1 text-[11px] font-bold text-red-500" transition:slide>
												{contact.form.errors.messageRequired}
											</span>
										{/if}
									</div>

									<!-- Submit Button -->
									<div class="pt-4">
										<Button
											type="submit"
											disabled={isSubmitting}
											class="flex w-full items-center justify-center gap-3 py-4.5 text-base disabled:opacity-70 disabled:cursor-not-allowed"
										>
											{#if isSubmitting}
												<!-- Loading Spinner -->
												<div class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
												<span>{contact.form.submitting}</span>
											{:else}
												<span>{contact.form.submitButton}</span>
											{/if}
										</Button>
									</div>
								</form>
							</div>
						{/if}
					{/key}
				</div>
			</div>
		</div>
	</div>
</section>
