// components & icons
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import type { ReactNode } from "react";

export interface Option {
    key: string;
    text: string;
    icon?: ReactNode;
    color?: string;
}

interface DropdownProps {
    options: Option[];
    handleChoose: (key: string) => void;
}

const Dropdown = ({ options, handleChoose }: DropdownProps) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger className="border-0 outline-0">
                <Ellipsis className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-card mr-9">
                <DropdownMenuGroup>
                    {
                        options.map((option) => (
                            <DropdownMenuItem
                                onSelect={() => {
                                    handleChoose(option.key)
                                }}
                                key={option.key} className="cursor-pointer"
                            >
                                {option.icon}
                                <span className={option.color}>{option.text}</span>
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropdown