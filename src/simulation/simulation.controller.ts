/*

import { Controller } from '@nestjs/common';
import { SimulationService } from './simulation.service';

@Controller('simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}
}
*/

// simulation.controller.ts

import { Controller, Post, Param } from '@nestjs/common';
import { SimulationService } from './simulation.service';

@Controller('simulate')
export class SimulationController {
  constructor(private readonly simulation: SimulationService) { }

  @Post(':id/start')
  start(@Param('id') id: string) {
    this.simulation.start(id);
    return { message: 'Simulation started' };
  }

  @Post(':id/stop')
  stop(@Param('id') id: string) {
    this.simulation.stop(id);
    return { message: 'Simulation stopped' };
  }
}