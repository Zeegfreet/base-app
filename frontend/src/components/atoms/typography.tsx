import type { PropsWithChildren } from "react"

export interface TypographyProps extends PropsWithChildren {
    
}

const Paragraph: React.FC<TypographyProps> = ({ children }) => {
    return (
        <p>{children}</p>
    )
}

const H1: React.FC<TypographyProps> = ({ children }) => {
    return (
        <h1>{children}</h1>
    )
}

const Typography = Object.assign(Paragraph, { H1 })

export default Typography