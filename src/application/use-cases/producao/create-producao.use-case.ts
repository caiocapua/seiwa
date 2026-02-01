import { Inject, Injectable } from '@nestjs/common';
import { Producao } from '../../../domain/entities';
import { EntityNotFoundException } from '../../../domain/exceptions';
import {
  IMedicoRepository,
  IProducaoRepository,
  MEDICO_REPOSITORY,
  PRODUCAO_REPOSITORY,
} from '../../../domain/repositories';
import { CreateProducaoDto, ProducaoOutputDto } from '../../dtos/producao';

@Injectable()
export class CreateProducaoUseCase {
  constructor(
    @Inject(PRODUCAO_REPOSITORY)
    private readonly producaoRepository: IProducaoRepository,
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: IMedicoRepository,
  ) {}

  async execute(dto: CreateProducaoDto): Promise<ProducaoOutputDto> {
    const medico = await this.medicoRepository.findById(dto.medicoId);
    if (!medico) {
      throw new EntityNotFoundException('Médico', dto.medicoId);
    }

    const producao = new Producao({
      medicoId: dto.medicoId,
      hospital: dto.hospital,
      valor: dto.valor,
      data: new Date(dto.data),
      descricao: dto.descricao,
    });

    const savedProducao = await this.producaoRepository.create(producao);
    return ProducaoOutputDto.fromEntity(savedProducao);
  }
}
