import { cn } from "cn"

const Paragraph: React.FC<React.ComponentProps<'p'>> = ({ children, className }) => {
    return (
        <p className={cn(
            className,
            "text-muted-foreground"
        )}>{children}</p>
    )
}

const H1: React.FC<React.ComponentProps<'h1'>> = ({ children, className }) => {
    return (
        <h1 className={cn(className, "text-2xl font-bold")}>{children}</h1>
    )
}

const Typography = Object.assign(Paragraph, { H1 })

export default Typography