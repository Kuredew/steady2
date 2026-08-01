import { model, Schema, type InferSchemaType } from 'mongoose';

const goalSchema = new Schema({
	authorId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	checkoutsCount: {
		type: Number,
		required: true
	},
	maxCheckoutsCount: {
		type: Number,
		required: true
	},
	latestCheckoutsDate: {
		type: Date,
		required: true
	}
});

type IGoal = InferSchemaType<typeof goalSchema>;
export const GoalModel = model<IGoal>('Goal', goalSchema);
