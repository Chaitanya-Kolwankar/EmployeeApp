import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { INITIAL_EMPLOYEES } from "../../data/mockData";

export default function EmployeeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Fetch the employee matching this `id`.
  // Note: We fall back to the static mock data because the state in index.tsx
  // is local to that screen.
  const employee = INITIAL_EMPLOYEES.find((emp) => emp.id === id);

  if (!employee) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Employee not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: employee.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{employee.name}</Text>
      <Text style={styles.role}>{employee.role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f4f7f6",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f7f6",
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 24,
    borderWidth: 3,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  role: {
    fontSize: 18,
    color: "#6b7280",
    fontWeight: "500",
  },
  errorText: {
    fontSize: 18,
    color: "#ef4444",
    fontWeight: "600",
  },
});
