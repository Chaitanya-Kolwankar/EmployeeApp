import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="employee/[id]"
          options={{
            headerShown: true,
            title: "Employee Profile",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
      <AnimatedSplashOverlay />
    </>
  );
}
