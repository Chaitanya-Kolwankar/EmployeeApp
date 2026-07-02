import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Skeleton } from "moti/skeleton";
import { useState, useEffect } from "react";
import { fetchEmployeeById } from "../../services/employeeService";
import { Employee } from "../../types";
export default function EmployeeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEmployee() {
      if (!id) return;
      try {
        const data = await fetchEmployeeById(id);
        setEmployee(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch employee");
      } finally {
        setIsLoading(false);
      }
    }

    loadEmployee();
  }, [id]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!isLoading && !employee) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Employee not found.</Text>
      </View>
    );
  }

  const displayEmployee = employee || { name: '', role: '', avatar: '' } as Employee;

  return (
    <Skeleton.Group show={isLoading}>
      <View style={styles.container}>
        <View style={{ marginBottom: 24 }}>
          <Skeleton colorMode="light" radius="round" height={140} width={140}>
            {displayEmployee.avatar ? <Image source={{ uri: displayEmployee.avatar }} style={styles.avatar} /> : <View style={styles.avatar} />}
          </Skeleton>
        </View>
        <View style={{ marginBottom: 8 }}>
          <Skeleton colorMode="light" height={32} width={200}>
            {displayEmployee.name ? <Text style={styles.name}>{displayEmployee.name}</Text> : null}
          </Skeleton>
        </View>
        <Skeleton colorMode="light" height={24} width={150}>
          {displayEmployee.role ? <Text style={styles.role}>{displayEmployee.role}</Text> : null}
        </Skeleton>
      </View>
    </Skeleton.Group>
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
