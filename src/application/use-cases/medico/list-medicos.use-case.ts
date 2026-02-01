import { Inject, Injectable } from '@nestjs/common';
import { IMedicoRepository, MEDICO_REPOSITORY } from '../../../domain/repositories';
import { MedicoOutputDto } from '../../dtos/medico';

@Injectable()
export class ListMedicosUseCase {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(): Promise<MedicoOutputDto[]> {
    const medicos = await this.medicoRepository.findAll();
    return medicos.map(MedicoOutputDto.fromEntity);
  }
}
