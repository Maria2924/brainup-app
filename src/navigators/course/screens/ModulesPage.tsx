import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import * as React from "react";
import {CoursesLayouts} from "../layouts/CoursesLayouts";
import {Themed} from "../../../components/themed/Themed";
import {Module} from "../../../types/course";

type Props = NativeStackScreenProps<RootStackParamList, 'Modules', 'CourseNavigator'>;
export default function ModulesPage(props: Props) {
    return (
        <CoursesLayouts.PartViewAll
            subject={props.route.params.subject.name}
            part={"Modules"}
            navigation={props.navigation
        }>
            {props.route.params.subject.modules.map((module: Module) => (
                <Themed.SemiRoundedPressable text={module.name} key={module.id}></Themed.SemiRoundedPressable>
            ))}
        </CoursesLayouts.PartViewAll>
    )
}
