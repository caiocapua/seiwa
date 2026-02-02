import { Inject, Injectable } from '@nestjs/common';
import {
  IProducaoRepository,
  PRODUCAO_REPOSITORY,
} from '../../../domain/repositories';
import { PaginatedResultDto } from '../../dtos/common';
import { ListProducaoDto, ProducaoOutputDto } from '../../dtos/producao';

@Injectable()
export class ListProducoesUseCase {
  constructor(
    @Inject(PRODUCAO_REPOSITORY)
    private readonly producaoRepository: IProducaoRepository,
  ) {}

  async execute(
    dto: ListProducaoDto,
  ): Promise<PaginatedResultDto<ProducaoOutputDto>> {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;

    const result = await this.producaoRepository.findAll(
      {
        medicoId: dto.medicoId,
        hospital: dto.hospital,
        dataInicio: dto.dataInicio ? new Date(dto.dataInicio) : undefined,
        dataFim: dto.dataFim ? new Date(dto.dataFim) : undefined,
      },
      { page, limit },
    );

    return PaginatedResultDto.create({
      data: result.data.map((p) => ProducaoOutputDto.fromEntity(p)),
      total: result.total,
      page,
      limit,
    });
  }
}
