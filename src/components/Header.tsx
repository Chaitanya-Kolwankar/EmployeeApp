import { SymbolView } from "expo-symbols";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  title: string;
  subtitle?: string;
  actionIcon?: any;
  onActionPress?: () => void;
};

export default function Header({
  title,
  subtitle,
  actionIcon,
  onActionPress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {actionIcon && onActionPress && (
        <TouchableOpacity style={styles.actionButton} onPress={onActionPress}>
          <SymbolView name={actionIcon} size={18} tintColor="#1d4ed8" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  textGroup: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
  },
  actionIcon: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1d4ed8",
  },
});
