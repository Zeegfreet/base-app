import Typography from "@/components/atoms/typography"
import { cn } from "cn"
import { CircleCheck } from "lucide-react"
import type { ComponentProps } from "react"

export interface SuccessProps extends ComponentProps<'div'> {
    title: string,
    message: string
}

export const Success: React.FC<SuccessProps> = ({ title, message, className }) => {

    return(
        <div className={cn("flex-1 flex flex-col items-center gap-5", className)}>
            <Typography.H1>{title}</Typography.H1>
            <Typography>{message}</Typography>
            <CircleCheck size={30} className=" text-3xl text-blue-600" />
        </div>
    )
}