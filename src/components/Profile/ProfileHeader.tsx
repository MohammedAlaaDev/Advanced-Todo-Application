import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "../custom/InputError";
import { PenLine, Upload } from "lucide-react";
import { format, formatDistanceToNowStrict } from "date-fns";
import { useRef, type Dispatch, type SetStateAction, type SubmitEvent } from "react";
import type { MemberObject } from "@/types";
import { roleAndNameSchema } from "@/features/members/schemas/personalDetailsSchema";
import { editNameAndRole } from "@/features/members/membersSlice";
import { useDispatch } from "react-redux";
import { useValidate } from "@/hooks/useValidate";
import { useQueryParam } from "@/hooks/useQueryParam";

interface ProfileHeaderProps {
  member: MemberObject | undefined;
  headerEditMode: boolean;
  setHeaderEditMode: Dispatch<SetStateAction<boolean>>;
  resetEditModes: () => void;
}

interface HeaderData {
  name: string;
  role: string;
}

interface ValidationType {
  validate: (data: HeaderData, schema: typeof roleAndNameSchema, onSuccess: () => void) => void;
  setError: (error: any) => void;
  error: any;
  shakeKey: number;
}

const ProfileHeader = ({ member, headerEditMode, setHeaderEditMode, resetEditModes }: ProfileHeaderProps) => {

  const dispatch = useDispatch();

  const { openModal } = useQueryParam();

  const createDate = format(member?.createdAt || new Date(), "dd MMM yyyy");
  const lastOnline = formatDistanceToNowStrict(member?.createdAt || new Date(), { addSuffix: true });

  const nameInputRef = useRef<null | HTMLInputElement>(null);
  const roleInputRef = useRef<null | HTMLInputElement>(null);

  const { validate, setError, error, shakeKey } = useValidate() as ValidationType;

  const nameError = error?.name?._errors[0];
  const roleError = error?.role?._errors[0];

  const handleHeaderEdit = (e?: SubmitEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    const name = nameInputRef?.current?.value.trim();
    const role = roleInputRef?.current?.value.trim();

    const data: HeaderData = {
      name: name || "",
      role: role || ""
    }

    validate(data, roleAndNameSchema, () => {
      dispatch(editNameAndRole({ id: member?.id, data }));
      setHeaderEditMode(false);
    })
  }

  const openHeaderInputs = () => {
    setError(undefined);
    resetEditModes();
    setHeaderEditMode(true);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 0);
  }

  return (
    <div className="relative w-full rounded-3xl overflow-hidden p-6 md:p-10 min-h-75 flex flex-col justify-end bg-linear-to-br from-primary/70 via-primary/50 to-primary/20">

      {/* Header Edit Button */}
      {
        headerEditMode ?
          <div className="absolute top-4 right-4 flex gap-2 z-50">
            <Button
              onClick={() => {
                setHeaderEditMode(false);
              }}
              className="text-white">
              Close
            </Button>
            <Button
              onClick={() => {
                handleHeaderEdit();
              }}
              className="text-white">
              Save
            </Button>
          </div>
          :
          <Button
            onClick={() => {
              openHeaderInputs();
            }}
            className="absolute top-4 right-4">
            <PenLine className="text-white" />
          </Button>

      }

      <div className="flex flex-col justify-between items-start md:items-center gap-6 z-10">

        {/* Avatar & Title */}
        <div className="flex items-center gap-5">
          <div className="relative group w-18 rounded-full overflow-hidden">
            <img src={member?.avatar} alt={member?.personalDetails?.name?.[0]} className="w-full" />
            <div
              onClick={() => {
                resetEditModes();
                if (member) {
                  openModal("member-photo");
                }
              }}
              className="overlay cursor-pointer flex justify-center items-center transition-all size-full absolute inset-0 bg-black opacity-0 group-hover:opacity-50"
            >
              <Upload className="text-white" />
            </div>
          </div>

          <div className="flex flex-col gap-1 text-white">
            {
              headerEditMode ?
                <form onSubmit={(e) => {
                  handleHeaderEdit(e);
                }} className="flex flex-col gap-2 w-full">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" ref={nameInputRef} defaultValue={member?.personalDetails.name} />
                    <InputError key={shakeKey} message={nameError} className="text-red-700! dark:text-red-100!" />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" placeholder="Enter your role" ref={roleInputRef} defaultValue={member?.personalDetails.role} />
                    <InputError key={shakeKey} message={roleError} className="text-red-700! dark:text-red-100!" />
                  </div>
                  <Button type="submit" className="hidden">
                  </Button>
                </form >
                :
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-black/80 dark:text-white">{member?.personalDetails.name}</h2>
                  <p className=" font-medium text-sm text-black/80 dark:text-white">{member?.personalDetails.role}</p>
                </div>
            }
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-12 text-white/90 w-full md:w-auto mt-4 md:mt-0 items-center">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-black/80 dark:text-white mix-blend-overlay">Joined</span>
            <span className="font-semibold text-sm sm:text-base text-black/80 dark:text-white">{createDate}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-black/80 dark:text-white  mix-blend-overlay">Work rate</span>
            <span className="font-semibold text-sm sm:text-base text-black/80 dark:text-white">10 Tasks per day</span>
          </div>
          <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-black/80 dark:text-white  mix-blend-overlay">online status</span>
            <span className="font-semibold text-sm sm:text-base text-black/80 dark:text-white">{lastOnline === "0 seconds ago" ? "Online" : lastOnline}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader