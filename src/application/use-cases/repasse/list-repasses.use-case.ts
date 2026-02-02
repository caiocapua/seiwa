import { Inject, Injectable } from '@nestjs/common';
import {
  IRepasseRepository,
  REPASSE_REPOSITORY,
} from '../../../domain/repositories';
import { PaginatedResultDto } from '../../dtos/common';
import { ListRepasseDto, RepasseOutputDto } from '../../dtos/repasse';

@Injectable()
export class ListRepassesUseCase {
  constructor(
    @Inject(REPASSE_REPOSITORY)
    private readonly repasseRepository: IRepasseRepository,
  ) {}

  async execute(
    dto: ListRepasseDto,
  ): Promise<PaginatedResultDto<RepasseOutputDto>> {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;

    const result = await this.repasseRepository.findAll(
      {
        medicoId: dto.medicoId,
        hospital: dto.hospital,
        status: dto.status,
        dataInicio: dto.dataInicio ? new Date(dto.dataInicio) : undefined,
        dataFim: dto.dataFim ? new Date(dto.dataFim) : undefined,
      },
      { page, limit },
    );

    return PaginatedResultDto.create({
      data: result.data.map((r) => RepasseOutputDto.fromEntity(r)),
      total: result.total,
      page,
      limit,
    });
  }
}
