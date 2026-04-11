import { Module } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { TelemetryController } from './telemetry.controller';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  controllers: [TelemetryController],
  providers: [TelemetryService],
  imports: [PrismaModule],
})
export class TelemetryModule { }
