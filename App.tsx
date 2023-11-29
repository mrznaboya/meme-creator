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

export const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <VStack>
        {props.state.routeNames.map((name: string, index: number) => (
          <Pressable onPress={(event) => props.navigation.navigate(name)}>
            <HStack>
              <Icon
                size="lg"
                color={
                  index === props.state.index ? "$rose600" : "$blueGray700"
                }
                as={<MaterialCommunityIcons name="home" />}
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
