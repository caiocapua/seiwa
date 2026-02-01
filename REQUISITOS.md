# Requisitos Funcionais e Regras de Negócio

## Contexto

Sistema de API para consolidação de repasses e informações financeiras de médicos, integrando dados de sistemas hospitalares distintos.

**Pilares do sistema:**
- Consistência dos dados
- Performance
- Auditabilidade

---

## Requisitos Funcionais

### RF01 - Cadastro de Médicos

| Campo | Descrição |
|-------|-----------|
| **Descrição** | O sistema deve permitir o cadastro de médicos |
| **Dados sugeridos** | Nome, CRM, especialidade, dados de contato |
| **Operações** | Criar, consultar, atualizar, listar |

### RF02 - Registro de Produções

| Campo | Descrição |
|-------|-----------|
| **Descrição** | O sistema deve permitir registrar produções médicas |
| **Dados obrigatórios** | Valor, data, hospital |
| **Dados sugeridos** | Médico, descrição/tipo do procedimento |
| **Operações** | Criar, consultar, listar por médico/período |

### RF03 - Registro de Repasses

| Campo | Descrição |
|-------|-----------|
| **Descrição** | O sistema deve permitir registrar repasses financeiros aos médicos |
| **Dados obrigatórios** | Valor, data, hospital |
| **Dados sugeridos** | Médico, referência da produção |
| **Operações** | Criar, consultar, listar por médico/período |

### RF04 - Consulta de Saldo Consolidado

| Campo | Descrição |
|-------|-----------|
| **Descrição** | O sistema deve permitir consultar o saldo consolidado de um médico |
| **Filtros obrigatórios** | Médico, período (data inicial e final) |
| **Filtros opcionais** | Hospital |
| **Retorno esperado** | Total de produções, total de repasses, saldo (produções - repasses) |

---

## Regras de Negócio

### RN01 - Cálculo do Saldo

```
Saldo = Total de Produções - Total de Repasses (apenas status "processado")
```

- O saldo representa o valor pendente de repasse ao médico
- **Apenas repasses com status `processado` entram no cálculo**
- Repasses `pendente` e `cancelado` são ignorados no saldo
- Saldo positivo: médico tem valores a receber
- Saldo negativo: médico recebeu mais do que produziu (adiantamento ou erro)

### RN02 - Vinculação de Dados

- Toda **produção** deve estar vinculada a um médico e um hospital
- Todo **repasse** deve estar vinculado a um médico e um hospital
- Um médico pode ter produções/repasses em múltiplos hospitais

### RN03 - Consistência de Datas

- A data da produção deve ser uma data válida (não futura?)
- A data do repasse deve ser uma data válida
- O período de consulta deve ter data inicial <= data final

### RN04 - Valores Financeiros

- Valores de produção devem ser positivos (> 0)
- Valores de repasse devem ser positivos (> 0)
- Valores devem ter precisão de 2 casas decimais

### RN05 - Auditabilidade

- Todos os registros devem ter data/hora de criação
- Alterações devem ser rastreáveis (quem, quando, o quê)
- Não há operação de exclusão de registros (dados são permanentes)

### RN06 - Unicidade do Médico

- CRM deve ser único no sistema
- Não permitir cadastro duplicado do mesmo médico

### RN07 - Status do Repasse

- Todo repasse deve ter um status
- Status possíveis:
  - `pendente` - repasse registrado, aguardando processamento
  - `processado` - repasse efetivado
  - `cancelado` - repasse cancelado
- Status inicial ao criar: `pendente`

---

## Questões em Aberto (para refinamento)

1. ~~**Cadastro de Hospitais**: Deve existir um cadastro separado de hospitais ou é apenas um campo texto?~~ ✅ Definido: Campo texto

2. ~~**Tipos de Produção**: Existem categorias/tipos de procedimentos a serem considerados?~~ ✅ Definido: Não teremos no momento

3. ~~**Vinculação Produção x Repasse**: Um repasse pode referenciar uma ou mais produções específicas?~~ ✅ Definido: Sem vínculo direto

4. ~~**Status de Repasse**: Existem estados para o repasse (pendente, processado, cancelado)?~~ ✅ Definido: Sim, teremos status

