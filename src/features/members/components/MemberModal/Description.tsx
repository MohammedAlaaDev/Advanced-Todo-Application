import InputError from "@/components/custom/InputError";
import { Textarea } from "@/components/ui/textarea"
import { addTempDescription, selectDescription } from "@/features/members/membersSlice";
import { descriptionSchema } from "@/features/members/schemas/descriptionSchema";
import { useInput } from "@/hooks/useInput"
import { useValidate } from "@/hooks/useValidate";
import { forwardRef, useImperativeHandle, type Ref } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface DescriptionRef {
    handleStep: () => boolean;
}

const Description = ({ }, ref: Ref<DescriptionRef>) => {

    const { error, shakeKey, validate } = useValidate();

    const descriptionError = error?.text?._errors?.[0];

    const storedDescription = useSelector(selectDescription);

    const descriptionInput = useInput(storedDescription.text || "");


    const dispatch = useDispatch();

    const handleStep = () => {

        const tempDescription = {
            text: descriptionInput.value,
        }

        const result = validate(tempDescription, descriptionSchema, () => {
            dispatch(addTempDescription(tempDescription));
        })

        return result
    }

    useImperativeHandle(ref, () => ({
        handleStep,
    }))

    return (
        <div className="grid gap-1.5">
            <Textarea
                id="description"
                placeholder="Describe the member's background and expertise..."
                className="mt-4 min-h-48 max-h-48"
                {...descriptionInput.bind}
            />
            <InputError message={descriptionError} key={shakeKey} />
        </div>
    )
}

Description.displayName = "Description";

export default forwardRef(Description)