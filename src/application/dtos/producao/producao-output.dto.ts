import { Producao } from '../../../domain/entities';

export class ProducaoOutputDto {
  id: string;
  medicoId: string;
  hospital: string;
  valor: number;
  data: Date;
  descricao?: string;
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
