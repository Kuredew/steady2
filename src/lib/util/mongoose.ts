import type { Types } from 'mongoose';

interface VercelBinaryId {
	buffer: Uint8Array | ArrayBuffer;
}

export type AcceptableIdInput = string | Types.ObjectId | VercelBinaryId | null | undefined;
export type StrictMongooseIdOutput = string | Types.ObjectId | null | undefined;

export function castServerlessId(v: AcceptableIdInput): StrictMongooseIdOutput {
	if (!v) {
		return v as null | undefined;
	}

	if (typeof v === 'object' && 'buffer' in v) {
		const rawBuffer = v.buffer;

		if (rawBuffer instanceof Uint8Array) {
			return Buffer.from(rawBuffer).toString('hex');
		}

		if (rawBuffer instanceof ArrayBuffer) {
			return Buffer.from(new Uint8Array(rawBuffer)).toString('hex');
		}
	}

	return v as string | Types.ObjectId;
}
