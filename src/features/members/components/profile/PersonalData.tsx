import { Check, Clock, Mail, PenLine, Phone, Star, Tag, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { emailSchema, phoneSchema } from "@/features/members/schemas/personalDetailsSchema";
import InputError from "@/components/InputError";
import { Textarea } from "@/components/ui/textarea";
import { descriptionSchema } from "@/features/members/schemas/descriptionSchema";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { editDescription, editEmail, editPhone, selectStored } from "@/features/members/membersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef, type Dispatch, type SetStateAction, useState } from "react";
import type { PreventableEvent } from "@/types";
import { type MemberEmailError, type DescriptionError, type MemberObject, type MemberPhoneError } from "@/features/members/types";
import { useValidate } from "@/hooks/useValidate";
import { useErrorNavigation } from "@/hooks/useErrorNavigation";

interface PersonalDataProps {
    member?: MemberObject;
    setDescriptionEditMode: Dispatch<SetStateAction<boolean>>;
    setEmailEditMode: Dispatch<SetStateAction<boolean>>;
    setPhoneEditMode: Dispatch<SetStateAction<boolean>>;
    resetEditModes: () => void;
    descriptionEditMode: boolean;
    emailEditMode: boolean;
    phoneEditMode: boolean;
}

const PersonalData = ({
    member,
    descriptionEditMode,
    emailEditMode,
    phoneEditMode,
    setDescriptionEditMode,
    setEmailEditMode,
    setPhoneEditMode,
    resetEditModes,
}: PersonalDataProps
) => {

    // Refs 
    const descriptionRef = useRef<null | HTMLTextAreaElement>(null);
    const emailInputRef = useRef<null | HTMLInputElement>(null);
    const phoneInputRef = useRef<null | HTMLInputElement>(null);

    const dispatch = useDispatch();
    const createExactDate = format(member?.createdAt || new Date(), "dd MMM yyyy, hh:mm a");

    const descriptionValidation = useValidate<DescriptionError>();
    const emailValidation = useValidate<MemberEmailError>();
    const phoneValidation = useValidate<MemberPhoneError>();

    const descriptionFormRef = useErrorNavigation(descriptionValidation.shakeKey);
    const emailFormRef = useErrorNavigation(emailValidation.shakeKey);
    const phoneFormRef = useErrorNavigation(phoneValidation.shakeKey);

    const descriptionError = descriptionValidation.error?.text;

    const [requiredOrDuplicatedEmailError, setRequiredOrDuplicatedEmailError] = useState("");
    const emailError = emailValidation.error?.email;

    const [duplicatedPhoneError, setDuplicatedPhoneError] = useState("");
    const phoneError = phoneValidation.error?.phone


    const { storedEmails, storedPhoneNumbers } = useSelector(selectStored);

    const handleDescriptionEdit = (e?: PreventableEvent) => {
        e?.preventDefault();

        const data = {
            text: descriptionRef.current?.value.trim(),
        }

        descriptionValidation.validate(data, descriptionSchema, () => {
            if (member) dispatch(editDescription({ id: member.id, description: data }));
            setDescriptionEditMode(false);
        })

    }

    const handleEmailEdit = (e?: PreventableEvent) => {
        e?.preventDefault();

        const data = {
            email: emailInputRef.current?.value.trim(),
        }

        if (!data.email) {
            emailValidation.setShakeKey((p) => p + 1);
            setRequiredOrDuplicatedEmailError("email is required");
            return;
        }

        emailValidation.validate(data, emailSchema, () => {

            const duplicated = storedEmails.includes(data.email!);

            if (duplicated) {
                emailValidation.setShakeKey((p) => p + 1);
                setRequiredOrDuplicatedEmailError("this email is already taken");
                return;
            }

            if (member) dispatch(editEmail({ id: member.id, personalDetails: { ...member.personalDetails, email: data.email! } }));
            setEmailEditMode(false);

        })

    }

    const handlePhoneEdit = (e?: PreventableEvent) => {
        e?.preventDefault();
        if (phoneInputRef.current) {

            const data = {
                phone: phoneInputRef.current.value.trim(),
            }

            if (data.phone === member?.personalDetails.phone) {
                setPhoneEditMode(false);
                return;
            }

            const duplicated = storedPhoneNumbers.includes(data.phone!);

            if (duplicated) {
                phoneValidation.setShakeKey((p) => p + 1);
                setDuplicatedPhoneError("this number is already taken");
                return;
            }

            phoneValidation.validate(data, phoneSchema, () => {
                if (member) dispatch(editPhone({ id: member.id, personalDetails: { ...member.personalDetails, phone: data.phone } }));
                setPhoneEditMode(false);
            })

        }
    }

    const openEmailInput = () => {
        resetEditModes();
        emailValidation.setError(null);
        setRequiredOrDuplicatedEmailError("");
        setEmailEditMode(true);
        setTimeout(() => {
            emailInputRef.current?.focus();
        }, 0);
    }

    const openPhoneInput = () => {
        resetEditModes();
        phoneValidation.setError(null);
        setDuplicatedPhoneError("");
        setPhoneEditMode(true);
        setTimeout(() => {
            phoneInputRef.current?.focus();
        }, 0);
    }

    const openDescriptionInput = () => {
        resetEditModes();
        descriptionValidation.setError(null);
        setDescriptionEditMode(true);
        setTimeout(() => {
            descriptionRef.current?.focus();
        }, 0);
    }

    return (
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-20 px-4 md:px-2">

            <div className="flex flex-col gap-y-7 justify-start">
                {/* Joined At */}
                <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 opacity-70" />
                        <span className="font-medium">Joined At</span>
                    </div>
                    <span className="text-foreground/80 font-medium">{createExactDate}</span>
                </div>

                {/* Tags */}
                <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                    <div className="flex items-center gap-2">
                        <Tag className="w-5 h-5 opacity-70" />
                        <span className="font-medium">Top Tags</span>
                    </div>

                    <div className="flex flex-wrap gap-2  justify-start lg:justify-start">
                        {
                            member?.skillsAndSocials?.stackAndLinks?.stack.map((tech, idx: number) => (
                                idx < 3 &&
                                <span key={idx} className="px-3 py-1 rounded-lg bg-primary text-white text-xs font-bold">{tech}</span>
                            ))
                        }
                    </div>
                </div>

                {/* Email */}
                <div className="flex gap-x-5 gap-y-2 justify-start items-start flex-wrap">
                    <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 opacity-70" />
                        <span className="font-medium">Email</span>
                    </div>
                    {
                        emailEditMode ?
                            <form
                                ref={emailFormRef}
                                onSubmit={handleEmailEdit}
                                className="flex flex-col gap-2">
                                <Input
                                    placeholder="Enter your email"
                                    className="max-w-48"
                                    defaultValue={member?.personalDetails?.email}
                                    ref={emailInputRef}
                                />
                                <Button type="submit" className="hidden">
                                </Button>
                                <div>
                                    <InputError key={emailValidation.shakeKey} message={emailError?._errors[0] || requiredOrDuplicatedEmailError} className="mb-2" />
                                    <div className="flex gap-2 items-center">
                                        <Button className="w-6 h-6 text-white" onClick={() => {
                                            setEmailEditMode(false)
                                        }}>
                                            <X className="w-6 h-6 text-white" />
                                        </Button>
                                        <Button className="w-6 h-6 text-white" onClick={handleEmailEdit}>
                                            <Check className="w-6 h-6 text-white" />
                                        </Button>
                                    </div>
                                </div>
                            </form>
                            :
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-foreground/80 font-medium">{member?.personalDetails?.email}</p>
                                    <Button
                                        onClick={() => {
                                            openEmailInput();
                                        }}
                                        className="w-6 h-6 text-white">
                                        <PenLine className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                    }
                </div>

                {/* Phone */}
                <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                    <div className="flex items-start gap-2">
                        <Phone className="w-5 h-5 opacity-70" />
                        <span className="font-medium">phone</span>
                        {
                            phoneEditMode ?
                                <form
                                    ref={phoneFormRef}
                                    onSubmit={handlePhoneEdit}
                                    className="flex flex-col gap-2">
                                    <Input
                                        placeholder="Enter your phone number"
                                        className="max-w-48"
                                        defaultValue={member?.personalDetails?.phone}
                                        ref={phoneInputRef}
                                    />
                                    <Button type="submit" className="hidden">
                                    </Button>
                                    <div>
                                        <InputError key={phoneValidation.shakeKey} message={phoneError?._errors[0] || duplicatedPhoneError} className="mb-2" />
                                        <div className="flex gap-2 items-center">
                                            <Button className="w-6 h-6 text-white" onClick={() => {
                                                setPhoneEditMode(false)
                                            }}>
                                                <X className="w-6 h-6 text-white" />
                                            </Button>
                                            <Button className="w-6 h-6 text-white" onClick={handlePhoneEdit}>
                                                <Check className="w-6 h-6 text-white" />
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                                :
                                <>
                                    <span className="text-foreground/80 font-medium">{member?.personalDetails?.phone || "Not Included"}</span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={() => {
                                                openPhoneInput();
                                            }}
                                            className="w-6 h-6 text-white">
                                            <PenLine className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </>
                        }
                    </div>

                </div>

                {/* Rating */}
                <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 opacity-70" />
                        <span className="font-medium">rating</span>
                    </div>
                    <span className="text-foreground/80 font-medium">{member?.rating?.avgRating?.toFixed(1) || "Not rated"}</span>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-4 lg:flex lg:justify-center">
                <div className="lg:w-[70%]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">Bio</h3>
                    </div>
                    <div className="relative group flex flex-wrap gap-2 items-end">
                        {
                            descriptionEditMode ?
                                <>
                                    <form ref={descriptionFormRef} onSubmit={handleDescriptionEdit} className="flex flex-col gap-2">
                                        <Textarea
                                            defaultValue={member?.description.text}
                                            placeholder="Tell the world about yourself"
                                            className="max-h-40 max-w-full"
                                            ref={descriptionRef}
                                        />
                                        <Button type="submit" className="hidden" />
                                    </form>
                                    <div>
                                        <InputError key={descriptionValidation.shakeKey} message={descriptionError?._errors[0]} className="mb-2" />
                                        <div className="flex gap-2 items-end justify-start">
                                            <Button
                                                onClick={() => {
                                                    setDescriptionEditMode(false);
                                                }}
                                                className="w-6 h-6 text-white">
                                                <X className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={handleDescriptionEdit}
                                                className="w-6 h-6 text-white">
                                                <Check className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <p className="break-all text-muted-foreground leading-relaxed text-[15px]">
                                        {member?.description?.text || "No Bio provided."}
                                    </p>
                                    <Button
                                        onClick={() => {
                                            openDescriptionInput();
                                        }}
                                        className="w-6 h-6 text-white">
                                        <PenLine className="w-4 h-4" />
                                    </Button>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalData