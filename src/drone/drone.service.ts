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

    async create(data: { name: string }) {
        return this.prisma.drone.create({
            data: {
                name: data.name,
                status: 'OFFLINE',
                lastSeen: new Date(),
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.drone.findUnique({
            where: { id },
            include: {
                telemetry: true,
                alerts: true,
            },

        });
    }

    async update(id: string, data: any) {
        return this.prisma.drone.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        return this.prisma.drone.delete({
            where: { id },
        });
    }
}