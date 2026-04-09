import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image } from 'react-native';


export default function Tab() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        let title = '';

        if (route.name === 'index') title = 'Labs';
        if (route.name === 'ProcuraDeSalas') title = 'Procurar';
        if (route.name === 'Agendamentos') title = 'Agendamentos';

        return {
          headerTitle: '',
          headerTitleAlign: 'center',
          headerStyle: { 
            height: '80'
          },
          
          headerTitle: () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../../assets/fiaplogo.png')}
                style={{ width: 60, height: 60, resizeMode: 'contain' }}
              />
            </View>
          ),
          
          tabBarActiveTintColor: '#E83D84'
        };
      }
    }
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Labs',
          tabBarIcon: ({ color }) => (
            <Ionicons name="desktop-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ProcuraDeSalas"
        options={{
          title: 'Procurar',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Agendamentos"
        options={{
          title: 'Agendamentos',
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}