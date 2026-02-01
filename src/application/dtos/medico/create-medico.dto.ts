import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMedicoDto {
  @ApiProperty({ description: 'Nome completo do médico', example: 'Dr. João Silva' })
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @ApiProperty({ description: 'Número do CRM (deve ser único)', example: '12345-SP' })
  @IsString()
  @IsNotEmpty({ message: 'CRM é obrigatório' })
  crm: string;

  @ApiPropertyOptional({ description: 'Especialidade médica', example: 'Cardiologia' })
  @IsString()
  @IsOptional()
  especialidade?: string;
}
