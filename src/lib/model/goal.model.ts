import { castServerlessId } from '$lib/util/mongoose';
import { model, Schema, type InferSchemaType } from 'mongoose';

const goalSchema = new Schema(
	{
		authorId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			set: castServerlessId
		},
		maxCheckoutsCount: {
			type: Number,
			required: true
		},
		latestCheckoutsDate: {
			type: Date,
			required: true
		}
	},
	{
		timestamps: true
	}
);

type IGoal = InferSchemaType<typeof goalSchema>;
export const GoalModel = model<IGoal>('Goal', goalSchema);
