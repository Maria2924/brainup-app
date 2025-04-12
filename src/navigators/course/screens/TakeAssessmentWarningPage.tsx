import {Text, View} from "react-native";
import * as React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {Themed} from "../../../components/themed/Themed";
import {LayoutParts} from "../../../components/layouts/LayoutParts";

type Props = NativeStackScreenProps<RootStackParamList, 'TakeAssessmentWarning', 'CourseNavigator'>;
export default function TakeAssessmentWarningPage({ route }: Props) {
    return (
        <LayoutParts.Containers.Light>
            <LayoutParts.Header title={route.params.title}/>
            <View className={"bg-[#D9D9D9] border-b border-black p-4 h-fit"}>
                <Text className={"font-insB text-[#212121]"}>You are about to take an assessment.</Text>
                <Text className={"font-ins text-[#101010]"}>
                    Closing the application, or going into background
                    while the assessment is ongoing will result in a
                    submission. You cannot retake the assessment
                    once it  is submitted.
                </Text>
            </View>
            <View className={"bg-white p-4 h-full"}>
                <View className={"absolute bottom-0 left-0 w-full m-4"} style={{ marginBottom: 280 }}>
                    <Themed.PrimaryActionButton.Container onClick={route.params.onContinue}>
                        <Themed.PrimaryActionButton.Text>Continue</Themed.PrimaryActionButton.Text>
                    </Themed.PrimaryActionButton.Container>
                </View>
            </View>
        </LayoutParts.Containers.Light>
    )
}
