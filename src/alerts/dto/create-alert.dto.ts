import { IsEnum, IsString } from 'class-validator';
import { AlertType, AlertSeverity } from '@prisma/client';

export class CreateAlertDto {
    @IsEnum(AlertType)
    type!: AlertType;
    @IsString()
    message!: String;
    @IsEnum(AlertSeverity)
    severity!: AlertSeverity;
}

// this was made only as an exercise, this is not used in the current implementation, 
// DTO reference for manual posts