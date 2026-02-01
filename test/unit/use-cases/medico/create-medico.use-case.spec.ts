import { CreateMedicoUseCase } from '../../../../src/application/use-cases/medico';
import { Medico } from '../../../../src/domain/entities';
import { DuplicateEntityException } from '../../../../src/domain/exceptions';
import { IMedicoRepository } from '../../../../src/domain/repositories';

describe('CreateMedicoUseCase', () => {
  let useCase: CreateMedicoUseCase;
  let medicoRepository: jest.Mocked<IMedicoRepository>;

  beforeEach(() => {
    medicoRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCrm: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };

    useCase = new CreateMedicoUseCase(medicoRepository);
  });

  it('deve criar um médico com sucesso', async () => {
    const dto = {
      nome: 'Dr. João Silva',
      crm: '12345-SP',
      especialidade: 'Cardiologia',
    };

    medicoRepository.findByCrm.mockResolvedValue(null);
    medicoRepository.create.mockImplementation(async (medico) => medico);

    const result = await useCase.execute(dto);

    expect(result.nome).toBe(dto.nome);
    expect(result.crm).toBe(dto.crm);
    expect(result.especialidade).toBe(dto.especialidade);
    expect(result.id).toBeDefined();
    expect(medicoRepository.findByCrm).toHaveBeenCalledWith(dto.crm);
    expect(medicoRepository.create).toHaveBeenCalled();
  });

  it('deve lançar erro se CRM já existe', async () => {
    const dto = {
      nome: 'Dr. João Silva',
      crm: '12345-SP',
    };

    const existingMedico = new Medico({
      nome: 'Dr. Outro',
      crm: '12345-SP',
    });

    medicoRepository.findByCrm.mockResolvedValue(existingMedico);

    await expect(useCase.execute(dto)).rejects.toThrow(DuplicateEntityException);
    expect(medicoRepository.create).not.toHaveBeenCalled();
  });
});
