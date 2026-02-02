import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Repasse } from '../../../domain/entities';
import { RepasseStatus } from '../../../domain/enums';

export class RepasseOutputDto {
  @ApiProperty({
    description: 'ID único do repasse',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'ID do médico',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  medicoId: string;

  @ApiProperty({
    description: 'Nome do hospital',
    example: 'Hospital São Paulo',
  })
  hospital: string;

  @ApiProperty({ description: 'Valor do repasse em reais', example: 1200.0 })
  valor: number;

  @ApiProperty({ description: 'Data do repasse' })
  data: Date;

  @ApiProperty({
    description: 'Status do repasse',
    enum: RepasseStatus,
    example: 'pendente',
  })
  status: RepasseStatus;

  @ApiPropertyOptional({
    description: 'Descrição do repasse',
    example: 'Repasse referente a janeiro/2024',
  })
  descricao?: string;

  @ApiProperty({ description: 'Data de criação do registro' })
  createdAt: Date;

  static fromEntity(repasse: Repasse): RepasseOutputDto {
    const dto = new RepasseOutputDto();
    dto.id = repasse.id;
    dto.medicoId = repasse.medicoId;
    dto.hospital = repasse.hospital;
    dto.valor = repasse.valor;
    dto.data = repasse.data;
    dto.status = repasse.status;
    dto.descricao = repasse.descricao;
    dto.createdAt = repasse.createdAt;
    return dto;
  }
}
