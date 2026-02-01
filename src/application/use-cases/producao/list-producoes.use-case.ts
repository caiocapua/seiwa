import { Inject, Injectable } from '@nestjs/common';
import { IProducaoRepository, PRODUCAO_REPOSITORY } from '../../../domain/repositories';
import { ListProducaoDto, ProducaoOutputDto } from '../../dtos/producao';

@Injectable()
export class ListProducoesUseCase {
  constructor(
    @Inject(PRODUCAO_REPOSITORY)
    private readonly producaoRepository: IProducaoRepository,
  ) {}

  async execute(dto: ListProducaoDto): Promise<ProducaoOutputDto[]> {
    const producoes = await this.producaoRepository.findAll({
      medicoId: dto.medicoId,
      hospital: dto.hospital,
      dataInicio: dto.dataInicio ? new Date(dto.dataInicio) : undefined,
      dataFim: dto.dataFim ? new Date(dto.dataFim) : undefined,
    });

    return producoes.map(ProducaoOutputDto.fromEntity);
  }
}
