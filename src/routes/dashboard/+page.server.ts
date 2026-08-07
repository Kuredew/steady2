import { GoalModel } from '$lib/model/goal.model.js';
import { getAuth } from '$lib/server/auth.js';
import { calculateManyDays, isYesterdayOrMore } from '$lib/util/date.js';
import { serializeNonPOJOs } from '$lib/util/serialize.js';
import { fail, redirect } from '@sveltejs/kit';

export const load = async (event) => {
	let quote = 'The only true wisdom is in knowing you know nothing.';
	const user = event.locals.user;

	const goal = await GoalModel.findOne({ authorId: user?.id }).lean();

	if (!goal) {
		throw redirect(303, '/dashboard/new');
	}

	try {
		const res = await fetch('https://zenquotes.io/api/today', {
			method: 'get'
		});
		const resJson = await res.json();

		quote = resJson[0].q;
	} catch {
		console.log('Fetching quote failed');
	}

	let canCheckout = false;
	let manyDays = calculateManyDays(goal.createdAt, new Date());
	if (isYesterdayOrMore(goal.latestCheckoutsDate)) {
		canCheckout = true;
		manyDays--;
	}

	return { user: event.locals.user, quote, goal: serializeNonPOJOs(goal), canCheckout, manyDays };
};

export const actions = {
	checkouts: async (event) => {
		const user = event.locals.user;
		const formData = await event.request.formData();
		const canCheckout = formData.get('can_checkout')?.toString() ?? '';

		if (canCheckout === 'no' || !canCheckout) {
			return fail(400, {
				message: 'CANNOT CHECKOUT'
			});
		}

		try {
			const goal = await GoalModel.findOne({ authorId: user?.id });

			if (!goal)
				return fail(400, {
					message: 'Data not found'
				});

			goal.latestCheckoutsDate = new Date();
			await goal.save();

			return { success: true, message: 'Success' };
		} catch (e) {
			return fail(500, { message: String(e) });
		}
	},
	finish: async (event) => {
		const user = event.locals.user;
		const auth = getAuth();
		try {
			await GoalModel.findOneAndDelete({ authorId: user?.id });
			await auth.api.deleteUser({ headers: event.request.headers, body: {} });
		} catch (e) {
			return { success: false, message: String(e) };
		}
	},
	continue: async (event) => {
		const user = event.locals.user;
		try {
			const goal = await GoalModel.findOne({ authorId: user?.id });
			if (!goal)
				return fail(400, {
					message: 'Data not found'
				});

			goal.maxCheckoutsCount = goal.maxCheckoutsCount + 30;
			await goal.save();

			return { success: true, message: 'Data updated' };
		} catch (e) {
			return fail(500, { message: String(e) });
		}
	},
	reset: async (event) => {
		const user = event.locals.user;

		try {
			const goal = await GoalModel.findOne({ authorId: user?.id });
			if (!goal)
				return fail(400, {
					message: 'Data not found'
				});

			// goal.checkoutsCount = 0;
			await goal.save();

			return { success: true, message: 'Data resetted' };
		} catch (e) {
			return fail(500, { message: String(e) });
		}
	}
};
