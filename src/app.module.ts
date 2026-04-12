import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DroneModule } from './drone/drone.module';
import { TelemetryModule } from './telemetry/telemetry.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [PrismaModule, DroneModule, TelemetryModule, AlertsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
