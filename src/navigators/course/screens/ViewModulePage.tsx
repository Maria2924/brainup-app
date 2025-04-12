import {CoursesLayouts} from "../layouts/CoursesLayouts";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {Module} from "../../../types/course";
import {Subject} from "../../../components/subjects/Subject";
import {Linking, Text, TouchableOpacity} from "react-native";
import {CloudDownload} from "lucide-react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'ViewModule', 'CourseNavigator'>;
export default function ViewModulePage({ route }: Props) {
    const { module } = route.params as { module: Module };
    return (
        <CoursesLayouts.Major title={module.name} description={module.text}>
            <Subject.Section title={"Attachments"}>
                {module.attachments.map((attachment) => {
                    return (
                        <TouchableOpacity key={attachment.name} className={"flex flex-row items-center gap-3"} onPress={() => Linking.openURL(attachment.source)}>
                            <CloudDownload size={24} color={"#72A925"}/>
                            <Text className={"font-insB text-lg"}>{attachment.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </Subject.Section>
        </CoursesLayouts.Major>
    )
}
