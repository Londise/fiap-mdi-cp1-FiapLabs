import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { obterAgendamentos, removerAgendamento } from '../data/agendamentos-store';
import { colors } from '../styles/colors';

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    // Função que busca os dados
    const carregarDados = () => {
      const lista = obterAgendamentos();
      setAgendamentos(lista);
    };

    // Executa uma vez assim que abrir
    carregarDados();

    // Cria um intervalo para rodar a cada 5 segundos
    const intervalo = setInterval(carregarDados, 5000);

    // Limpa o timer quando sair da página
    return () => clearInterval(intervalo);
  }, []);

  const handleCancelar = (id) => {
    removerAgendamento(id);
    setAgendamentos(obterAgendamentos());
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Agendamentos</Text>
        <Text style={styles.headerSubtitle}>Gerencie suas reservas de salas</Text>
      </View>

      {/* Contador */}
      <View style={styles.contadorContainer}>
        <View style={styles.contadorBox}>
          <Text style={styles.contadorNumero}>{agendamentos.length}</Text>
          <Text style={styles.contadorTexto}>
            {agendamentos.length === 1 ? 'Agendamento ativo' : 'Agendamentos ativos'}
          </Text>
        </View>
      </View>

      {/* Lista de Agendamentos */}
      <ScrollView style={styles.listaAgendamentos} showsVerticalScrollIndicator={false}>
        {agendamentos.length > 0 ? (
          agendamentos.map((agendamento) => (
            <View key={agendamento.id} style={styles.agendamentoCard}>
              <View style={styles.cardHeader}>
                <View style={styles.salaInfo}>
                  <Text style={styles.salaNumero}>Sala {agendamento.sala}</Text>
                  <Text style={styles.salaAndar}>{agendamento.andar}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Confirmado</Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>📅</Text>
                  <View>
                    <Text style={styles.infoLabel}>Data</Text>
                    <Text style={styles.infoValue}>{agendamento.data}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>🕐</Text>
                  <View>
                    <Text style={styles.infoLabel}>Horário</Text>
                    <Text style={styles.infoValue}>{agendamento.horario}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>👥</Text>
                  <View>
                    <Text style={styles.infoLabel}>Alunos</Text>
                    <Text style={styles.infoValue}>{agendamento.quantidadeAlunos}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.rmSection}>
                <Text style={styles.rmLabel}>RMs cadastrados:</Text>
                <View style={styles.rmList}>
                  {agendamento.rms && agendamento.rms.map((rm, index) => (
                    <View key={index} style={styles.rmBadge}>
                      <Text style={styles.rmText}>{rm}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={styles.cancelarButton}
                onPress={() => handleCancelar(agendamento.id)}
              >
                <Text style={styles.cancelarButtonText}>Cancelar Agendamento</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>Nenhum agendamento</Text>
            <Text style={styles.emptySubtext}>
              Seus agendamentos de salas aparecerão aqui
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 24,
    paddingBottom: 34,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  contadorContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginTop: -20,
  },
  contadorBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  contadorNumero: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 12,
  },
  contadorTexto: {
    fontSize: 16,
    color: colors.textCounter,
    fontWeight: '500',
  },
  listaAgendamentos: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  agendamentoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  salaInfo: {
    flex: 1,
  },
  salaNumero: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  salaAndar: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E7D32',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 14,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  infoLabel: {
    fontSize: 11,
    color: '#999999',
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  rmSection: {
    marginBottom: 14,
  },
  rmLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
    marginBottom: 8,
  },
  rmList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  rmBadge: {
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  rmText: {
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  cancelarButton: {
    backgroundColor: '#FFF0F0',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  cancelarButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D32F2F',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  bottomSpacing: {
    height: 100,
  },
});