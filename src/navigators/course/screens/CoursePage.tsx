import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../types";
import * as React from "react";
import {Subject} from "../../../components/subjects/Subject";
import type {Subject as SubjectType} from "../../../types/course";
import {CoursesLayouts} from "../layouts/CoursesLayouts";
import {Themed} from "../../../components/themed/Themed";

type Props = NativeStackScreenProps<RootStackParamList, 'Course', 'CourseNavigator'>;
export default function CoursePage(props: Props) {
    return (
        <CoursesLayouts.Major title={props.route.params.course.name} description={props.route.params.course.description}>
            <Subject.Section title={"Subjects"}>
                {props.route.params.course.subjects.map((subject: SubjectType) => (
                    <Themed.SemiRoundedPressable
                        text={subject.name}
                        key={subject.id}
                        onPress={() => props.navigation.navigate('CourseNavigator', {
                            screen: "Subject",
                            params: {
                                subject: subject
                            }
                        })}
                    />
                ))}
            </Subject.Section>
        </CoursesLayouts.Major>
    )
}
