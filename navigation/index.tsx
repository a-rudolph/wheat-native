/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import Logo from "../assets/svgs/Logo";
import { Text, View } from "../components/Themed";
import { BRAND_NAME } from "../constants/brand";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import BuilderScreen from "../screens/BuilderScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const Row = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <View
      style={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.dark.background,
        padding: 16,
        paddingTop: 36,
      }}
    >
      {children}
    </View>
  );
};

function BottomTabNavigator(props: any) {
  const colorScheme = useColorScheme();

  const colors = Colors[colorScheme];

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        title: BRAND_NAME,
        tabBarStyle: {
          height: 64,
          backgroundColor: Colors[colorScheme].primary,
          borderColor: colors.primary_2,
          borderTopWidth: 2,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors[colorScheme].wheaty,
        header: (props) => {
          return (
            <Row>
              <Text
                style={{
                  fontWeight: "600",
                  color: Colors.dark.wheaty,
                  fontSize: 24,
                }}
              >
                {BRAND_NAME}
              </Text>
              <Pressable onPress={() => props.navigation.navigate("TabOne")}>
                <Logo />
              </Pressable>
            </Row>
          );
        },
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={BuilderScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Recipes",
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="setting" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}
