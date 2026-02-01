import { GetSaldoMedicoUseCase } from '../../../../src/application/use-cases/medico';
import { Medico } from '../../../../src/domain/entities';
import { RepasseStatus } from '../../../../src/domain/enums';
import { EntityNotFoundException } from '../../../../src/domain/exceptions';
import {
  IMedicoRepository,
  IProducaoRepository,
  IRepasseRepository,
} from '../../../../src/domain/repositories';

describe('GetSaldoMedicoUseCase', () => {
  let useCase: GetSaldoMedicoUseCase;
  let medicoRepository: jest.Mocked<IMedicoRepository>;
  let producaoRepository: jest.Mocked<IProducaoRepository>;
  let repasseRepository: jest.Mocked<IRepasseRepository>;

  beforeEach(() => {
    medicoRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCrm: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };

    producaoRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      sumByMedicoAndPeriod: jest.fn(),
    };

    repasseRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      sumByMedicoAndPeriod: jest.fn(),
    };

    useCase = new GetSaldoMedicoUseCase(
      medicoRepository,
      producaoRepository,
      repasseRepository,
    );
  });

  it('deve calcular o saldo corretamente', async () => {
    const medicoId = 'medico-123';
    const medico = new Medico({
      id: medicoId,
      nome: 'Dr. João Silva',
      crm: '12345-SP',
    });

    const dto = {
      dataInicio: '2024-01-01',
      dataFim: '2024-01-31',
    };

    medicoRepository.findById.mockResolvedValue(medico);
    producaoRepository.sumByMedicoAndPeriod.mockResolvedValue(10000);
    repasseRepository.sumByMedicoAndPeriod.mockResolvedValue(6000);

    const result = await useCase.execute(medicoId, dto);

    expect(result.medicoId).toBe(medicoId);
    expect(result.medicoNome).toBe('Dr. João Silva');
    expect(result.totalProducoes).toBe(10000);
    expect(result.totalRepasses).toBe(6000);
    expect(result.saldo).toBe(4000);
    expect(repasseRepository.sumByMedicoAndPeriod).toHaveBeenCalledWith(
      medicoId,
      expect.any(Date),
      expect.any(Date),
      RepasseStatus.PROCESSADO,
      undefined,
    );
  });

  it('deve calcular saldo com filtro de hospital', async () => {
    const medicoId = 'medico-123';
    const medico = new Medico({
      id: medicoId,
      nome: 'Dr. João Silva',
      crm: '12345-SP',
    });

    const dto = {
      dataInicio: '2024-01-01',
      dataFim: '2024-01-31',
      hospital: 'Hospital A',
    };

    medicoRepository.findById.mockResolvedValue(medico);
    producaoRepository.sumByMedicoAndPeriod.mockResolvedValue(5000);
    repasseRepository.sumByMedicoAndPeriod.mockResolvedValue(3000);

    const result = await useCase.execute(medicoId, dto);

    expect(result.hospital).toBe('Hospital A');
    expect(result.saldo).toBe(2000);
    expect(producaoRepository.sumByMedicoAndPeriod).toHaveBeenCalledWith(
      medicoId,
      expect.any(Date),
      expect.any(Date),
      'Hospital A',
    );
  });

  it('deve lançar erro se médico não existe', async () => {
    medicoRepository.findById.mockResolvedValue(null);

    const dto = {
      dataInicio: '2024-01-01',
      dataFim: '2024-01-31',
    };

    await expect(useCase.execute('inexistente', dto)).rejects.toThrow(
      EntityNotFoundException,
    );
  });

  it('deve retornar saldo zero quando não há produções nem repasses', async () => {
    const medicoId = 'medico-123';
    const medico = new Medico({
      id: medicoId,
      nome: 'Dr. João Silva',
      crm: '12345-SP',
    });

    const dto = {
      dataInicio: '2024-01-01',
      dataFim: '2024-01-31',
    };

    medicoRepository.findById.mockResolvedValue(medico);
    producaoRepository.sumByMedicoAndPeriod.mockResolvedValue(0);
    repasseRepository.sumByMedicoAndPeriod.mockResolvedValue(0);

    const result = await useCase.execute(medicoId, dto);

    expect(result.saldo).toBe(0);
  });
});
