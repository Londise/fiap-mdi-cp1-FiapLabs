export const agendamentos = [];

export const adicionarAgendamento = (agendamento) => {
  const novoAgendamento = {
    id: Date.now(),
    ...agendamento,
    criadoEm: new Date().toISOString(),
  };
  agendamentos.push(novoAgendamento);

  console.log("NOVO AGENDAMENTO CRIADO:", novoAgendamento);
  console.log("LISTA TOTAL ATUALIZADA:", agendamentos);
  
  return novoAgendamento;
};

export const obterAgendamentos = () => {
  return [...agendamentos];
};

export const removerAgendamento = (id) => {
  const index = agendamentos.findIndex((a) => a.id === id);
  if (index !== -1) {
    agendamentos.splice(index, 1);
    return true;
  }
  return false;
};