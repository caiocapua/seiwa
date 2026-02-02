import { Inject, Injectable } from '@nestjs/common';
import {
  IMedicoRepository,
  MEDICO_REPOSITORY,
} from '../../../domain/repositories';
import { PaginatedResultDto, PaginationDto } from '../../dtos/common';
import { MedicoOutputDto } from '../../dtos/medico';

@Injectable()
export class ListMedicosUseCase {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(
    pagination?: PaginationDto,
  ): Promise<PaginatedResultDto<MedicoOutputDto>> {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;

    const result = await this.medicoRepository.findAll({ page, limit });

    return PaginatedResultDto.create({
      data: result.data.map((m) => MedicoOutputDto.fromEntity(m)),
      total: result.total,
      page,
      limit,
    });
  }
}
