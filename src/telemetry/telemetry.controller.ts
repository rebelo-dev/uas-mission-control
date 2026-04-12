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
//these routes are labeled as drones/id/telemetry, but they are actually still telemetry routes,
//as they are related to telemetry data and not drones themselves,
//since there is no route for drones/id, or just drones for a find all, there should be no conflict here.
//line 5, i labeled it as drones, but this only says, hey, the routes in this controller start with this prefix as well.