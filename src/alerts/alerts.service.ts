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
}


