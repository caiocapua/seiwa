import { Medico } from '../../../../src/domain/entities';
import { InvalidValueException } from '../../../../src/domain/exceptions';

describe('Medico Entity', () => {
  it('deve criar um médico válido', () => {
    const medico = new Medico({
      nome: 'Dr. João Silva',
      crm: '12345-SP',
      especialidade: 'Cardiologia',
    });

    expect(medico.id).toBeDefined();
    expect(medico.nome).toBe('Dr. João Silva');
    expect(medico.crm).toBe('12345-SP');
    expect(medico.especialidade).toBe('Cardiologia');
    expect(medico.createdAt).toBeInstanceOf(Date);
    expect(medico.updatedAt).toBeInstanceOf(Date);
  });

  it('deve criar médico sem especialidade', () => {
    const medico = new Medico({
      nome: 'Dr. João Silva',
      crm: '12345-SP',
    });

    expect(medico.especialidade).toBeUndefined();
  });

  it('deve lançar erro se nome vazio', () => {
    expect(() => {
      new Medico({
        nome: '',
        crm: '12345-SP',
      });
    }).toThrow(InvalidValueException);
  });

  it('deve lançar erro se CRM vazio', () => {
    expect(() => {
      new Medico({
        nome: 'Dr. João Silva',
        crm: '',
      });
    }).toThrow(InvalidValueException);
  });

  it('deve atualizar nome e especialidade', () => {
    const medico = new Medico({
      nome: 'Dr. João Silva',
      crm: '12345-SP',
    });

    const oldUpdatedAt = medico.updatedAt;

    // Esperar um pouco para garantir que updatedAt seja diferente
    medico.update({
      nome: 'Dr. João Santos',
      especialidade: 'Neurologia',
    });

    expect(medico.nome).toBe('Dr. João Santos');
    expect(medico.especialidade).toBe('Neurologia');
    expect(medico.crm).toBe('12345-SP'); // CRM não deve mudar
  });

  it('deve serializar para JSON', () => {
    const medico = new Medico({
      id: 'test-id',
      nome: 'Dr. João Silva',
      crm: '12345-SP',
      especialidade: 'Cardiologia',
    });

    const json = medico.toJSON();

    expect(json.id).toBe('test-id');
    expect(json.nome).toBe('Dr. João Silva');
    expect(json.crm).toBe('12345-SP');
    expect(json.especialidade).toBe('Cardiologia');
  });
});
