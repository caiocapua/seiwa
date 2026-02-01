import { CreateRepasseUseCase } from '../../../../src/application/use-cases/repasse';
import { Medico } from '../../../../src/domain/entities';
import { RepasseStatus } from '../../../../src/domain/enums';
import { EntityNotFoundException } from '../../../../src/domain/exceptions';
import { IMedicoRepository, IRepasseRepository } from '../../../../src/domain/repositories';

describe('CreateRepasseUseCase', () => {
  let useCase: CreateRepasseUseCase;
  let repasseRepository: jest.Mocked<IRepasseRepository>;
  let medicoRepository: jest.Mocked<IMedicoRepository>;

  beforeEach(() => {
    repasseRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      sumByMedicoAndPeriod: jest.fn(),
    };

    medicoRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCrm: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };

    useCase = new CreateRepasseUseCase(repasseRepository, medicoRepository);
  });

  it('deve criar um repasse com status pendente', async () => {
    const medicoId = 'medico-123';
    const medico = new Medico({
      id: medicoId,
      nome: 'Dr. João Silva',
      crm: '12345-SP',
    });

    const dto = {
      medicoId,
      hospital: 'Hospital A',
      valor: 2000.00,
      data: '2024-01-20',
      descricao: 'Repasse mensal',
    };

    medicoRepository.findById.mockResolvedValue(medico);
    repasseRepository.create.mockImplementation(async (repasse) => repasse);

    const result = await useCase.execute(dto);

    expect(result.medicoId).toBe(medicoId);
    expect(result.hospital).toBe('Hospital A');
    expect(result.valor).toBe(2000.00);
    expect(result.status).toBe(RepasseStatus.PENDENTE);
    expect(result.id).toBeDefined();
  });

  it('deve lançar erro se médico não existe', async () => {
    const dto = {
      medicoId: 'medico-inexistente',
      hospital: 'Hospital A',
      valor: 2000.00,
      data: '2024-01-20',
    };

    medicoRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(EntityNotFoundException);
    expect(repasseRepository.create).not.toHaveBeenCalled();
  });
});
