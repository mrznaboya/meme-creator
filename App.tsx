import "react-native-gesture-handler";

import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  GluestackUIProvider,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CreatorScreen from "./components/CreatorScreen";
import AboutScreen from "./components/AboutScreen";
import HomeScreen from "./components/HomeScreen";

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
      <VStack my={2} mx={1} space="2xl">
        {props.state.routeNames.map((name: string, index: number) => (
          <Pressable
            key={index}
            px={5}
            rounded="$md"
            onPress={(event) => props.navigation.navigate(name)}
            bg={index === props.state.index ? "$rose100" : "transparent"}
          >
            <HStack p={2} space="4xl" alignItems="center">
              <Icon
                color={
                  index === props.state.index ? "$rose600" : "$blueGray700"
                }
                as={() => (
                  <MaterialCommunityIcons name={getIcon(name)} size={20} />
                )}
              ></Icon>
              <Text
                fontWeight="$medium"
                color={
                  index === props.state.index ? "$rose600" : "$blueGray700"
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
      backgroundColor: config.tokens.colors.rose600,
    },
    headerTintColor: "#FFF",
  };
  return (
    <GluestackUIProvider config={config}>
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
    </GluestackUIProvider>
  );
}
