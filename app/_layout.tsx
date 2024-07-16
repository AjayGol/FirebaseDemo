import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import screenNames from "@/components/navigation/ScreenNames";
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let { user_version: currentDbVersion } = await db.getFirstAsync<{
      user_version: number;
    }>("PRAGMA user_version");
    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }

    if (currentDbVersion === 0) {
      await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);
`);
      // await db.runAsync(
      //   "INSERT INTO todos (value, intValue) VALUES (?, ?)",
      //   "hello",
      //   1,
      // );
      // await db.runAsync(
      //   "INSERT INTO todos (value, intValue) VALUES (?, ?)",
      //   "world",
      //   2,
      // );
      currentDbVersion = 1;
    }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
        <Stack
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
          }}
        >
          <Stack.Screen
            name={screenNames.CreateAccount}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={screenNames.Login}
            options={{
              headerShown: false,
              animation: "none",
            }}
          />
          <Stack.Screen
            name={screenNames.TabBar}
            options={{
              headerShown: false,
              animation: "none",
            }}
          />
        </Stack>
      </SQLiteProvider>
    </ThemeProvider>
  );
}
