import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateRepasseDto {
  @ApiProperty({ description: 'ID do médico que receberá o repasse', example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID('4', { message: 'medicoId deve ser um UUID válido' })
  @IsNotEmpty({ message: 'medicoId é obrigatório' })
  medicoId: string;

  @ApiProperty({ description: 'Nome do hospital', example: 'Hospital São Paulo' })
  @IsString()
  @IsNotEmpty({ message: 'Hospital é obrigatório' })
  hospital: string;

  @ApiProperty({ description: 'Valor do repasse em reais', example: 1200.00 })
  @IsNumber({}, { message: 'Valor deve ser um número' })
  @IsPositive({ message: 'Valor deve ser maior que zero' })
  valor: number;

  @ApiProperty({ description: 'Data do repasse', example: '2024-01-20' })
  @IsDateString({}, { message: 'Data deve ser uma data válida' })
  @IsNotEmpty({ message: 'Data é obrigatória' })
  data: string;

  @ApiPropertyOptional({ description: 'Descrição do repasse', example: 'Repasse referente a janeiro/2024' })
  @IsString()
  @IsOptional()
  descricao?: string;
}
