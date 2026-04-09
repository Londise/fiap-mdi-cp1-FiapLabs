import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState } from 'react';
import { adicionarAgendamento } from '../../data/agendamentos-store';

import { Button } from '../Button/index';

const horariosDisponiveis = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
];

export default function FormAgendamento({ visible, onClose, sala }) {
  const [quantidadeAlunos, setQuantidadeAlunos] = useState(1);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [rms, setRms] = useState(['']);
  const [data, setData] = useState(new Date());
  const [showHorarios, setShowHorarios] = useState(false);


  /* Controle do campo de quantidade de alunos */
  const handleQuantidadeChange = (valor) => {
    /* Garantir que a quantidade fique entre 1 e 10 */
    const quantidade = Math.max(1, Math.min(10, valor));

    setQuantidadeAlunos(quantidade);
    
    const novosRms = [...rms];
    while (novosRms.length < quantidade) {
      novosRms.push('');
    }
    while (novosRms.length > quantidade) {
      novosRms.pop();
    }
    setRms(novosRms);
  };

  /* Controle dos campos de RM, atualiza o valor do RM a cada mudança */
  const handleRmChange = (index, valor) => {
    const novosRms = [...rms];
    novosRms[index] = valor;
    setRms(novosRms);
  };

  const handleSubmit = () => {
    if (!horarioSelecionado || !data || rms.some(rm => rm.trim() === '')) {
      return;
    }

    // 2. Validação da data (mês e dia)
    const partes = data.split('/');
    if (partes.length === 2) {
      const dia = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10);
      
      if (dia > 31 || dia < 1 || mes > 12 || mes < 1) {
        alert('Data inválida!');
        return;
      }

    } else {
      alert('Por favor, insira a data completa (DD/MM).');
      return;
    }

    const agendamento = {
      sala: sala?.sala || '',
      andar: sala?.andar || '',
      quantidadeAlunos,
      horario: horarioSelecionado,
      data,
      rms: rms.filter(rm => rm.trim() !== ''),
    };

    adicionarAgendamento(agendamento);
    
    // Resetar formulário
    setQuantidadeAlunos(1);
    setHorarioSelecionado(null);
    setRms(['']);
    setData('');
    onClose();
  };

  const resetForm = () => {
    setQuantidadeAlunos(1);
    setHorarioSelecionado(null);
    setRms(['']);
    setData('');
    setShowHorarios(false);
    onClose();
  };

  /* Tratamento de data (mês, dia) */

  const formatarData = (text) => {
    let cleaned = text.replace(/\D/g, '');

    if (cleaned.length > 2)
      cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);

    return cleaned;
  };

  const handleDataChange = (text) => {
    setData(formatarData(text));
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={resetForm}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header do Modal */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Agendar Sala</Text>
              {sala && (
                <Text style={styles.modalSubtitle}>Sala {sala.sala} - {sala.andar}</Text>
              )}
            </View>
            <TouchableOpacity onPress={resetForm} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.formScroll}
            showsVerticalScrollIndicator={false}
            /* Scroll principal desativado quando horários estão visíveis */
            scrollEnabled={!showHorarios}>
            {/* Quantidade de Alunos */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Quantidade de Alunos</Text>
              <View style={styles.quantidadeContainer}>
                <TouchableOpacity
                  style={styles.quantidadeButton}
                  onPress={() => handleQuantidadeChange(quantidadeAlunos - 1)}
                >
                  <Text style={styles.quantidadeButtonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.quantidadeDisplay}>
                  <Text style={styles.quantidadeText}>{quantidadeAlunos}</Text>
                </View>
                <TouchableOpacity
                  style={styles.quantidadeButton}
                  onPress={() => handleQuantidadeChange(quantidadeAlunos + 1)}
                >
                  <Text style={styles.quantidadeButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Data */}
            <Text style={styles.label}>Data</Text>

            <TextInput
                style={styles.input}
                placeholder="DD/MM"
                keyboardType="numeric"
                value={data}
                onChangeText={handleDataChange}
                maxLength={10}
            />

            {/* Horário */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Horario</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowHorarios(!showHorarios)}
              >
                <Text style={[
                  styles.selectButtonText,
                  !horarioSelecionado && styles.placeholderText
                ]}>
                  {horarioSelecionado || 'Selecione um horario'}
                </Text>
                <Text style={styles.selectArrow}>{showHorarios ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              
              {showHorarios && (
                <ScrollView style={styles.horariosList} showsVerticalScrollIndicator={false}>
                
                  {horariosDisponiveis.map((horario) => (
                    <TouchableOpacity
                      key={horario}
                      style={[
                        styles.horarioItem,
                        horarioSelecionado === horario && styles.horarioItemSelected
                      ]}
                      onPress={() => {
                        setHorarioSelecionado(horario);
                        setShowHorarios(false);
                      }}
                    >
                      <Text style={[
                        styles.horarioItemText,
                        horarioSelecionado === horario && styles.horarioItemTextSelected
                      ]}>
                        {horario}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* RMs dos Alunos */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>RM dos Alunos</Text>
              {rms.map((rm, index) => (
                <View key={index} style={styles.rmInputContainer}>
                  <Text style={styles.rmLabel}>Aluno {index + 1}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite o RM"
                    placeholderTextColor="#999"
                    value={rm}
                    onChangeText={(valor) => handleRmChange(index, valor)}
                  />
                </View>
              ))}
            </View>

            {/* Botão Enviar */}
            <Button 
            style={[
                styles.submitButton,
                (!horarioSelecionado || !data || rms.some(rm => rm.trim() === '')) && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!horarioSelecionado || !data || rms.some(rm => rm.trim() === '')}
            >
                <Text style={styles.submitButtonText}>Confirmar Agendamento</Text>
            </Button>

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#ED145B',
    fontWeight: '600',
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666666',
  },
  formScroll: {
    paddingHorizontal: 20,
  },
  formGroup: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  quantidadeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ED145B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantidadeButtonText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  quantidadeDisplay: {
    width: 80,
    height: 48,
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quantidadeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  selectButton: {
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  placeholderText: {
    color: '#999999',
  },
  selectArrow: {
    fontSize: 12,
    color: '#666666',
  },
  horariosList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    maxHeight: 200,
    overflow: 'hidden'
  },
  horarioItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  horarioItemSelected: {
    backgroundColor: '#FFF0F5',
  },
  horarioItemText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  horarioItemTextSelected: {
    color: '#ED145B',
    fontWeight: '600',
  },
  rmInputContainer: {
    marginBottom: 12,
  },
  rmLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 6,
  },

  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 20,
  },
});