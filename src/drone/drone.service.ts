import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DroneService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.drone.findMany({
            include: {
                telemetry: true,
                alerts: true,
            },
        });
    }
}