import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { colors } from '../styles/colors';

const labsData = [
  {
    id: 1,
    sala: '206',
    andar: '2º Andar',
    horarioInicio: '08:00',
    horarioFim: '10:30',
    capacidade: 40,
    recursos: ['Computadores', 'Projetor', 'Ar-condicionado'],
    status: 'Disponível',
  },
  {
    id: 2,
    sala: '312',
    andar: '3º Andar',
    horarioInicio: '14:00',
    horarioFim: '17:30',
    capacidade: 35,
    recursos: ['Computadores', 'Lousa Digital', 'Ar-condicionado'],
    status: 'Disponível',
  },
  {
    id: 3,
    sala: '415',
    andar: '4º Andar',
    horarioInicio: '19:00',
    horarioFim: '22:00',
    capacidade: 30,
    recursos: ['Computadores', 'Projetor', 'Webcam'],
    status: 'Disponível',
  },
];

export default function Labs() {
  const [selectedLab, setSelectedLab] = useState(null);

  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Labs Disponíveis</Text>
        <Text style={styles.headerDate}>{dataAtual}</Text>
      </View>

      {/* Contador de Labs */}
      <View style={styles.counterContainer}>
        <View style={styles.counterBox}>
          <Text style={styles.counterNumber}>{labsData.length}</Text>
          <Text style={styles.counterLabel}>Labs disponíveis hoje</Text>
        </View>
      </View>

      {/* Lista de Labs */}
      <ScrollView style={styles.labsList} showsVerticalScrollIndicator={false}>
        {labsData.map((lab) => (
          <TouchableOpacity
            key={lab.id}
            style={[
              styles.labCard,
              selectedLab === lab.id && styles.labCardSelected,
            ]}
            onPress={() => setSelectedLab(lab.id)}
            activeOpacity={0.8}
          >

            {/* Status Badge */}
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{lab.status}</Text>
            </View>

            {/* Informação Principal */}
            <View style={styles.labMainInfo}>
              <Text style={styles.labTitle}>Sala {lab.sala}</Text>
              <Text style={styles.labFloor}>{lab.andar}</Text>
            </View>

            {/* Horário */}
            <View style={styles.scheduleContainer}>
              <View style={styles.scheduleIcon}>
                <Text style={styles.clockEmoji}>🕐</Text>
              </View>
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleLabel}>Horário Disponível</Text>
                <Text style={styles.scheduleTime}>
                  {lab.horarioInicio} - {lab.horarioFim}
                </Text>
              </View>
            </View>

            {/* Capacidade */}
            <View style={styles.capacityContainer}>
              <Text style={styles.capacityIcon}>👥</Text>
              <Text style={styles.capacityText}>Capacidade: {lab.capacidade} pessoas</Text>
            </View>

            {/* Recursos */}
            <View style={styles.resourcesContainer}>
              <Text style={styles.resourcesLabel}>Recursos:</Text>
              <View style={styles.resourcesList}>
                {lab.recursos.map((recurso, index) => (
                  <View key={index} style={styles.resourceTag}>
                    <Text style={styles.resourceText}>{recurso}</Text>
                  </View>
                ))}
              </View>
            </View>

          </TouchableOpacity>
        ))}

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

  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'capitalize',
  },
  counterContainer: {
    paddingHorizontal: 20,
    marginTop: -10,
  },
  counterBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  counterNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.primary,
  },
  counterLabel: {
    fontSize: 14,
    color: colors.textCounter,
    marginTop: 4,
  },
  labsList: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  labCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  labCardSelected: {
    borderColor: colors.primary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  labMainInfo: {
    marginBottom: 16,
  },
  labTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  labFloor: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  scheduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  clockEmoji: {
    fontSize: 20,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  capacityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  capacityIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  capacityText: {
    fontSize: 14,
    color: '#666666',
  },
  resourcesContainer: {
    marginBottom: 16,
  },
  resourcesLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
  },
  resourcesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  resourceTag: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  resourceText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
