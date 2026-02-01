import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetSaldoDto {
  @ApiProperty({ description: 'Data inicial do período', example: '2024-01-01' })
  @IsDateString({}, { message: 'dataInicio deve ser uma data válida' })
  @IsNotEmpty({ message: 'dataInicio é obrigatória' })
  dataInicio: string;

  @ApiProperty({ description: 'Data final do período', example: '2024-12-31' })
  @IsDateString({}, { message: 'dataFim deve ser uma data válida' })
  @IsNotEmpty({ message: 'dataFim é obrigatória' })
  dataFim: string;

  @ApiPropertyOptional({ description: 'Filtrar por hospital específico', example: 'Hospital São Paulo' })
  @IsString()
  @IsOptional()
  hospital?: string;
}
