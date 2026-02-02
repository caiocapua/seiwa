import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProducaoDto {
  @ApiProperty({
    description: 'ID do médico responsável',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4', { message: 'medicoId deve ser um UUID válido' })
  @IsNotEmpty({ message: 'medicoId é obrigatório' })
  medicoId: string;

  @ApiProperty({
    description: 'Nome do hospital',
    example: 'Hospital São Paulo',
  })
  @IsString()
  @IsNotEmpty({ message: 'Hospital é obrigatório' })
  hospital: string;

  @ApiProperty({ description: 'Valor da produção em reais', example: 1500.5 })
  @IsNumber({}, { message: 'Valor deve ser um número' })
  @IsPositive({ message: 'Valor deve ser maior que zero' })
  valor: number;

  @ApiProperty({ description: 'Data da produção', example: '2024-01-15' })
  @IsDateString({}, { message: 'Data deve ser uma data válida' })
  @IsNotEmpty({ message: 'Data é obrigatória' })
  data: string;

  @ApiPropertyOptional({
    description: 'Descrição do procedimento',
    example: 'Consulta cardiológica',
  })
  @IsString()
  @IsOptional()
  descricao?: string;
}
