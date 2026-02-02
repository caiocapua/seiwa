import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Producao } from '../../../domain/entities';

export class ProducaoOutputDto {
  @ApiProperty({
    description: 'ID único da produção',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'ID do médico responsável',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  medicoId: string;

  @ApiProperty({
    description: 'Nome do hospital',
    example: 'Hospital São Paulo',
  })
  hospital: string;

  @ApiProperty({ description: 'Valor da produção em reais', example: 1500.5 })
  valor: number;

  @ApiProperty({ description: 'Data da produção' })
  data: Date;

  @ApiPropertyOptional({
    description: 'Descrição do procedimento',
    example: 'Consulta cardiológica',
  })
  descricao?: string;

  @ApiProperty({ description: 'Data de criação do registro' })
  createdAt: Date;

  static fromEntity(producao: Producao): ProducaoOutputDto {
    const dto = new ProducaoOutputDto();
    dto.id = producao.id;
    dto.medicoId = producao.medicoId;
    dto.hospital = producao.hospital;
    dto.valor = producao.valor;
    dto.data = producao.data;
    dto.descricao = producao.descricao;
    dto.createdAt = producao.createdAt;
    return dto;
  }
}
