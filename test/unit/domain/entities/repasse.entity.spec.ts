import { Repasse } from '../../../../src/domain/entities';
import { RepasseStatus } from '../../../../src/domain/enums';
import { InvalidValueException } from '../../../../src/domain/exceptions';

describe('Repasse Entity', () => {
  it('deve criar um repasse com status pendente por padrão', () => {
    const repasse = new Repasse({
      medicoId: 'medico-123',
      hospital: 'Hospital A',
      valor: 1500.0,
      data: new Date('2024-01-15'),
    });

    expect(repasse.status).toBe(RepasseStatus.PENDENTE);
  });

  it('deve processar um repasse pendente', () => {
    const repasse = new Repasse({
      medicoId: 'medico-123',
      hospital: 'Hospital A',
      valor: 1500.0,
      data: new Date('2024-01-15'),
    });

    repasse.processar();

    expect(repasse.status).toBe(RepasseStatus.PROCESSADO);
  });

  it('deve cancelar um repasse pendente', () => {
    const repasse = new Repasse({
      medicoId: 'medico-123',
      hospital: 'Hospital A',
      valor: 1500.0,
      data: new Date('2024-01-15'),
    });

    repasse.cancelar();

    expect(repasse.status).toBe(RepasseStatus.CANCELADO);
  });

  it('não deve processar um repasse cancelado', () => {
    const repasse = new Repasse({
      medicoId: 'medico-123',
      hospital: 'Hospital A',
      valor: 1500.0,
      data: new Date('2024-01-15'),
      status: RepasseStatus.CANCELADO,
    });

    expect(() => repasse.processar()).toThrow(InvalidValueException);
  });

  it('não deve cancelar um repasse já processado', () => {
    const repasse = new Repasse({
      medicoId: 'medico-123',
      hospital: 'Hospital A',
      valor: 1500.0,
      data: new Date('2024-01-15'),
      status: RepasseStatus.PROCESSADO,
    });

    expect(() => repasse.cancelar()).toThrow(InvalidValueException);
  });

  it('deve arredondar valor para 2 casas decimais', () => {
    const repasse = new Repasse({
      medicoId: 'medico-123',
      hospital: 'Hospital A',
      valor: 1500.556,
      data: new Date('2024-01-15'),
    });

    expect(repasse.valor).toBe(1500.56);
  });

  it('deve lançar erro se valor for zero ou negativo', () => {
    expect(() => {
      new Repasse({
        medicoId: 'medico-123',
        hospital: 'Hospital A',
        valor: 0,
        data: new Date('2024-01-15'),
      });
    }).toThrow(InvalidValueException);

    expect(() => {
      new Repasse({
        medicoId: 'medico-123',
        hospital: 'Hospital A',
        valor: -100,
        data: new Date('2024-01-15'),
      });
    }).toThrow(InvalidValueException);
  });
});
