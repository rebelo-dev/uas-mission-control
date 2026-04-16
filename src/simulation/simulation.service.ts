import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelemetryService } from '../telemetry/telemetry.service';

@Injectable()
export class SimulationService {
    constructor(
        private prisma: PrismaService,
        private telemetryService: TelemetryService,
    ) { }

    private intervals = new Map<string, NodeJS.Timeout>();

    async stop(droneId: string) {
        const interval = this.intervals.get(droneId);
        if (interval) {
            clearInterval(interval);
            this.intervals.delete(droneId);
        }

        await this.prisma.drone.update({
            where: { id: droneId },
            data: {
                lastSeen: new Date(),
                status: 'OFFLINE',
            },
        });
    }

    async start(droneId: string) {
        if (this.intervals.has(droneId)) return;

        await this.prisma.drone.update({
            where: { id: droneId },
            data: { status: 'ONLINE' },
        });

        let speed = 0;

        const interval = setInterval(async () => {
            speed += 5;
            if (speed > 80) speed = 0;

            const telemetryData = {
                droneId: droneId,
                lat: 39.6 + Math.random() * 0.01,
                lng: -9.07 + Math.random() * 0.01,
                speed,
                altitude: 100 + Math.random() * 50,
            };

            try {
                await this.telemetryService.create(droneId, telemetryData);
                console.log(`Simulating ${droneId}`, telemetryData);
            } catch (e: any) {
                console.error(`Simulation error ${droneId}:`, e.message);
            }
        }, 5000);

        this.intervals.set(droneId, interval);
    }
}
