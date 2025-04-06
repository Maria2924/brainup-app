import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursePage from "./screens/CoursePage";
import {RootStackParamList} from "../types";
import SubjectPage from "./screens/SubjectPage";

const Stack = createNativeStackNavigator<RootStackParamList>();
export function CourseNavigator() {
    return (
        <Stack.Navigator initialRouteName={"Course"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"Course"} component={CoursePage}></Stack.Screen>
            <Stack.Screen name={"Subject"} component={SubjectPage}></Stack.Screen>
        </Stack.Navigator>
    )
}
