import { Controller, Get } from '@nestjs/common';
import { DroneService } from './drone.service';

@Controller('drones')
export class DroneController {
    constructor(private readonly droneService: DroneService) { }

    @Get()
    findAll() {
        return this.droneService.findAll();
    }
}