import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';

@Controller('drones')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) { }
  /*
    @Post()
    create(@Param('droneId') droneId: string, @Body() createTelemetryDto: CreateTelemetryDto) {
      return this.telemetryService.create(droneId, createTelemetryDto);
    }
      
    for this method to work, in line 5, when we declare the controller, it would have to be 
    drones/:droneId/telemetry instead of just drones */


  @Post(':id/telemetry')
  create(
    @Param('id') droneId: string,
    @Body() dto: CreateTelemetryDto,
  ) {
    return this.telemetryService.create(droneId, dto);
  }

  @Get(':id/telemetry')
  findByDrone(@Param('id') droneId: string) {
    return this.telemetryService.findByDrone(droneId);
  }
}
