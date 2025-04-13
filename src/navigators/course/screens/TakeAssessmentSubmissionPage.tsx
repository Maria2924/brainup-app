import {Platform, Text, View} from "react-native";
import * as React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {Themed} from "../../../components/themed/Themed";
import {LayoutParts} from "../../../components/layouts/LayoutParts";

type Props = NativeStackScreenProps<RootStackParamList, 'TakeAssessmentSubmission', 'CourseNavigator'>;
export default function TakeAssessmentSubmissionPage({ navigation, route }: Props) {
    const { score, title } = route.params;
    return (
        <LayoutParts.Containers.Light>
            <LayoutParts.Header title={title} excludeBackButton={true}/>
            <View className={"bg-[#D9D9D9] border-b border-black p-4 h-fit"}>
                <Text className={"font-insB text-[#212121]"}>{
                    score ?
                        ("You scored " + score.received + " over " + score.max + " in this assessment.") :
                        ("This assessment will be manually graded by your instructor.")
                }</Text>
                <Text className={"font-ins text-[#101010]"}>
                    {
                        score ?
                            ("This assessment has been graded automatically. \n" +
                                "If you think there is a mistake during grading, \n" +
                                "please consult your instructor.") :
                            ("BrainUp cannot automatically provide a grade for this assessment as it contains items that require manual " +
                                "checking. You may check back later once your instructor has provided a grade.")
                    }
                </Text>
            </View>
            <View className={"bg-white p-4 h-full"}>
                <View className={"absolute bottom-0 left-0 w-full m-4"} style={{ marginBottom: Platform.OS === "ios" ? score ? 280 : 300 : 200 }}>
                    <Themed.PrimaryActionButton.Container onClick={() => navigation.replace("HomeNavigator", {
                        screen: "Home",
                    })}>
                        <Themed.PrimaryActionButton.Text>Okay</Themed.PrimaryActionButton.Text>
                    </Themed.PrimaryActionButton.Container>
                </View>
            </View>
        </LayoutParts.Containers.Light>
    )
}
