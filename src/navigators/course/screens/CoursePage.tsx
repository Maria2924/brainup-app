import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../types";
import * as React from "react";
import {Subject} from "../../../components/subjects/Subject";
import {CoursesLayouts} from "../layouts/CoursesLayouts";

type Props = NativeStackScreenProps<RootStackParamList, 'Course', 'CourseNavigator'>;
export default function CoursePage(props: Props) {
    return (
        <CoursesLayouts.Major title={props.route.params.course.name} description={props.route.params.course.description}>
            <Subject.Section title={"Subjects"}>
                {props.route.params.course.subjects.map((subject) => (
                    <Subject.Pressable
                        text={subject.name}
                        key={subject.id}
                        onPress={() => props.navigation.navigate('CourseNavigator', {
                            screen: "Subject",
                            params: {
                                subject: {
                                    id: subject.id,
                                    name: subject.name,
                                    description: "Java is a widely used, object-oriented, " +
                                        "platform-independent programming language and software platform, " +
                                        "known for its simplicity, efficiency, and security, used to create  " +
                                        "various applications, from Android apps to enterprise software",
                                    assessments: [
                                        {id: "midterms", name: "Midterms Exam", score: null},
                                        {id: "pretest", name: "Pre-test", score: { received: 10, max: 50 }},
                                    ],
                                    activities: [
                                        {id: "calc", name: "Calculator App", status: "unanswered"},
                                        {id: "console-log", name: "Console Logging", status: "submitted"}
                                    ],
                                    modules: [
                                        {id: "java-basics", name: "Syntax of Java"},
                                        {id: "java-advanced", name: "Setting up Java"},
                                    ]
                                }
                            }
                        })}
                    />
                ))}
            </Subject.Section>
        </CoursesLayouts.Major>
    )
}
