import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../domain/exceptions';
import {
  IRepasseRepository,
  REPASSE_REPOSITORY,
} from '../../../domain/repositories';
import { RepasseOutputDto, UpdateRepasseStatusDto } from '../../dtos/repasse';

@Injectable()
export class UpdateRepasseStatusUseCase {
  constructor(
    @Inject(REPASSE_REPOSITORY)
    private readonly repasseRepository: IRepasseRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateRepasseStatusDto,
  ): Promise<RepasseOutputDto> {
    const repasse = await this.repasseRepository.findById(id);

    if (!repasse) {
      throw new DomainException('Repasse não encontrado');
    }

    repasse.updateStatus(dto.status);

    const updated = await this.repasseRepository.update(repasse);
    return RepasseOutputDto.fromEntity(updated);
  }
}
