import {CoursesLayouts} from "../layouts/CoursesLayouts";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {Activity} from "../../../types/course";
import {Subject} from "../../../components/subjects/Subject";
import {Text, TouchableOpacity, View} from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import {useState} from "react";
import {toast} from "../../../utils/toast";
import {XIcon} from "lucide-react-native";
import {Themed} from "../../../components/themed/Themed";
import * as React from "react";
import {LayoutParts} from "../../../components/layouts/LayoutParts";

type Props = NativeStackScreenProps<RootStackParamList, 'ActivitySubmission', 'CourseNavigator'>;
export default function ActivitySubmissionPage({ navigation, route }: Props) {
    const { activity } = route.params as { activity: Activity };
    const [selectedDocuments, setSelectedDocuments] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

    const selectFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({multiple: true});
        if (!result.canceled) {
            const successResult = result as DocumentPicker.DocumentPickerSuccessResult;

            // To limit the amount of documents that is added to the array "selectedDocuments"
            if (selectedDocuments.length + successResult.assets.length <= 5) {
                setSelectedDocuments((prevSelectedDocuments) => [
                    ...prevSelectedDocuments,
                    ...successResult.assets,
                ]);
            } else {
                toast("Failed to upload files!", "You cannot upload more than 5 files per activity.");
            }
        }
    }

    const submit = () => {
        if (selectedDocuments.length > 0) {
            navigation.replace("CourseNavigator", {
                screen: "ActivitySubmission",
                params: {
                    activity: {
                        ...activity,
                        status: "submitted"
                    }
                }
            })
        } else {
            toast("Failed to submit activity!", "You must upload at least 1 file.");
        }
    }

    if (activity.status === "submitted") {
        return (
            <LayoutParts.Containers.Light>
                <LayoutParts.Header title={activity.name}/>
                <View className={"bg-[#D9D9D9] border-b border-black p-6 h-fit"}>
                    <Text className={"font-insB text-[#212121]"}>You have submitted your activity.</Text>
                    <Text className={"font-ins text-[#101010] mt-2"}>
                        The instructor will be the one to evaluate your activity, you may consult them later on for feedback and other details.
                    </Text>
                </View>
                <View className={"bg-white p-4 h-full"}>
                    <View className={"absolute bottom-0 left-0 w-full m-4"} style={{ marginBottom: 300 }}>
                        <Themed.PrimaryActionButton.Container
                            onClick={() => navigation.pop()}
                        >
                            <Themed.PrimaryActionButton.Text>Okay</Themed.PrimaryActionButton.Text>
                        </Themed.PrimaryActionButton.Container>
                    </View>
                </View>
            </LayoutParts.Containers.Light>
        )
    }

    return (
        <CoursesLayouts.Major
            title={activity.name}
            description={activity.text}
            scrollViewClassName={"h-fit flex-1"}
            footerClassName={"flex-1"}
            footer={(
                <>
                    <View className={"absolute bottom-0 left-0 w-full mx-4"} style={{ marginBottom: 30 }}>
                        <View>
                            <Text className={"font-ins text-[#BDBDBD] text-xs p-2 mx-auto"}>Note: You cannot change your submission upon submitting.</Text>
                            <Themed.PrimaryActionButton.Container
                                disabled={selectedDocuments.length === 0}
                                onClick={submit}
                            >
                                <Themed.PrimaryActionButton.Text>Submit</Themed.PrimaryActionButton.Text>
                            </Themed.PrimaryActionButton.Container>
                        </View>
                    </View>
                </>
            )}
        >
            <Subject.Section title={"Submission"}>
                {selectedDocuments.length <= 0 && (
                    <TouchableOpacity className={"w-full h-[150] border rounded-lg border-black border-dotted"} onPress={selectFile}>
                        <View className={"flex flex-col h-full align-middle items-center justify-center"}>
                            <Text className={"font-insS text-[#989797] text-lg"}>Click here to upload file.</Text>
                        </View>
                    </TouchableOpacity>
                )}
                {selectedDocuments.length > 0 && (
                    <View className={"flex flex-col gap-1"}>
                        {selectedDocuments.map((document) => {
                            return (
                                <View key={document.uri} className={"flex flex-row items-center gap-3"}>
                                    <TouchableOpacity onPress={() => {
                                        setSelectedDocuments((prev) => {
                                            return prev.filter((val) => val.uri !== document.uri)
                                        })
                                    }}>
                                        <XIcon size={24} color={"#CF5959"}/>
                                    </TouchableOpacity>
                                    <Text className={"font-insB text-[#212121] max-w-sm break-all"}>
                                        {document.name}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                )}
            </Subject.Section>
        </CoursesLayouts.Major>
    )
}
