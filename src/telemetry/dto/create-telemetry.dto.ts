import { IsNumber, IsOptional } from 'class-validator';

export class CreateTelemetryDto {
    @IsNumber()
    lat!: number;

    @IsNumber()
    lng!: number;

    @IsNumber()
    speed!: number;

    @IsOptional()
    @IsNumber()
    altitude?: number;
}