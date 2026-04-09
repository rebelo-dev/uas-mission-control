-- CreateEnum
CREATE TYPE "DroneStatus" AS ENUM ('ONLINE', 'OFFLINE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('SPEED', 'GEOFENCE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "AlertSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Drone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "DroneStatus" NOT NULL,
    "lastSeen" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Drone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telemetry" (
    "id" TEXT NOT NULL,
    "droneId" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "altitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Telemetry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "droneId" TEXT NOT NULL,
    "type" "AlertType" NOT NULL,
    "message" TEXT NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Telemetry" ADD CONSTRAINT "Telemetry_droneId_fkey" FOREIGN KEY ("droneId") REFERENCES "Drone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_droneId_fkey" FOREIGN KEY ("droneId") REFERENCES "Drone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
