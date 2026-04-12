import { Module } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { TelemetryController } from './telemetry.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AlertsModule } from 'src/alerts/alerts.module';


@Module({
  controllers: [TelemetryController],
  providers: [TelemetryService],
  imports: [PrismaModule, AlertsModule],
})
export class TelemetryModule { }
