import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursePage from "./screens/CoursePage";
import {RootStackParamList} from "../types";
import SubjectPage from "./screens/SubjectPage";
import AssessmentsPage from "./screens/AssessmentsPage";
import ActivitiesPage from "./screens/ActivitiesPage";
import ModulesPage from "./screens/ModulesPage";
import {Activity, Assessment, Course, Module, Subject} from "../../types/course";
import TakeAssessmentWarningPage from "./screens/TakeAssessmentWarningPage";
import TakeAssessment from "./screens/TakeAssessment";
import TakeAssessmentSubmissionPage from "./screens/TakeAssessmentSubmissionPage";
import ViewModulePage from "./screens/ViewModulePage";
import ActivitySubmissionPage from "./screens/ActivitySubmissionPage";

const Stack = createNativeStackNavigator<RootStackParamList>();
export function CourseNavigator() {
    return (
        <Stack.Navigator initialRouteName={"Course"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"Course"} component={CoursePage}></Stack.Screen>
            <Stack.Screen name={"Subject"} component={SubjectPage}></Stack.Screen>
            <Stack.Screen name={"Assessments"} component={AssessmentsPage}></Stack.Screen>
            <Stack.Screen name={"Activities"} component={ActivitiesPage}></Stack.Screen>
            <Stack.Screen name={"Modules"} component={ModulesPage}></Stack.Screen>
            <Stack.Screen name={"TakeAssessmentWarning"} component={TakeAssessmentWarningPage}></Stack.Screen>
            <Stack.Screen name={"TakeAssessment"} component={TakeAssessment}></Stack.Screen>
            <Stack.Screen name={"TakeAssessmentSubmission"} component={TakeAssessmentSubmissionPage}></Stack.Screen>
            <Stack.Screen name={"ViewModule"} component={ViewModulePage}></Stack.Screen>
            <Stack.Screen name={"ActivitySubmission"} component={ActivitySubmissionPage}></Stack.Screen>
        </Stack.Navigator>
    )
}

export type CourseNavigatorParamList = {
    Course: {
        course: Course
    }
    Subject: {
        subject: Subject
    },
    Assessments: {
        subject: Subject
    },
    Activities: {
        subject: Subject
    },
    Modules: {
        subject: Subject
    },
    TakeAssessmentWarning: {
        title: string,
        onContinue: () => void
    },
    TakeAssessment: {
        assessment: Assessment
    },
    TakeAssessmentSubmission: {
        title: string,
        score: { received: number, max: number } | null,
    },
    ViewModule: {
        module: Module
    },
    ActivitySubmission: {
        activity: Activity
    }
}
