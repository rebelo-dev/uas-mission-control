import { PrismaClient, DroneStatus, AlertType, AlertSeverity } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
    }),
});

async function main() {
    const drone1 = await prisma.drone.create({
        data: {
            name: 'UAV-ALPHA',
            status: DroneStatus.ONLINE,
            lastSeen: new Date(),
        },
    });

    const drone2 = await prisma.drone.create({
        data: {
            name: 'UAV-BETA',
            status: DroneStatus.MAINTENANCE,
            lastSeen: new Date(),
        },
    });

    await prisma.telemetry.createMany({
        data: [
            {
                droneId: drone1.id,
                lat: 39.602,
                lng: -9.071,
                speed: 42,
                altitude: 120,
            },
            {
                droneId: drone1.id,
                lat: 39.603,
                lng: -9.072,
                speed: 44,
                altitude: 125,
            },
        ],
    });

    await prisma.alert.create({
        data: {
            droneId: drone1.id,
            type: AlertType.SPEED,
            severity: AlertSeverity.LOW,
            message: 'Speed threshold exceeded',
        },
    });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());