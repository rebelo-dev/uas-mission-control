import { IsOptional, IsString, IsEnum } from 'class-validator';

enum DroneStatus {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    MAINTENANCE = 'MAINTENANCE',
}

export class UpdateDroneDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(DroneStatus)
    status?: DroneStatus;
}