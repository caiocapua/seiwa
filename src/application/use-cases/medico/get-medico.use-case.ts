import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../domain/exceptions';
import { IMedicoRepository, MEDICO_REPOSITORY } from '../../../domain/repositories';
import { MedicoOutputDto } from '../../dtos/medico';

@Injectable()
export class GetMedicoUseCase {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(id: string): Promise<MedicoOutputDto> {
    const medico = await this.medicoRepository.findById(id);
    if (!medico) {
      throw new EntityNotFoundException('Médico', id);
    }

    return MedicoOutputDto.fromEntity(medico);
  }
}
