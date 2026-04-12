import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {
  }

  async findByDrone(droneId: string) {
    return this.prisma.alert.findMany({
      where: { droneId },
      orderBy: { createdAt: 'desc' },
    });
  }


  async findAll() {
    return this.prisma.alert.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }


  async findOne(id: string) {
    return this.prisma.alert.findUnique({
      where: { id }
    });
  }

  async createHighSpeedAlert(droneId: string) {
    return this.prisma.alert.create({
      data: {
        droneId,
        type: 'SPEED',
        message: 'Speed is dangerously high',
        severity: 'HIGH',
      },
    });
  }

  async createLowSpeedAlert(droneId: string) {
    return this.prisma.alert.create({
      data: {
        droneId,
        type: 'SPEED',
        message: 'Speed is dangerously low',
        severity: 'MEDIUM',
      },
    });

  }

  async createHighAltitudeAlert(droneId: string) {
    return this.prisma.alert.create({
      data: {
        droneId,
        type: 'GEOFENCE',
        message: 'Altitude is dangerously high',
        severity: 'MEDIUM',
      },
    });
  }

  async createLowAltitudeAlert(droneId: string) {
    return this.prisma.alert.create({
      data: {
        droneId,
        type: 'GEOFENCE',
        message: 'Altitude is dangerously low',
        severity: 'HIGH',
      },
    });
  }

  async createOfflineAlert(droneId: string) {
    return this.prisma.alert.create({
      data: {
        droneId,
        type: 'OFFLINE',
        message: 'Drone is offline',
        severity: 'HIGH',
      },
    });
  }

}


