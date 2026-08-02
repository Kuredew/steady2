import { env } from '$env/dynamic/private';
import { betterAuth, type BetterAuthOptions } from 'better-auth/minimal';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { getRequestEvent } from '$app/server';
import mongoose from 'mongoose';

let auth: ReturnType<typeof betterAuth> | null = null;

export const getAuth = () => {
	if (auth) return auth;
	const client = mongoose.connection.getClient();
	const db = client.db('steady2');

	const config: BetterAuthOptions = {
		baseURL: env.ORIGIN,
		secret: env.BETTER_AUTH_SECRET,
		database: mongodbAdapter(db, { client }),
		emailAndPassword: { enabled: true },
		advanced: {
			database: {
				generateId: false
			}
		},
		user: {
			deleteUser: {
				enabled: true
			}
		},
		plugins: [
			sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
		]
	};

	auth = betterAuth(config);
	return auth;
};
