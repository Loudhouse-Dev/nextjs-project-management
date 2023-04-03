//This file allows us to persist a DB connection without constantly reconnection
import { PrismaClient } from '@prisma/client';

//set cachedPrisma as a global variable
declare global {
	var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.cachedPrisma) {
		global.cachedPrisma = new PrismaClient();
	}
	prisma = global.cachedPrisma;
}

export const db = prisma;
