import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SaldoOutputDto {
  @ApiProperty({
    description: 'ID do médico',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  medicoId: string;

  @ApiProperty({ description: 'Nome do médico', example: 'Dr. João Silva' })
  medicoNome: string;

  @ApiProperty({ description: 'Data inicial do período consultado' })
  dataInicio: Date;

  @ApiProperty({ description: 'Data final do período consultado' })
  dataFim: Date;

  @ApiPropertyOptional({
    description: 'Hospital filtrado (se especificado)',
    example: 'Hospital São Paulo',
  })
  hospital?: string;

  @ApiProperty({
    description: 'Total de produções no período em reais',
    example: 5000.0,
  })
  totalProducoes: number;

  @ApiProperty({
    description: 'Total de repasses processados no período em reais',
    example: 3000.0,
  })
  totalRepasses: number;

  @ApiProperty({
    description:
      'Saldo (produções - repasses). Positivo = a receber, Negativo = adiantamento',
    example: 2000.0,
  })
  saldo: number;

  static create(params: {
    medicoId: string;
    medicoNome: string;
    dataInicio: Date;
    dataFim: Date;
    hospital?: string;
    totalProducoes: number;
    totalRepasses: number;
  }): SaldoOutputDto {
    const dto = new SaldoOutputDto();
    dto.medicoId = params.medicoId;
    dto.medicoNome = params.medicoNome;
    dto.dataInicio = params.dataInicio;
    dto.dataFim = params.dataFim;
    dto.hospital = params.hospital;
    dto.totalProducoes = params.totalProducoes;
    dto.totalRepasses = params.totalRepasses;
    dto.saldo = params.totalProducoes - params.totalRepasses;
    return dto;
  }
}
