import {AuthNavigatorParamList} from "./auth/AuthNavigator";
import {CourseNavigatorParamList} from "./course/CourseNavigator";

export type RootStackParamList = {
    HomeNavigator: {},
    AuthNavigator: {},
    CourseNavigator: {},
} &
    HomeNavigatorStackList &
    AuthNavigatorParamList &
    CourseNavigatorParamList;
