import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateDroneDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name!: string;
}