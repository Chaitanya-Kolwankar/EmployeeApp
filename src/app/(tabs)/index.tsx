import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmployeeCard from "../../components/EmployeeCard";
import Header from "../../components/Header";
import { DEPARTMENTS, INITIAL_EMPLOYEES } from "../../data/mockData";

export default function EmployeeListScreen() {
  const router = useRouter();
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [activeTab, setActiveTab] = useState("All");

  // Handle Call Action
  const handleCall = (name: string) => {
    Alert.alert("Calling", `Initiating call to ${name}...`);
  };

  // Handle Delete Action
  const handleDelete = (id: string, name: string) => {
    Alert.alert("Delete Employee", `Are you sure you want to remove ${name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f7f6" />

      {/* Header Section */}
      <Header
        title="Team Directory"
        subtitle={`${employees.length} Members`}
        actionIcon={{ ios: "plus", android: "add", web: "add" }}
        onActionPress={() =>
          Alert.alert("Add Employee", "Add new employee action")
        }
      />

      {/* Horizontal ScrollView for Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {DEPARTMENTS.map((dept, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterPill,
                activeTab === dept && styles.filterPillActive,
              ]}
              onPress={() => setActiveTab(dept)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.filterText,
                  activeTab === dept && styles.filterTextActive,
                ]}
              >
                {dept}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Vertical FlatList for Employee List */}
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EmployeeCard
            employee={item}
            onCall={handleCall}
            onDelete={handleDelete}
            onPress={() => router.push(`/employee/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        // Empty state when all employees are deleted
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No employees found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// StyleSheet defining the proper UI structure and visual hierarchy
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f7f6", // Light grayish-blue background
  },
  filtersContainer: {
    marginBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  filterPill: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterPillActive: {
    backgroundColor: "#3b82f6", // Vibrant blue
    borderColor: "#3b82f6",
  },
  filterText: {
    color: "#4b5563",
    fontWeight: "600",
    fontSize: 15,
  },
  filterTextActive: {
    color: "#ffffff",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra padding for bottom navigation if present
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
    fontWeight: "500",
  },
});
