import { CreateProducaoUseCase } from '../../../../src/application/use-cases/producao';
import { Medico } from '../../../../src/domain/entities';
import { EntityNotFoundException } from '../../../../src/domain/exceptions';
import {
  IMedicoRepository,
  IProducaoRepository,
} from '../../../../src/domain/repositories';

describe('CreateProducaoUseCase', () => {
  let useCase: CreateProducaoUseCase;
  let producaoRepository: jest.Mocked<IProducaoRepository>;
  let medicoRepository: jest.Mocked<IMedicoRepository>;

  beforeEach(() => {
    producaoRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      sumByMedicoAndPeriod: jest.fn(),
    };

    medicoRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCrm: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };

    useCase = new CreateProducaoUseCase(producaoRepository, medicoRepository);
  });

  it('deve criar uma produção com sucesso', async () => {
    const medicoId = 'medico-123';
    const medico = new Medico({
      id: medicoId,
      nome: 'Dr. João Silva',
      crm: '12345-SP',
    });

    const dto = {
      medicoId,
      hospital: 'Hospital A',
      valor: 1500.5,
      data: '2024-01-15',
      descricao: 'Consulta',
    };

    medicoRepository.findById.mockResolvedValue(medico);
    producaoRepository.create.mockImplementation(async (producao) => producao);

    const result = await useCase.execute(dto);

    expect(result.medicoId).toBe(medicoId);
    expect(result.hospital).toBe('Hospital A');
    expect(result.valor).toBe(1500.5);
    expect(result.descricao).toBe('Consulta');
    expect(result.id).toBeDefined();
  });

  it('deve lançar erro se médico não existe', async () => {
    const dto = {
      medicoId: 'medico-inexistente',
      hospital: 'Hospital A',
      valor: 1500.5,
      data: '2024-01-15',
    };

    medicoRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(EntityNotFoundException);
    expect(producaoRepository.create).not.toHaveBeenCalled();
  });
});
