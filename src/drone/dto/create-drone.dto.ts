import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDroneDto {
    @IsString()
    @IsNotEmpty()
    name!: string;
}