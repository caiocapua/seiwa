import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../domain/exceptions';
import { IMedicoRepository, MEDICO_REPOSITORY } from '../../../domain/repositories';
import { MedicoOutputDto, UpdateMedicoDto } from '../../dtos/medico';

@Injectable()
export class UpdateMedicoUseCase {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(id: string, dto: UpdateMedicoDto): Promise<MedicoOutputDto> {
    const medico = await this.medicoRepository.findById(id);
    if (!medico) {
      throw new EntityNotFoundException('Médico', id);
    }

    medico.update({
      nome: dto.nome,
      especialidade: dto.especialidade,
    });

    const updatedMedico = await this.medicoRepository.update(medico);
    return MedicoOutputDto.fromEntity(updatedMedico);
  }
}
