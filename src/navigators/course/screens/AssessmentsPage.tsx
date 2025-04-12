import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {Text} from "react-native";
import * as React from "react";
import {CoursesLayouts} from "../layouts/CoursesLayouts";
import {Assessment} from "../../../types/course";
import {Themed} from "../../../components/themed/Themed";

type Props = NativeStackScreenProps<RootStackParamList, 'Assessments', 'CourseNavigator'>;
export default function AssessmentsPage(props: Props) {
    return (
        <CoursesLayouts.PartViewAll
            subject={props.route.params.subject.name}
            part={"Assessments"}
            navigation={props.navigation}
        >
            {props.route.params.subject.assessments.map((assessment: Assessment) => {
                return (
                    <Themed.SemiRoundedPressable text={assessment.name} key={assessment.id}>
                        {assessment.score ? (
                            <Text className={"text-xs leading-none text-[#303030] font-ins"}>
                                You scored {assessment.score.received} over {assessment.score.max} in this assessment.
                            </Text>
                        ) : (
                            <Text className={"text-xs leading-none text-[#AD0101] font-ins"}>
                                Unanswered
                            </Text>
                        )}
                    </Themed.SemiRoundedPressable>
                )
            })}
        </CoursesLayouts.PartViewAll>
    )
}
