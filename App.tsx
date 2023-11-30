import "react-native-gesture-handler";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import CreatorScreen from "./components/CreatorScreen";
import AboutScreen from "./components/AboutScreen";
import HomeScreen from "./components/HomeScreen";
import {
  Center,
  HStack,
  Heading,
  Icon,
  NativeBaseProvider,
  Pressable,
  Text,
  VStack,
  theme,
} from "native-base";
import { LogBox } from "react-native";
const Drawer = createDrawerNavigator();
const getIcon = (screenName: string) => {
  switch (screenName) {
    case "Home":
      return "home";
    case "About":
      return "information";
    case "Creator":
      return "fire";
    default:
      return undefined;
  }
};
export const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <Center>
        <Heading color={"secondary.500"}>Menu</Heading>
      </Center>
      <VStack my={2} mx={1} space={3}>
        {props.state.routeNames.map((name: string, index: number) => (
          <Pressable
            key={index}
            px={5}
            py={3}
            rounded="md"
            onPress={(event) => props.navigation.navigate(name)}
            bg={index === props.state.index ? "secondary.100" : "transparent"}
          >
            <HStack p={1} space={4} alignItems="center">
              <Icon
                size={5}
                color={
                  index === props.state.index ? "secondary.600" : "gray.700"
                }
                as={<MaterialCommunityIcons name={getIcon(name)} />}
              />

              <Text
                fontWeight={500}
                color={
                  index === props.state.index ? "secondary.600" : "gray.700"
                }
              >
                {name}
              </Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </DrawerContentScrollView>
  );
};

export default function App() {
  const headerStyle = {
    headerStyle: {
      backgroundColor: theme.colors.secondary[600],
    },
    headerTintColor: "#FFF",
  };

  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
  }, []);

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            initialRouteName="Creator"
          >
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Trending Memes",
                ...headerStyle,
              }}
            />
            <Drawer.Screen
              name="Creator"
              component={CreatorScreen}
              options={{
                title: "Meme Generator",
                ...headerStyle,
              }}
            />
            <Drawer.Screen
              name="About"
              component={AboutScreen}
              options={{
                title: "About the App",
                ...headerStyle,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
