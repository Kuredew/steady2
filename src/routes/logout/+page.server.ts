import { getAuth } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const auth = getAuth();

	await auth.api.signOut({
		headers: event.request.headers
	});
	return redirect(302, '/login');
};
