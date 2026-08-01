import { GoalModel } from '$lib/model/goal.model.js';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const user = event.locals.user;

	const goal = await GoalModel.findOne({ authorId: user?.id }).lean();

	if (goal) {
		console.log(`[new] user ${user?.id} redirected to dashboard`);
		throw redirect(303, '/dashboard');
	}

	const newGoal = new GoalModel({
		authorId: user?.id,
		checkoutsCount: 0,
		maxCheckoutsCount: 30,
		latestCheckoutsDate: new Date()
	});

	await newGoal.save();

	console.log(`[new] user ${user?.id} created new goal and redirected to dashboard`);
	throw redirect(303, '/dashboard');
};
