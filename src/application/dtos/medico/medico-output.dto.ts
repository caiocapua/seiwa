import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Medico } from '../../../domain/entities';

export class MedicoOutputDto {
  @ApiProperty({ description: 'ID único do médico', example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ description: 'Nome completo do médico', example: 'Dr. João Silva' })
  nome: string;

  @ApiProperty({ description: 'Número do CRM', example: '12345-SP' })
  crm: string;

  @ApiPropertyOptional({ description: 'Especialidade médica', example: 'Cardiologia' })
  especialidade?: string;

  @ApiProperty({ description: 'Data de criação do registro' })
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização' })
  updatedAt: Date;

  static fromEntity(medico: Medico): MedicoOutputDto {
    const dto = new MedicoOutputDto();
    dto.id = medico.id;
    dto.nome = medico.nome;
    dto.crm = medico.crm;
    dto.especialidade = medico.especialidade;
    dto.createdAt = medico.createdAt;
    dto.updatedAt = medico.updatedAt;
    return dto;
  }
}
