import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../domain/exceptions';
import { IProducaoRepository, PRODUCAO_REPOSITORY } from '../../../domain/repositories';
import { ProducaoOutputDto } from '../../dtos/producao';

@Injectable()
export class GetProducaoUseCase {
  constructor(
    @Inject(PRODUCAO_REPOSITORY)
    private readonly producaoRepository: IProducaoRepository,
  ) {}

  async execute(id: string): Promise<ProducaoOutputDto> {
    const producao = await this.producaoRepository.findById(id);
    if (!producao) {
      throw new EntityNotFoundException('Produção', id);
    }

    return ProducaoOutputDto.fromEntity(producao);
  }
}
