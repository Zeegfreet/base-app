import { AlertDescription, AlertTitle, Alert as PrimitiveAlert } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, InfoIcon } from "lucide-react"


const icons = {
    info: InfoIcon,
    error: AlertCircle,
    success: CheckCircle
}

export interface AlertProps {
    title: string,
    message: string,
    variant?: keyof typeof icons
}



export const Alert: React.FC<AlertProps> = ({
    title,
    message,
    variant = 'info'
}) => {
    const Icon = icons[variant]
    return (
        <PrimitiveAlert
            variant={variant === "error" ? "destructive" : "default"}
        >
            <Icon />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </PrimitiveAlert>
    )
}