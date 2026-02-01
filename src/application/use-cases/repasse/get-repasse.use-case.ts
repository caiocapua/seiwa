import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../domain/exceptions';
import { IRepasseRepository, REPASSE_REPOSITORY } from '../../../domain/repositories';
import { RepasseOutputDto } from '../../dtos/repasse';

@Injectable()
export class GetRepasseUseCase {
  constructor(
    @Inject(REPASSE_REPOSITORY)
    private readonly repasseRepository: IRepasseRepository,
  ) {}

  async execute(id: string): Promise<RepasseOutputDto> {
    const repasse = await this.repasseRepository.findById(id);
    if (!repasse) {
      throw new EntityNotFoundException('Repasse', id);
    }

    return RepasseOutputDto.fromEntity(repasse);
  }
}
