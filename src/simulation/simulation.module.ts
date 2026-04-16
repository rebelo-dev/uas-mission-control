import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SimulationController } from './simulation.controller';
import { TelemetryModule } from '../telemetry/telemetry.module';

@Module({
  controllers: [SimulationController],
  providers: [SimulationService],
  imports: [TelemetryModule],
})
export class SimulationModule { }
