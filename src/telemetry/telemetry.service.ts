import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TelemetryService {

  constructor(private prisma: PrismaService) { }


  async create(droneId: string, dto: CreateTelemetryDto) {
    // 1. guarantees that the drone exists
    const drone = await this.prisma.drone.findUnique({
      where: { id: droneId },
    });

    if (!drone) {
      throw new NotFoundException('Drone not found');
    }

    // 2. history (histórico)
    const telemetry = await this.prisma.telemetry.create({
      data: {
        droneId,
        ...dto,
      },
    });

    // 3.updates drone status
    await this.prisma.drone.update({
      where: { id: droneId },
      data: {
        lastSeen: new Date(),
        status: 'ONLINE',
      },
    });

    return telemetry;
  }

  async findByDrone(droneId: string) {
    return this.prisma.telemetry.findMany({
      where: { droneId },
      //orderBy: { createdAt: 'desc' },
    });
  }

}
