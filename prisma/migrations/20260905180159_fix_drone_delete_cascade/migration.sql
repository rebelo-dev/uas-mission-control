-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_droneId_fkey";

-- DropForeignKey
ALTER TABLE "Telemetry" DROP CONSTRAINT "Telemetry_droneId_fkey";

-- AddForeignKey
ALTER TABLE "Telemetry" ADD CONSTRAINT "Telemetry_droneId_fkey" FOREIGN KEY ("droneId") REFERENCES "Drone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_droneId_fkey" FOREIGN KEY ("droneId") REFERENCES "Drone"("id") ON DELETE CASCADE ON UPDATE CASCADE;
