import { Inject, Injectable } from '@nestjs/common';
import { Medico } from '../../../domain/entities';
import { DuplicateEntityException } from '../../../domain/exceptions';
import { IMedicoRepository, MEDICO_REPOSITORY } from '../../../domain/repositories';
import { CreateMedicoDto, MedicoOutputDto } from '../../dtos/medico';

@Injectable()
export class CreateMedicoUseCase {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(dto: CreateMedicoDto): Promise<MedicoOutputDto> {
    const existingMedico = await this.medicoRepository.findByCrm(dto.crm);
    if (existingMedico) {
      throw new DuplicateEntityException('Médico', 'CRM', dto.crm);
    }

    const medico = new Medico({
      nome: dto.nome,
      crm: dto.crm,
      especialidade: dto.especialidade,
    });

    const savedMedico = await this.medicoRepository.create(medico);
    return MedicoOutputDto.fromEntity(savedMedico);
  }
}
