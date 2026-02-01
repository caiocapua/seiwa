import { Inject, Injectable } from '@nestjs/common';
import { Repasse } from '../../../domain/entities';
import { EntityNotFoundException } from '../../../domain/exceptions';
import {
  IMedicoRepository,
  IRepasseRepository,
  MEDICO_REPOSITORY,
  REPASSE_REPOSITORY,
} from '../../../domain/repositories';
import { CreateRepasseDto, RepasseOutputDto } from '../../dtos/repasse';

@Injectable()
export class CreateRepasseUseCase {
  constructor(
    @Inject(REPASSE_REPOSITORY)
    private readonly repasseRepository: IRepasseRepository,
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(dto: CreateRepasseDto): Promise<RepasseOutputDto> {
    const medico = await this.medicoRepository.findById(dto.medicoId);
    if (!medico) {
      throw new EntityNotFoundException('Médico', dto.medicoId);
    }

    const repasse = new Repasse({
      medicoId: dto.medicoId,
      hospital: dto.hospital,
      valor: dto.valor,
      data: new Date(dto.data),
      descricao: dto.descricao,
    });

    const savedRepasse = await this.repasseRepository.create(repasse);
    return RepasseOutputDto.fromEntity(savedRepasse);
  }
}
