export class SaldoOutputDto {
  medicoId: string;
  medicoNome: string;
  dataInicio: Date;
  dataFim: Date;
  hospital?: string;
  totalProducoes: number;
  totalRepasses: number;
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
