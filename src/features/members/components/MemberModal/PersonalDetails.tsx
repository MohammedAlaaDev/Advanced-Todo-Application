import InputError from "@/components/custom/InputError"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addTempPersonalDetails, selectPersonalDetails, selectStoredEmails } from "@/features/members/membersSlice"
import { personalDetailsSchema } from "@/features/members/schemas/personalDetailsSchema"
import { useInput } from "@/hooks/useInput"
import { useValidate } from "@/hooks/useValidate"
import type { TempPersonalDetails } from "@/types"
import { BriefcaseBusiness, Mail, Phone, User } from "lucide-react"
import { forwardRef, useImperativeHandle, useState, type Dispatch, type Ref, type SetStateAction } from "react"
import { useDispatch, useSelector } from "react-redux"
import type z from "zod"

export interface PersonalDetailsRef {
    handleStep: () => boolean;
}

export interface PersonalDetailsValidation {
    error: z.inferFormattedError<typeof personalDetailsSchema>;
    validate: (data: TempPersonalDetails, schema: typeof personalDetailsSchema, onSuccess: () => boolean | void) => boolean;
    shakeKey: number;
    setShakeKey: Dispatch<SetStateAction<number>>;
    setError: Dispatch<SetStateAction<any>>;
}

const PersonalDetails = ({ }, ref: Ref<PersonalDetailsRef>) => {

    const dispatch = useDispatch();

    const storedPersonalDetails = useSelector(selectPersonalDetails);

    const { error, shakeKey, setError, validate, setShakeKey } = useValidate() as PersonalDetailsValidation;

    const resetErrors = () => {
        if (error) {
            setError(null);
        }
        setEmailError("");
    }

    const nameInput = useInput(storedPersonalDetails.name || "", resetErrors);
    const roleInput = useInput(storedPersonalDetails.role || "", resetErrors);
    const emailInput = useInput(storedPersonalDetails.email || "", resetErrors);
    const phoneInput = useInput(storedPersonalDetails.phone || "", resetErrors);

    const storedEmails = useSelector(selectStoredEmails);

    const [emailError, setEmailError] = useState("");

    const inputData = [
        {
            id: "name",
            label: "Full Name (Required)",
            placeholder: "Ahmed Ali",
            type: "text",
            icon: <User className="size-4" />,
            errorMsg: error?.name?._errors?.[0] || "",
            ...nameInput,
        },
        {
            id: "role",
            label: "Role (Required)",
            placeholder: "Frontend Developer",
            type: "text",
            icon: <BriefcaseBusiness className="size-4" />,
            errorMsg: error?.role?._errors?.[0] || "",
            ...roleInput,
        },
        {
            id: "email",
            label: "Email Address (Required)",
            placeholder: "example@gmail.com",
            type: "text",
            icon: <Mail className="size-4" />,
            errorMsg: emailError || error?.email?._errors?.[0] || "",
            ...emailInput,
        },
        {
            id: "phone",
            label: "Phone Number (optional)",
            placeholder: "01*********",
            type: "text",
            icon: <Phone className="size-4" />,
            errorMsg: error?.phone?._errors?.[0] || "",
            ...phoneInput,
        },
    ]


    const getValueOf = (id: string) => {
        return inputData.find((data) => data.id === id)?.value.trim();
    }

    const handleStep = () => {

        const personalData: TempPersonalDetails = {
            name: getValueOf("name"),
            role: getValueOf("role"),
            email: getValueOf("email"),
            phone: getValueOf("phone"),
        }

        const duplicatedEmail = storedEmails.some((em: string) => em === personalData.email);

        if (duplicatedEmail) {
            setShakeKey(pre => pre + 1);
            setEmailError("Email is already taken");
        }

        const result = validate(personalData, personalDetailsSchema, () => {
            dispatch(addTempPersonalDetails(personalData));
        })

        if (!personalData.email || personalData.email.trim() === "") {
            setShakeKey(pre => pre + 1);
            setEmailError("Email is required");
            // will return false already because of zod ("result" variable is false)
        }

        if (duplicatedEmail) {
            return false;
        }

        return result;

    }

    useImperativeHandle(ref, () => ({
        handleStep,
    }))

    return (
        <div className="space-y-4">
            {
                inputData.map((input) => (
                    <div key={input.id}>
                        <Label htmlFor={input.id}>{input.label}</Label>
                        <div className="relative">
                            <div className="absolute left-3 top-3 text-muted-foreground">
                                {input.icon}
                            </div>
                            <Input
                                type={input.type}
                                id={input.id}
                                placeholder={input.placeholder}
                                className="pl-10"
                                {...input.bind}
                            />
                            <InputError key={input.id + shakeKey} message={input.errorMsg} />
                        </div>
                    </div>
                ))
            }
            <Button type="submit" className="hidden">
            </Button>
        </div>
    )
}

PersonalDetails.displayName = "PersonalDetails";

export default forwardRef(PersonalDetails);