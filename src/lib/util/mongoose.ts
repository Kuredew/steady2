import { type Types } from 'mongoose';

interface VercelBinaryId {
	buffer: Uint8Array | ArrayBuffer;
	toString(): string;
}

export type AcceptableIdInput = string | Types.ObjectId | VercelBinaryId | null | undefined;

export function castServerlessId(v: AcceptableIdInput): AcceptableIdInput {
	if (!v) {
		return v;
	}
	if (typeof v === 'object' && 'buffer' in v) {
		return v.toString();
	}
	return v;
}
