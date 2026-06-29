import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false, // This hides the duplicate top bar
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 65,
          paddingBottom: 12,
          paddingTop: 8,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Directory',
          tabBarIcon: ({ color }) => (
            <SymbolView 
              name={{ ios: "person.3.fill", android: "group", web: "group" }} 
              size={26} 
              tintColor={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <SymbolView 
              name={{ ios: "gear", android: "settings", web: "settings" }} 
              size={26} 
              tintColor={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
