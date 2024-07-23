"use client";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Chip,
    Select,
    Selection,
    SelectItem,
    Spacer, Spinner,
    Textarea,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Input } from "@nextui-org/input";
import { FieldError, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/useToast";
import { LiaTimesSolid } from "react-icons/lia";
import {zodFormSchema} from "@/lib/validation";

enum Domain {
    STUDY = "Học Tập",
    LIFE = "Cuộc Sống",
    CAREER = "Sự Nghiệp",
    RELATIONSHIP = "Mối Quan Hệ",
    PRACTICE = "Thực Tập",
    MENTAL = "Tâm Lý",
    ORIENTATION = "Hướng Nghiệp",
    SOFT_SKILL = "Kỹ Năng Mềm",
    FINANCE_SUPPORT = "Hỗ Trợ Tài Chính",
    LEARNING_METHOD = "Phương Pháp Học Tập",
    SCHOOL_ACTIVITY = "Hoạt Động Trường",
    SCHOOL_POLICY = "Chính Sách Trường",
    SCHOOL_SERVICE = "Dịch Vụ Trường",
    SCHOOL_FACILITY = "Cơ Sở Vật Chất",
    SCHOOL_TEACHER = "Giáo Viên",
    SCHOOL_STUDENT = "Sinh Viên",
    SCHOOL_ALUMNI = "Cựu Sinh Viên",
    SCHOOL_RECRUITMENT = "Tuyển Sinh",
    SCHOOL_EXAM = "Kỳ Thi",
    SCHOOL_GRADUATION = "Tốt Nghiệp",
    SCHOOL_CERTIFICATE = "Bằng Cấp",
    SCHOLARSHIP = "Học Bổng",
}

type DomainType = keyof typeof Domain;

type FormValues = {
    name: string;
    email: string;
    domains: DomainType[];
    questions: string[];
};

export default function Home() {
    const [questions, setQuestions] = useState<
        Record<`questions.${number}`, string>
    >({
        "questions.0": "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [errorRes, setErrorRes] = useState<string | null>(null);
    const [isDisableButton, setIsDisableButton] = useState<boolean>(false);
    const [schoolName, setSchoolName] = useState<string>("PTIT");
    const [selectedDomain, setSelectedDomain] = useState<Selection>(new Set([]));
    const [isSendSuccess, setIsSendSuccess] = useState<boolean>(false);

    const {
        success: successToast,
        error: errorToast,
        info: infoToast,
        warning: warningToast,
    } = useToast();

    const { getValues, handleSubmit, formState, setValue, setError } =
        useForm<FormValues>({
            resolver: zodResolver(zodFormSchema),
        });

    const handleSelectDomain = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDomain(new Set(e.target.value.split(",")));
        setValue("domains", e.target.value.split(",") as DomainType[]);
    };

    const handleAddQuestion = () => {
        console.log(formState.errors.questions?.[2] !== undefined);
        const questionLength = Object.keys(questions).length;
        if (questions[`questions.${questionLength - 1}`].trim() === "") {
            setError(
                `questions.${questionLength - 1}`,
                {
                    type: "required",
                    message: "Câu hỏi không được để trống",
                },
                {
                    shouldFocus: true,
                }
            );
            return;
        }

        setValue("questions", [...getValues("questions"), ""]);
        setQuestions((prev) => ({
            ...prev,
            [`questions.${questionLength}`]: "",
        }));
    };

    const clearQuestion = (index: number) => {
        let newQuestions = { ...questions };
        delete newQuestions[`questions.${index}`];
        // delete item in array
        newQuestions = Object.keys(newQuestions).reduce((acc, key, i) => {
            acc[`questions.${i}`] = newQuestions[key as `questions.${number}`];
            return acc;
        }, {} as Record<`questions.${number}`, string>);
        // set new questions
        setQuestions(newQuestions);
        setValue(
            "questions",
            getValues("questions").filter((_, i) => i !== index)
        );
    };

    const sendQuestion = async (data: FormValues) => {
        setIsDisableButton(true);
        try {
            const res = await fetch("/api/send-question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                successToast("Gửi câu hỏi thành công!");
            } else {
                errorToast("Gửi câu hỏi thất bại!");
            }
        } catch (error: any) {
            errorToast("Gửi câu hỏi thất bại!");
        } finally {
            setIsDisableButton(false);
        }
    };

    const onSubmit = async (data: FormValues) => {
        console.log(data);
        await sendQuestion(data);
        return;
    };

    const onInvalidForm = (errors: FieldErrors<FormValues>) => {
        console.log(errors);
    };

    useEffect(() => {}, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-5 md:p-24 bg-gray-950/80 bg-gradient ">
            <div className="z-10 w-full max-w-5xl items-center justify-start font-mono text-sm flex flex-col">
                <Card>
                    <CardBody>
                        <p className={"text-xs"}>
                            Bạn Cần Tư Vấn Về Điều Gì? Trường Đại học{" "}
                            <span className={"text-red-400 font-bold"}>{schoolName}</span>{" "}
                            luôn nỗ lực cải thiện chất lượng dịch vụ tư vấn cho sinh viên. Hãy
                            dành 2 phút để cho chúng tôi biết bạn cần được hỗ trợ gì nhất
                            thông qua khảo sát ngắn gọn này. Mọi thông tin của bạn đều được
                            bảo mật tuyệt đối.
                        </p>
                    </CardBody>
                    <CardFooter>
                        <p className={"text-white text-medium font-bold"}>
                            Tham gia khảo sát ngay!
                        </p>
                    </CardFooter>
                </Card>
                <Spacer y={5} />
                <Input
                    size={"sm"}
                    radius={"lg"}
                    type="text"
                    label="Họ và tên"
                    onChange={(e) => setValue('name', e.target.value)}
                />
                <Spacer y={5} />
                <Select
                    label="Nội dung"
                    labelPlacement={"outside-left"}
                    radius={"lg"}
                    className="max-w-md w-full dark"
                    size={"sm"}
                    isMultiline={true}
                    selectionMode="multiple"
                    selectedKeys={selectedDomain}
                    onChange={handleSelectDomain}
                    classNames={{
                        base: "flex items-center",
                        popoverContent: "bg-gray-950/80 backdrop-blur",
                        innerWrapper: "py-1.5",
                        label: "whitespace-nowrap text-white",
                    }}
                    renderValue={(items) => {
                        return (
                            <div className={"flex flex-wrap gap-1"}>
                                {items.map((item) => (
                                    <Chip key={item.key} className={"h-6"}>
                                        {item.textValue}
                                    </Chip>
                                ))}
                            </div>
                        );
                    }}
                >
                    {Object.keys(Domain).map((key) => (
                        <SelectItem key={`domain-${key}`}>
                            {Domain[key as DomainType]}
                        </SelectItem>
                    ))}
                </Select>

                <Spacer y={5} />
                <Input
                    size={"sm"}
                    radius={"lg"}
                    type="email"
                    label="Email"
                    onChange={(e) => setValue("email", e.target.value)}
                    isInvalid={formState.errors.email !== undefined}
                    errorMessage={formState.errors.email?.message}
                />
                <Spacer y={5} />
                <Textarea
                    autoCapitalize={"none"}
                    autoCorrect={"off"}
                    autoComplete={"off"}
                    spellCheck={false}
                    label="Nhập câu hỏi của bạn vào đây..."
                    // placeholder=""
                    value={questions["questions.0"]}
                    onChange={(e) => {
                        const value = e.target.value;
                        setError(
                            "questions.0",
                            !value ? { message: "Câu hỏi không được để trống" } : {}
                        );
                        setValue("questions.0", e.target.value);
                        setQuestions((prev) => ({
                            ...prev,
                            "questions.0": e.target.value,
                        }));
                    }}
                    size={"lg"}
                    classNames={{
                        input: "bg-gray-950/80 text-white",
                        innerWrapper: "",
                        label: "text-white text-medium",
                        mainWrapper: "h-fit",
                    }}
                    className={"bg-gray-950/80 text-white max-h-60 max-w-md"}
                    isInvalid={formState.errors.questions?.[0]?.message !== undefined}
                    errorMessage={formState.errors.questions?.[0]?.message}
                />
                {Object.keys(questions).map((key, index) => {
                    if (key === "questions.0") return null;
                    return (
                        <Input
                            key={key}
                            autoCapitalize={"none"}
                            autoCorrect={"off"}
                            autoComplete={"off"}
                            spellCheck={false}
                            label={`${index}`}
                            labelPlacement={"outside-left"}
                            // placeholder=""
                            value={questions[key as `questions.${number}`]}
                            onChange={(e) => {
                                const value = e.target.value;
                                setError(
                                    key as `questions.${number}`,
                                    !value ? { message: "Câu hỏi không được để trống" } : {}
                                );
                                setValue(key as `questions.${number}`, e.target.value);
                                setQuestions((prev) => ({ ...prev, [key]: e.target.value }));
                            }}
                            size={"lg"}
                            classNames={{
                                input: "bg-gray-950/80 text-white",
                                innerWrapper: "",
                                label: "text-white text-medium px-2",
                                mainWrapper: "h-fit flex-grow",
                            }}
                            className={
                                "bg-gray-950/80 text-white max-h-60 max-w-md mt-2 w-full"
                            }
                            isInvalid={
                                formState.errors.questions?.[index]?.message !== undefined
                            }
                            errorMessage={formState.errors.questions?.[index]?.message}
                            endContent={
                                <div
                                    onClick={clearQuestion.bind(null, index)}
                                    className={
                                        "w-7 h-7 flex items-center justify-center cursor-pointer rounded-lg hover:bg-opacity-70"
                                    }
                                >
                                    <LiaTimesSolid />
                                </div>
                            }
                        />
                    );
                })}
                <Spacer y={5} />
                <div className={"flex gap-5 w-full max-w-md"}>
                    <Button
                        size={"lg"}
                        onClick={handleAddQuestion}
                        className={"w-8 px-0 min-w-12 "}
                    >Add</Button>
                    <Button
                        size={"lg"}
                        radius="md"
                        className="bg-gradient-to-tr from-blue-800 to-blue-900 text-white shadow-lg w-full max-w-xs"
                        startContent={
                            isDisableButton ? <Spinner color={"white"} size={"md"}/> : <IoIosSend size={24} />
                        }
                        onClick={handleSubmit(onSubmit, onInvalidForm)}
                        disabled={isDisableButton}
                    >
                        Gửi
                    </Button>
                </div>
                <Spacer y={5} />

            </div>
        </main>
    );
}
