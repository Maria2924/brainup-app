import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {Text} from "react-native";
import * as React from "react";
import {CoursesLayouts} from "../layouts/CoursesLayouts";
import {Subject} from "../../../components/subjects/Subject";

type Props = NativeStackScreenProps<RootStackParamList, 'Activities', 'CourseNavigator'>;
export default function ActivitiesPage(props: Props) {
    return (
        <CoursesLayouts.PartViewAll
            subject={props.route.params.subject.name}
            part={"Activities"}
            navigation={props.navigation}
        >
            {props.route.params.subject.activities.map((activity) => {
                return (
                    <Subject.Pressable text={activity.name} key={activity.id}>
                        {activity.status === "submitted" ? (
                            <Text className={"text-xs leading-none text-[#303030] font-ins"}>
                                Submitted
                            </Text>
                        ) : (
                            <Text className={"text-xs leading-none text-[#AD0101] font-ins"}>
                                Unanswered
                            </Text>
                        )}
                    </Subject.Pressable>
                )
            })}
        </CoursesLayouts.PartViewAll>
    )
}
