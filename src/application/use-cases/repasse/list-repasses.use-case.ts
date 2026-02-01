import { Inject, Injectable } from '@nestjs/common';
import { IRepasseRepository, REPASSE_REPOSITORY } from '../../../domain/repositories';
import { ListRepasseDto, RepasseOutputDto } from '../../dtos/repasse';

@Injectable()
export class ListRepassesUseCase {
  constructor(
    @Inject(REPASSE_REPOSITORY)
    private readonly repasseRepository: IRepasseRepository,
  ) {}

  async execute(dto: ListRepasseDto): Promise<RepasseOutputDto[]> {
    const repasses = await this.repasseRepository.findAll({
      medicoId: dto.medicoId,
      hospital: dto.hospital,
      status: dto.status,
      dataInicio: dto.dataInicio ? new Date(dto.dataInicio) : undefined,
      dataFim: dto.dataFim ? new Date(dto.dataFim) : undefined,
    });

    return repasses.map(RepasseOutputDto.fromEntity);
  }
}
