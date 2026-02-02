import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResultDto<T> {
  @ApiProperty({ description: 'Lista de itens' })
  data: T[];

  @ApiProperty({ description: 'Total de itens', example: 100 })
  total: number;

  @ApiProperty({ description: 'Página atual', example: 1 })
  page: number;

  @ApiProperty({ description: 'Itens por página', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Total de páginas', example: 10 })
  totalPages: number;

  static create<T>(params: {
    data: T[];
    total: number;
    page: number;
    limit: number;
  }): PaginatedResultDto<T> {
    const result = new PaginatedResultDto<T>();
    result.data = params.data;
    result.total = params.total;
    result.page = params.page;
    result.limit = params.limit;
    result.totalPages = Math.ceil(params.total / params.limit);
    return result;
  }
}
