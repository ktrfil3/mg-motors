import { Controller, Get, Post, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common'
import { DealersService } from './dealers.service'
import { QueryDealersDto, CreateDealerDto } from './dto/dealer.dto'

@Controller('dealers')
export class DealersController {
  constructor(private readonly dealersService: DealersService) {}

  @Get()
  findAll(@Query() query: QueryDealersDto) {
    return this.dealersService.findAll(query)
  }

  @Get('states')
  getStates() {
    return this.dealersService.getStates()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.dealersService.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateDealerDto) {
    return this.dealersService.create(dto)
  }
}
