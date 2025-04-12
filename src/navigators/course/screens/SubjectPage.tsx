import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../types";
import * as React from "react";
import {Subject} from "../../../components/subjects/Subject";
import {CoursesLayouts} from "../layouts/CoursesLayouts";
import {Activity, Assessment, Module} from "../../../types/course";
import {Themed} from "../../../components/themed/Themed";

type Props = NativeStackScreenProps<RootStackParamList, 'Subject', 'CourseNavigator'>;
export default function SubjectPage(props: Props) {
    return (
        <CoursesLayouts.Major
            title={props.route.params.subject.name}
            description={props.route.params.subject.description}
        >
            <Subject.Section
                title={"Assessments"}
                onPressViewAll={() => {
                    props.navigation.navigate('CourseNavigator', {
                        screen: "Assessments",
                        params: {
                            subject: {
                                id: props.route.params.subject.id,
                                name: props.route.params.subject.name,
                                assessments: props.route.params.subject.assessments,
                            }
                        }
                    })
                }}
            >
                {props.route.params.subject.assessments.slice(0,2).map((assessment: Assessment) => (
                    <Themed.SemiRoundedPressable text={assessment.name} key={assessment.id}/>
                ))}
            </Subject.Section>
            <Subject.Section
                title={"Activities"}
                includeTopBorder
                onPressViewAll={() => {
                    props.navigation.navigate('CourseNavigator', {
                        screen: "Activities",
                        params: {
                            subject: {
                                id: props.route.params.subject.id,
                                name: props.route.params.subject.name,
                                activities: props.route.params.subject.activities,
                            }
                        }
                    })
                }}
            >
                {props.route.params.subject.activities.map((activity: Activity) => (
                    <Themed.SemiRoundedPressable text={activity.name} key={activity.id}/>
                ))}
            </Subject.Section>
            <Subject.Section
                title={"Modules"}
                includeTopBorder
                onPressViewAll={() => {
                    props.navigation.navigate('CourseNavigator', {
                        screen: "Modules",
                        params: {
                            subject: {
                                id: props.route.params.subject.id,
                                name: props.route.params.subject.name,
                                modules: props.route.params.subject.modules,
                            }
                        }
                    })
                }}
            >
                {props.route.params.subject.modules.map((module: Module) => (
                    <Themed.SemiRoundedPressable text={module.name} key={module.id}/>
                ))}
            </Subject.Section>
        </CoursesLayouts.Major>
    )
}
