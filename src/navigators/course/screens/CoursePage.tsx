import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../types";
import * as React from "react";
import {Subject} from "../../../components/subjects/Subject";
import type {Assessment, Subject as SubjectType} from "../../../types/course";
import {CoursesLayouts} from "../layouts/CoursesLayouts";
import {Themed} from "../../../components/themed/Themed";
import {useLanguage} from "../../../utils/useLanguage";

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
                                subject: {
                                    id: subject.id,
                                    name: subject.name,
                                    description: "Java is a widely used, object-oriented, " +
                                        "platform-independent programming language and software platform, " +
                                        "known for its simplicity, efficiency, and security, used to create  " +
                                        "various applications, from Android apps to enterprise software",
                                    assessments: [
                                        {
                                            id: "midterms",
                                            name: "Midterms Exam",
                                            score: null,
                                            questions: [
                                                {
                                                    id: "question-1",
                                                    text: "It is a software that can be used to write Java applications.",
                                                    type: "single_choice",
                                                    choices: [
                                                        { id: "webstorm", text: "Webstorm" },
                                                        { id: "goland", text: "Goland" },
                                                        { id: "intellij", text: "IntelliJ IDEA" },
                                                        { id: "rustrover", text: "RustRover" },
                                                    ]
                                                },
                                                {
                                                    id: "question-2",
                                                    text: "Write a code that outputs the following: Hello World",
                                                    type: "code",
                                                    language: useLanguage("java")
                                                },
                                                {
                                                    id: "question-3",
                                                    text: "Write a code in C that outputs the following: Hello World",
                                                    type: "code",
                                                    language: useLanguage("c")
                                                },
                                                {
                                                    id: "question-4",
                                                    text: "Write a code in Python that outputs the following: Hello World",
                                                    type: "code",
                                                    language: useLanguage("python")
                                                },
                                                {
                                                    id: "question-5",
                                                    text: "Write a code in Kotlin that outputs the following: Hello World",
                                                    type: "code",
                                                    language: useLanguage("kotlin")
                                                },
                                                {
                                                    id: "question-6",
                                                    text: "Write a code in C++ that outputs the following: Hello World",
                                                    type: "code",
                                                    language: useLanguage("cpp")
                                                },
                                            ]
                                        } as Assessment,
                                        {id: "pretest", name: "Pre-test", score: { received: 10, max: 50 }},
                                    ],
                                    activities: [
                                        {id: "calc", name: "Calculator App", status: "unanswered"},
                                        {id: "console-log", name: "Console Logging", status: "submitted"}
                                    ],
                                    modules: [
                                        {
                                            id: "java-basics",
                                            name: "Syntax of Java",
                                            attachments: [
                                                {
                                                    name: "syntax-of-java.pdf",
                                                    source: "https://staff.um.edu.mt/__data/assets/pdf_file/0010/57169/jn.pdf"
                                                }
                                            ],
                                            text: "In this module, you will learn about the syntax of Java and how it applies to Java applications."
                                        },
                                        {
                                            id: "java-advanced",
                                            name: "Setting up Java",
                                            attachments: [
                                                {
                                                    name: "java-installer.exe",
                                                    source: "https://www.java.com/en/download/manual.jsp"
                                                }
                                            ],
                                            text: "To set-up Java in your system, simply download the installer attached."
                                        },
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
