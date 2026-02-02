import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMedicoDto {
  @ApiPropertyOptional({
    description: 'Nome completo do médico',
    example: 'Dr. João Silva',
  })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiPropertyOptional({
    description: 'Especialidade médica',
    example: 'Cardiologia',
  })
  @IsString()
  @IsOptional()
  especialidade?: string;
}
