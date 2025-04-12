import HomePage from "./screens/HomePage";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {BellIcon, BotIcon, HomeIcon, Share2Icon} from "lucide-react-native";

const Tab = createBottomTabNavigator();
export type HomeNavigatorParamList = {
    Home: {},
    ChatWithAI: {},
    Workshops: {},
    Notifications: {}
}

export default function HomeNavigator() {
    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            screenOptions={{headerShown: false}}
        >
            <Tab.Screen
                name={"Home"}
                component={HomePage}
                options={{
                    tabBarIcon: ({ focused, size }) => {
                        return (
                            <HomeIcon size={size} color={focused ? "#00B7FF" : "#575757"}/>
                        )
                    }
                }}
            />
            <Tab.Screen
                name={"Workshops"}
                component={HomePage}
                options={{
                    tabBarIcon: ({ focused, size }) => {
                        return (
                            <Share2Icon size={size} color={focused ? "#00B7FF" : "#575757"}/>
                        )
                    }
                }}
            />
            <Tab.Screen
                name={"ChatWithAi"}
                component={HomePage}
                options={{
                    tabBarLabel: "Chat with AI",
                    tabBarIcon: ({ focused, size }) => {
                        return (
                            <BotIcon size={size} color={focused ? "#00B7FF" : "#575757"}/>
                        )
                    }
                }}
            />
            <Tab.Screen
                name={"Notifications"}
                component={HomePage}
                options={{
                    tabBarIcon: ({ focused, size }) => {
                        return (
                            <BellIcon size={size} color={focused ? "#00B7FF" : "#575757"}/>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}
