import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { DroneService } from './drone.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';

@Controller('drones')
export class DroneController {
    constructor(private readonly droneService: DroneService) { }

    @Get()
    findAll() {
        return this.droneService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.droneService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateDroneDto) {
        return this.droneService.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateDroneDto) {
        return this.droneService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.droneService.delete(id);
    }
}