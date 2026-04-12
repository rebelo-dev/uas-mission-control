import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AlertsService } from 'src/alerts/alerts.service';

@Injectable()
export class TelemetryService {

  constructor(
    private prisma: PrismaService,
    private alertService: AlertsService,
  ) { }


  async create(droneId: string, dto: CreateTelemetryDto) {
    // guarantees that the drone exists
    const drone = await this.prisma.drone.findUnique({
      where: { id: droneId },
    });

    if (!drone) {
      throw new NotFoundException('Drone not found');
    }

    // history (histórico)
    const telemetry = await this.prisma.telemetry.create({
      data: {
        droneId,
        ...dto,
      },
    });

    // updates drone status
    await this.prisma.drone.update({
      where: { id: droneId },
      data: {
        lastSeen: new Date(),
        status: 'ONLINE',
      },
    });


    // dangerous speed - no undefined check because speed is reset as 0 in the simulator once we get 100 speed
    if (dto.speed > 80) {
      await this.alertService.createHighSpeedAlert(droneId);
    } else if (dto.speed < 5) {
      await this.alertService.createLowSpeedAlert(droneId);
    }


    // dangerous altitude - this type is defined as geofence por simplicity.
    if (dto.altitude !== undefined && dto.altitude > 500) {
      await this.alertService.createHighAltitudeAlert(droneId);
    } else if (dto.altitude !== undefined && dto.altitude < 100) {
      await this.alertService.createLowAltitudeAlert(droneId);
    }

    // OFFLINE alert (to do)  


    /*

    BEFORE IMPLEMENTING THE ALERT SERVICE, I WAS CREATING THE ALERTS DIRECTLY 
    
    Before implementing alert service, i was creating the alerts directly 
    from the telemetry module, this is the original code for reference:

    Now that there is an alert service, this logic can be moved for 
    scalability and maintanibility


        // dangerous speed
        if (dto.speed > 80) {
          await this.prisma.alert.create({
            data: {
              droneId,
              type: 'SPEED',
              message: 'Speed exceeded',
              severity: 'HIGH',
            },
          });
        }
    
        // drone is too slow
        if (dto.speed < 5) {
          await this.prisma.alert.create({
            data: {
              droneId,
              type: 'SPEED',
              message: 'Drone speed is too low, possibly stalled',
              severity: 'MEDIUM',
            },
          });
        }
    
        // dangerous altitude - the type is defined as geofence for practical terms (geofence is a perimeter for longitude and altitude, but im including altitude as well just for simplicity, in a 3d space, this would make more sense)
        if (dto.altitude && dto.altitude > 500) {
          await this.prisma.alert.create({
            data: {
              droneId,
              type: 'GEOFENCE',
              message: 'Altitude too high',
              severity: 'MEDIUM',
            },
          });
        }
    
        // dangerous altitude - the type is defined as geofence for practical terms (geofence is a perimeter for longitude and altitude, but im including altitude as well just for simplicity, in a 3d space, this would make more sense)
        if (dto.altitude !== undefined && dto.altitude < 100) {
          await this.prisma.alert.create({
            data: {
              droneId,
              type: 'GEOFENCE',
              message: 'Altitude too low',
              severity: 'MEDIUM',
            },
          });
        }
    
        // OFFLINE alert (to do)
    
    
        // These alert rules are examples as proof of concept, they work as an event drive system, it receives data, processes it and produces a response by creating an alert (via prisma)
        */
    return telemetry;
  }

  async findByDrone(droneId: string) {
    return this.prisma.telemetry.findMany({
      where: { droneId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
