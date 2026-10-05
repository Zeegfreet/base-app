import { Spinner } from "@/components/ui/spinner"
import type { ComponentProps } from "react"

export interface LoaderProps extends ComponentProps<'fieldset'> {
    isLoading: boolean
}

export const Loader: React.FC<LoaderProps> = ({ children, isLoading, ...other }) => {
    
    return (
        <fieldset 
            {...other}
            disabled={isLoading}
            className="relative"
        >
            {isLoading ?? <Spinner 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8"

            />}
            {children}
        </fieldset>
    )
}