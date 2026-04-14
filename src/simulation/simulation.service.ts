import { Injectable } from '@nestjs/common';

@Injectable()
export class SimulationService {
    private intervals = new Map<string, NodeJS.Timeout>();

    start(droneId: string) {
        if (this.intervals.has(droneId)) return;

        let speed = 0;

        const interval = setInterval(async () => {
            speed += 5;
            if (speed > 100) speed = 0;

            const telemetry = {
                lat: 39.6 + Math.random() * 0.01,
                lng: -9.07 + Math.random() * 0.01,
                speed,
                altitude: 100 + Math.random() * 50,
            };

            await fetch(`http://localhost:3000/drones/${droneId}/telemetry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(telemetry),
            });

            console.log(`Simulating ${droneId}`, telemetry);
        }, 5000);

        this.intervals.set(droneId, interval);
    }

    stop(droneId: string) {
        const interval = this.intervals.get(droneId);
        if (interval) {
            clearInterval(interval);
            this.intervals.delete(droneId);
        }
    }
}