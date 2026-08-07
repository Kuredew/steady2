import { redirect, type Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { getAuth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { connectDatabase } from './config/database';

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	await connectDatabase();
	const auth = getAuth();
	const path = event.url.pathname;

	const isGuestPath = path === '/login' || path === '/register' || path === '/';

	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		if (isGuestPath) {
			throw redirect(303, '/dashboard');
		}

		event.locals.session = session.session;
		event.locals.user = session.user;
	} else if (!isGuestPath) {
		throw redirect(303, '/');
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = handleBetterAuth;
