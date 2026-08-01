import { MONGO_URI } from '$env/static/private';
import mongoose from 'mongoose';

let isConnected = false;
export const connectDatabase = async () => {
	try {
		if (isConnected) return;

		await mongoose.connect(MONGO_URI, { dbName: 'steady2' });

		isConnected = true;
		console.log('Database terhubung!');
	} catch (e) {
		console.error('Terjadi masalah saat mencoba menghubungkan ke database: ' + String(e));
	}
};
