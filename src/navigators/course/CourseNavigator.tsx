import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursePage from "./screens/CoursePage";
import {RootStackParamList} from "../types";
import SubjectPage from "./screens/SubjectPage";
import AssessmentsPage from "./screens/AssessmentsPage";
import ActivitiesPage from "./screens/ActivitiesPage";
import ModulesPage from "./screens/ModulesPage";

const Stack = createNativeStackNavigator<RootStackParamList>();
export function CourseNavigator() {
    return (
        <Stack.Navigator initialRouteName={"Course"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"Course"} component={CoursePage}></Stack.Screen>
            <Stack.Screen name={"Subject"} component={SubjectPage}></Stack.Screen>
            <Stack.Screen name={"Assessments"} component={AssessmentsPage}></Stack.Screen>
            <Stack.Screen name={"Activities"} component={ActivitiesPage}></Stack.Screen>
            <Stack.Screen name={"Modules"} component={ModulesPage}></Stack.Screen>
        </Stack.Navigator>
    )
}
