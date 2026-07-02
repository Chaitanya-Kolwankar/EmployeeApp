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

  const displayEmployee = employee || { name: '', role: '', department: '', avatar: '', email: '', phone: '' } as Employee;

  return (
    <Skeleton.Group show={isLoading}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.avatarContainer}>
            <Skeleton colorMode="light" radius="round" height={140} width={140}>
              {displayEmployee.avatar ? <Image source={{ uri: displayEmployee.avatar }} style={styles.avatar} /> : <View style={styles.avatar} />}
            </Skeleton>
          </View>
          
          <View style={styles.headerInfo}>
            <View style={{ marginBottom: 8 }}>
              <Skeleton colorMode="light" height={32} width={200}>
                {displayEmployee.name ? <Text style={styles.name}>{displayEmployee.name}</Text> : null}
              </Skeleton>
            </View>
            <Skeleton colorMode="light" height={20} width={240}>
              {displayEmployee.department ? <Text style={styles.role}>{displayEmployee.role} • {displayEmployee.department}</Text> : null}
            </Skeleton>
          </View>

          <View style={styles.contactSection}>
            <View style={styles.contactRow}>
              <View style={styles.contactIconWrapper}>
                <Text style={styles.contactIcon}>✉️</Text>
              </View>
              <View style={styles.contactTextWrapper}>
                <Text style={styles.contactLabel}>Email</Text>
                <Skeleton colorMode="light" height={16} width={180}>
                  {displayEmployee.email ? <Text style={styles.contactValue}>{displayEmployee.email}</Text> : null}
                </Skeleton>
              </View>
            </View>

            <View style={styles.contactRow}>
              <View style={styles.contactIconWrapper}>
                <Text style={styles.contactIcon}>📱</Text>
              </View>
              <View style={styles.contactTextWrapper}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Skeleton colorMode="light" height={16} width={140}>
                  {displayEmployee.phone ? <Text style={styles.contactValue}>{displayEmployee.phone}</Text> : null}
                </Skeleton>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Skeleton.Group>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7f6",
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    alignItems: "center",
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f7f6",
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: -10, // Slight overlap effect
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerInfo: {
    alignItems: "center",
    marginBottom: 32,
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  role: {
    fontSize: 16,
    color: "#3b82f6", // Vibrant blue for the role/department
    fontWeight: "600",
    textAlign: "center",
  },
  contactSection: {
    width: "100%",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 16,
  },
  contactIcon: {
    fontSize: 20,
  },
  contactTextWrapper: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 15,
    color: "#1f2937",
    fontWeight: "500",
  },
  errorText: {
    fontSize: 18,
    color: "#ef4444",
    fontWeight: "600",
  },
});
