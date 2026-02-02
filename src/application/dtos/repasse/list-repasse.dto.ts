import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { RepasseStatus } from '../../../domain/enums';
import { PaginationDto } from '../common';

export class ListRepasseDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filtrar por ID do médico',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4', { message: 'medicoId deve ser um UUID válido' })
  @IsOptional()
  medicoId?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por hospital',
    example: 'Hospital São Paulo',
  })
  @IsString()
  @IsOptional()
  hospital?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por status',
    enum: RepasseStatus,
    example: 'pendente',
  })
  @IsEnum(RepasseStatus, { message: 'Status inválido' })
  @IsOptional()
  status?: RepasseStatus;

  @ApiPropertyOptional({
    description: 'Data inicial do período',
    example: '2024-01-01',
  })
  @IsDateString({}, { message: 'dataInicio deve ser uma data válida' })
  @IsOptional()
  dataInicio?: string;

  @ApiPropertyOptional({
    description: 'Data final do período',
    example: '2024-12-31',
  })
  @IsDateString({}, { message: 'dataFim deve ser uma data válida' })
  @IsOptional()
  dataFim?: string;
}
