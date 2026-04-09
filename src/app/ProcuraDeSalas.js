import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { colors } from '../styles/colors';
import FormAgendamento from '../components/FormAgendamento/index';

const todasSalas = [
  { id: 1, sala: '101', andar: '1º Andar' },
  { id: 2, sala: '102', andar: '1º Andar' },
  { id: 3, sala: '103', andar: '1º Andar' },
  { id: 4, sala: '206', andar: '2º Andar' },
  { id: 5, sala: '207', andar: '2º Andar' },
  { id: 6, sala: '208', andar: '2º Andar' },
  { id: 7, sala: '312', andar: '3º Andar' },
  { id: 8, sala: '313', andar: '3º Andar' },
  { id: 9, sala: '314', andar: '3º Andar' },
  { id: 10, sala: '415', andar: '4º Andar' },
  { id: 11, sala: '416', andar: '4º Andar' },
  { id: 12, sala: '417', andar: '4º Andar' },
];

export default function ProcuraDeSalas() {
  const [busca, setBusca] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState(null);

  const salasFiltradas = todasSalas.filter((sala) =>
    sala.sala.includes(busca)
  );

  const handleAgendar = (sala) => {
    setSalaSelecionada(sala);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Procurar Salas</Text>
        <Text style={styles.headerSubtitle}>Encontre e agende sua sala</Text>
      </View>

      {/* Barra de Busca */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar pelo numero da sala..."
            placeholderTextColor="#999"
            value={busca}
            onChangeText={setBusca}
            keyboardType="numeric"
          />
          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca('')} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Resultado da Busca */}
      <View style={styles.resultInfo}>
        <Text style={styles.resultText}>
          {salasFiltradas.length} sala{salasFiltradas.length !== 1 ? 's' : ''} encontrada{salasFiltradas.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Lista de Salas */}
      <ScrollView style={styles.salasList} showsVerticalScrollIndicator={false}>
        {salasFiltradas.map((sala) => (
          <View key={sala.id} style={styles.salaCard}>
            <View style={styles.salaInfo}>
              <Text style={styles.salaNumero}>Sala {sala.sala}</Text>
              <Text style={styles.salaAndar}>{sala.andar}</Text>
            </View>
            <TouchableOpacity
              style={styles.agendarButton}
              onPress={() => handleAgendar(sala)}
            >
              <Text style={styles.agendarButtonText}>Agendar</Text>
            </TouchableOpacity>
          </View>
        ))}

        {salasFiltradas.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>Nenhuma sala encontrada</Text>
            <Text style={styles.emptySubtext}>Tente buscar por outro numero</Text>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Modal de Formulário */}
      <FormAgendamento
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        sala={salaSelecionada}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.header,
    paddingTop: 24,
    paddingBottom: 34,
    paddingHorizontal: 20,
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
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
  },
  searchBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1A1A1A',
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666666',
  },
  resultInfo: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  resultText: {
    fontSize: 14,
    color: '#666666',
  },
  salasList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  salaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  salaInfo: {
    flex: 1,
  },
  salaNumero: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  salaAndar: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  agendarButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  agendarButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666666',
  },
  bottomSpacing: {
    height: 100,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  navIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navIcon: {
    fontSize: 24,
  },
  navText: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
  },
  navTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 24,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});