import { Controller, Get, Param, Query } from '@nestjs/common'
import { OffersService, QueryOffersDto } from './offers.service'

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  findAll(@Query() query: QueryOffersDto) {
    return this.offersService.findAll(query)
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.offersService.findById(id)
  }
}
