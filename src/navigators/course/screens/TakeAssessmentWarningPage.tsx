import {Text, TouchableOpacity, View} from "react-native";
import {ArrowLeft} from "lucide-react-native";
import * as React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {Themed} from "../../../components/themed/Themed";

type Props = NativeStackScreenProps<RootStackParamList, 'TakeAssessmentWarning', 'CourseNavigator'>;
export default function TakeAssessmentWarningPage({ navigation, route }: Props) {
    return (
        <View
            className={"flex-1 flex flex-col justify-between bg-white"}
        >
            <View className="flex flex-col justify-between px-6 py-20 pb-6 bg-white border-b border-b-black">
                <View className={"flex flex-row items-center justify-between"}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <ArrowLeft className={"text-black"} size={32} color={"black"}/>
                    </TouchableOpacity>
                    <Text className={"font-insB text-[#1F1F1F] text-xl"}>{route.params.title}</Text>
                </View>
            </View>
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
                    <Themed.PrimaryActionButton.Container onClick={() => {}}>
                        <Themed.PrimaryActionButton.Text>Continue</Themed.PrimaryActionButton.Text>
                    </Themed.PrimaryActionButton.Container>
                </View>
            </View>
        </View>
    )
}
