import { Module } from '@nestjs/common';
import { DroneService } from './drone.service';
import { DroneController } from './drone.controller';

@Module({
  providers: [DroneService],
  controllers: [DroneController]
})
export class DroneModule {}