5. ~~**Permissões**: Quem pode registrar produções e repasses? Existe controle de acesso?~~ ✅ Definido: Não teremos controle de acesso

6. ~~**Consolidação por Hospital**: Na consulta de saldo, deve ser possível filtrar/agrupar por hospital?~~ ✅ Definido: Sim, filtro por hospital disponível

7. ~~**Moeda**: O sistema trabalha apenas com Real (BRL) ou suporta múltiplas moedas?~~ ✅ Definido: Apenas BRL

---

## Relações entre Entidades

### Cardinalidades Definidas

| Relação | Cardinalidade | Justificativa |
|---------|---------------|---------------|
| Médico → Produção | **1:N** | Um médico pode realizar várias produções, mas cada produção pertence a um único médico |
| Médico → Repasse | **1:N** | Um médico pode receber vários repasses, mas cada repasse é destinado a um único médico |
| Produção ↔ Repasse | **Sem vínculo direto** | São fluxos independentes que afetam o saldo. Não há rastreamento de qual repasse paga qual produção específica |

> **Nota sobre Hospital**: Hospital é tratado como campo texto (string) nas entidades Produção e Repasse, não como entidade separada.

### Diagrama de Relacionamentos

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Médico    │       │  Produção   │       │   Repasse   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │       │ id          │       │ id          │
│ nome        │──1:N─►│ medico_id   │       │ medico_id   │◄─1:N──│
│ crm (único) │       │ hospital    │       │ hospital    │
│ especialid. │       │ valor       │       │ valor       │
│ created_at  │       │ data        │       │ data        │
│ updated_at  │       │ descricao   │       │ status      │
└─────────────┘       │ created_at  │       │ descricao   │
                      └─────────────┘       │ created_at  │
                                            └─────────────┘
```

### Por que NÃO vincular Produção diretamente ao Repasse?

1. **Simplicidade**: O enunciado não menciona necessidade de rastrear qual repasse paga qual produção
2. **Realidade operacional**: Repasses geralmente são consolidados (um repasse cobre várias produções de um período)
3. **Flexibilidade**: Permite repasses parciais, adiantamentos ou ajustes sem complexidade
4. **Cálculo de saldo**: Basta somar produções e subtrair repasses no período

> **Nota**: Se futuramente for necessário vincular, pode-se criar uma tabela associativa `repasse_producao` (N:N)

---

## Modelo de Dados Sugerido

```
┌─────────────┐       ┌─────────────┐       ┌───────────────┐
│   Médico    │       │  Produção   │       │    Repasse    │
├─────────────┤       ├─────────────┤       ├───────────────┤
│ id          │       │ id          │       │ id            │
│ nome        │◄──────│ medico_id   │       │ medico_id     │──────►
│ crm (único) │       │ hospital    │       │ hospital      │
│ especialid. │       │ valor       │       │ valor         │
│ created_at  │       │ data        │       │ data          │
│ updated_at  │       │ descricao   │       │ status        │
└─────────────┘       │ created_at  │       │ descricao     │
                      └─────────────┘       │ created_at    │
                                            └───────────────┘

Status do Repasse: pendente | processado | cancelado
```

---

## Endpoints Sugeridos

### Médicos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/medicos` | Cadastrar médico |
| GET | `/medicos` | Listar médicos |
| GET | `/medicos/:id` | Consultar médico |
| PUT | `/medicos/:id` | Atualizar médico |

### Produções
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/producoes` | Registrar produção |
| GET | `/producoes` | Listar produções (filtros: medico_id, hospital, data_inicio, data_fim) |
| GET | `/producoes/:id` | Consultar produção específica |

### Repasses
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/repasses` | Registrar repasse |
| GET | `/repasses` | Listar repasses (filtros: medico_id, hospital, data_inicio, data_fim) |
| GET | `/repasses/:id` | Consultar repasse específico |

### Saldo Consolidado
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/medicos/:id/saldo` | Consultar saldo consolidado (query: data_inicio, data_fim, hospital?) |

---

*Documento criado para consolidação de requisitos do desafio técnico Seiwa.*
