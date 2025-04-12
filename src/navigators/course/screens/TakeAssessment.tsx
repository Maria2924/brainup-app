import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {LayoutParts} from "../../../components/layouts/LayoutParts";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useRef, useState} from "react";
import * as React from "react";
import {Question} from "../../../types/course";
import {Themed} from "../../../components/themed/Themed";
import {WithId} from "../../../types/commons";
import {CirclePause, CirclePlay} from "lucide-react-native";
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';

type Props = NativeStackScreenProps<RootStackParamList, 'TakeAssessment', 'CourseNavigator'>;
export default function TakeAssessment({ navigation, route }: Props) {
    const { assessment } = route.params;
    const questions: Question[] = assessment.questions;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [compilationState, setCompilationState] = useState({
        state: "none",
        output: ""
    } as {
        state: "none" | "compiling" | "compiled",
        output: string,
        controller: AbortController | null,
    });

    const currentCode = useRef("");
    const answers = useRef([] as { id: string, choice?: WithId & {text:string}, code?: string }[]);

    const currentQuestion = questions[currentIndex];

    const submitChoiceAnswer = (choice: WithId & {text:string}) => {
        answers.current[currentIndex] = { id: currentQuestion.id, choice: choice }
        if (currentIndex >= (questions.length - 1)) {
            navigation.replace("CourseNavigator", {
                screen: "TakeAssessmentSubmission",
                params: {
                    title: assessment.name,
                    score: { received: 10, max: 50 }
                }
            })
            return
        }

        setCurrentIndex((prev) => prev + 1);
    }

    const submitCodeAnswer = () => {
        answers.current[currentIndex] = { id: currentQuestion.id, code: currentCode.current };
        if (currentIndex >= (questions.length - 1)) {
            navigation.replace("CourseNavigator", {
                screen: "TakeAssessmentSubmission",
                params: {
                    title: assessment.name,
                    score: null
                }
            })
            return
        }

        if (compilationState.controller) {
            compilationState.controller.abort();
        }
        setCompilationState({ state: "none", output: "", controller: null });
        setCurrentIndex((prev) => prev + 1);
        currentCode.current = "";
    }

    const runCode = async () => {
        const abortController = new AbortController();
        setCompilationState({ state: "compiling", output: "Compiling...", controller: abortController })
        console.debug(`Compiling using ${currentQuestion.language?.compiler}.`)
        const response = await fetch(`https://godbolt.org/api/compiler/${currentQuestion.language?.compiler!}/compile`, {
            method: "POST",
            body: JSON.stringify({
                source: currentCode.current,
                options: {
                    "compilerOptions": {
                        "executorRequest": true
                    },
                    "filters": {
                        "execute": true
                    },
                }
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            signal: abortController.signal
        });
        if (response.status === 200) {
            try {
                const text = await response.text();
                console.debug(text)

                setTimeout(() => {
                    setCompilationState({
                        state: "compiled",
                        output: text,
                        controller: null,
                    });
                }, 250);
                return
            } catch (e: any) {
                setTimeout(() => {
                    setCompilationState({
                        state: "compiled",
                        output: `An error occurred: ${e}`,
                        controller: null,
                    })
                }, 250);
                console.debug("err", e)
            }
        }
        const body = await response.json();
        setTimeout(() => {
            setCompilationState({
                state: "compiled",
                output: `An error occurred: ${JSON.stringify(body)}`,
                controller: null,
            })
        }, 250);
    }

    return (
        <LayoutParts.Containers.Gray>
            <LayoutParts.Header title={route.params.assessment.name} excludeBackButton={true}/>
            <ScrollView contentContainerClassName={"flex-1 flex flex-col h-full"}>
                <View className={"bg-[#D9D9D9] border-b border-black p-6 h-fit"}>
                    <Text className={"font-insB text-[#212121]"}>Question {currentIndex + 1}.</Text>
                    <Text className={"font-ins text-[#101010]"}>{currentQuestion.text}</Text>
                </View>
                <View className={"bg-[#D9D9D9] p-6 h-fit"}>
                    {currentQuestion.type === "single_choice" && (currentQuestion.choices?.length ?? 0 > 0) && (
                        <>
                            <Text className={"font-insB text-[#212121] text-lg"}>
                                Choices
                                <Text className={"text-red-500"}>*</Text>
                            </Text>
                            <View className={"flex flex-col gap-3 my-2"}>
                                {currentQuestion.choices?.map((choice) => {
                                    return (
                                        <Themed.SemiRoundedPressable
                                            text={choice.text}
                                            onPress={() => submitChoiceAnswer(choice)}
                                            key={choice.id}
                                        />
                                    )
                                })}
                            </View>
                        </>
                    )}
                    {currentQuestion.type === "code" && (
                        <>
                            {compilationState.state === "none" && (
                                <>
                                    <View className={"flex flex-row justify-between items-center"}>
                                        <Text className={"font-insB text-[#212121] text-lg"}>Editor ({currentQuestion.language?.text})</Text>
                                        <TouchableOpacity onPress={runCode}>
                                            <CirclePlay size={21} color={"green"}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <CodeEditor
                                            key={`editor-${currentIndex}`}
                                            style={{
                                                fontSize: 14,
                                                inputLineHeight: 18,
                                                highlighterLineHeight: 18,
                                                height: 300,
                                                marginTop: 10
                                            }}
                                            initialValue={currentCode.current}
                                            language={currentQuestion.language!.code}
                                            syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
                                            showLineNumbers
                                            autoFocus={false}
                                            onChange={(newValue) => {
                                                currentCode.current = newValue;
                                            }}
                                        />
                                    </View>
                                </>
                            )}
                            {
                                (compilationState.state === "compiling" || compilationState.state === "compiled") &&
                                compilationState.output !== "" && (
                                <>
                                    <View className={"flex flex-row justify-between items-center"}>
                                        <Text className={"font-insB text-[#212121] text-lg"}>Output</Text>
                                        <TouchableOpacity onPress={() => {
                                            if (compilationState.controller) {
                                                compilationState.controller.abort();
                                            }

                                            setCompilationState({ state: "none", output: "", controller: null });
                                        }}>
                                            <CirclePause size={21} color={"red"}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        {(compilationState.state === "compiling") && (
                                            <CodeEditor
                                                style={{
                                                    fontSize: 14,
                                                    inputLineHeight: 18,
                                                    highlighterLineHeight: 18,
                                                    height: 300,
                                                    marginTop: 10
                                                }}
                                                readOnly={true}
                                                initialValue={"Compiling... this may take awhile"}
                                                language={"markdown"}
                                                syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
                                                showLineNumbers={false}
                                                autoFocus={false}
                                            />
                                        )}
                                        {(compilationState.state === "compiled") && (
                                            <CodeEditor
                                                style={{
                                                    fontSize: 14,
                                                    inputLineHeight: 18,
                                                    highlighterLineHeight: 18,
                                                    height: 300,
                                                    marginTop: 10
                                                }}
                                                readOnly={true}
                                                initialValue={
                                                    compilationState.output
                                                        .replace("# Compilation provided by Compiler Explorer at https://godbolt.org/\n\n", "")
                                                        .replace("Standard out:\n", "")
                                                        .replace("Standard error:\n", "")
                                                }
                                                language={"markdown"}
                                                syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
                                                showLineNumbers={false}
                                                autoFocus={false}
                                            />
                                        )}
                                    </View>
                                </>
                            )}
                        </>
                    )}
                </View>
            </ScrollView>
            {currentQuestion.type === "code" && (
                <View className={"p-4 h-fit"}>
                    <View className={"absolute bottom-0 left-0 w-full m-4"} style={{ marginBottom: 30 }}>
                        <Themed.PrimaryActionButton.Container onClick={submitCodeAnswer}>
                            <Themed.PrimaryActionButton.Text>Submit</Themed.PrimaryActionButton.Text>
                        </Themed.PrimaryActionButton.Container>
                    </View>
                </View>
            )}
        </LayoutParts.Containers.Gray>
    )
}
