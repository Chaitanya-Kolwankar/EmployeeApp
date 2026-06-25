import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

// Mock data for our employee list
const INITIAL_EMPLOYEES = [
  {
    id: "1",
    name: "Alice Smith",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/150?u=alice",
  },
  {
    id: "2",
    name: "Bob Johnson",
    role: "Product Manager",
    avatar: "https://i.pravatar.cc/150?u=bob",
  },
  {
    id: "3",
    name: "Charlie Brown",
    role: "UX Designer",
    avatar: "https://i.pravatar.cc/150?u=charlie",
  },
  {
    id: "4",
    name: "Diana Prince",
    role: "Marketing Lead",
    avatar: "https://i.pravatar.cc/150?u=diana",
  },
  {
    id: "5",
    name: "Evan Wright",
    role: "QA Tester",
    avatar: "https://i.pravatar.cc/150?u=evan",
  },
  {
    id: "6",
    name: "Fiona Gallagher",
    role: "HR Manager",
    avatar: "https://i.pravatar.cc/150?u=fiona",
  },
  {
    id: "7",
    name: "George Costanza",
    role: "Sales Executive",
    avatar: "https://i.pravatar.cc/150?u=george",
  },
  {
    id: "8",
    name: "Hannah Abbott",
    role: "Data Scientist",
    avatar: "https://i.pravatar.cc/150?u=hannah",
  },
];

const DEPARTMENTS = [
  "All",
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "HR",
  "Sales",
];

export default function EmployeeListScreen() {
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

  // Render individual employee card
  const renderEmployee = ({
    item,
  }: {
    item: (typeof INITIAL_EMPLOYEES)[0];
  }) => (
    <View style={styles.card}>
      {/* Employee Avatar */}
      <Image source={{ uri: item.avatar }} style={styles.avatar} />

      {/* Employee Info */}
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>

      {/* Actions (Call & Delete) */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={() => handleCall(item.name)}
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
          onPress={() => handleDelete(item.id, item.name)}
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
        renderItem={renderEmployee}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 20 : 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 4,
    fontWeight: "500",
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
  buttonText: {
    fontSize: 13,
    fontWeight: "700",
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
