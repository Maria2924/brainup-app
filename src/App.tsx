import "./global.css";
import {
    InstrumentSans_400Regular,
    InstrumentSans_500Medium,
    InstrumentSans_600SemiBold,
    InstrumentSans_700Bold
} from "@expo-google-fonts/instrument-sans";
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useFonts} from "expo-font";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useEffect} from "react";
import {AuthNavigator} from "./navigators/auth/AuthNavigator";
import {RootStackParamList} from "./navigators/types";
import HomeNavigator from "./navigators/home/HomeNavigator";
import {CourseNavigator} from "./navigators/course/CourseNavigator";
import {StatusBar, Text, View} from "react-native";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();
export function App() {
    const [isFontsLoaded, error] = useFonts({
        InstrumentSans_700Bold,
        InstrumentSans_600SemiBold,
        InstrumentSans_500Medium,
        InstrumentSans_400Regular,
    })

    useEffect(() => {
        if (error) {
            SplashScreen.hideAsync();
            console.error("Failed to load fonts:", error)
            return;
        }
        if (!isFontsLoaded) {
            return;
        }
        SplashScreen.hideAsync();
    }, [isFontsLoaded, error]);


    if (!isFontsLoaded) {
        return (
            <View></View>
        );
    }

    if (error) {
        return (
            <View className={"flex-1 flex justify-center items-center bg-[#D9D9D9]"}>
                <Text className={"text-[#1F1F1F]"}>Failed to load fonts: {error.message ?? "Unknown error"}</Text>
            </View>
        )
    }

    return (
        <NavigationContainer
            linking={{
                enabled: true,
                prefixes: [
                    'brainup://',
                ],
            }}
        >
            <StatusBar barStyle={"dark-content"} animated={true}/>
            <Stack.Navigator initialRouteName={"AuthNavigator"}>
                <Stack.Screen
                    name={"AuthNavigator"}
                    component={AuthNavigator}
                    options={{
                        headerShown: false
                    }}
                ></Stack.Screen>
                <Stack.Screen
                    name={"HomeNavigator"}
                    component={HomeNavigator}
                    options={{
                        headerShown: false
                    }}
                ></Stack.Screen>
                <Stack.Screen
                    name={"CourseNavigator"}
                    component={CourseNavigator}
                    options={{
                        headerShown: false
                    }}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
  );
}
