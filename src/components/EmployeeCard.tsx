import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SymbolView } from "expo-symbols";
import { Employee } from "../types";

type EmployeeCardProps = {
  employee: Employee;
  onCall: (name: string) => void;
  onDelete: (id: string, name: string) => void;
};

export default function EmployeeCard({ employee, onCall, onDelete }: EmployeeCardProps) {
  return (
    <View style={styles.card}>
      {/* Employee Avatar */}
      <Image source={{ uri: employee.avatar }} style={styles.avatar} />

      {/* Employee Info */}
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{employee.name}</Text>
        <Text style={styles.role}>{employee.role}</Text>
      </View>

      {/* Actions (Call & Delete) */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={() => onCall(employee.name)}
          activeOpacity={0.7}
        >
          <SymbolView
            name={{ ios: "phone", android: "phone", web: "phone" }}
            size={18}
            tintColor="#0066cc"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(employee.id, employee.name)}
          activeOpacity={0.7}
        >
          <SymbolView
            name={{ ios: "trash", android: "delete", web: "delete" }}
            size={18}
            tintColor="#cc0000"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#f3f4f6",
    borderWidth: 2,
    borderColor: "#f9fafb",
  },
  cardInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  callButton: {
    backgroundColor: "#eff6ff", // Light blue background
  },
  deleteButton: {
    backgroundColor: "#fef2f2", // Light red background
  },
});
