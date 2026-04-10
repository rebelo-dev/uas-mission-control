import { IsOptional, IsString, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

enum DroneStatus {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    MAINTENANCE = 'MAINTENANCE',
}

export class UpdateDroneDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name?: string;

    @IsOptional()
    @IsEnum(DroneStatus)
    status?: DroneStatus;
}