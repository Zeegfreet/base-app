import { ResendConfirmationForm } from '@/components/organisms/forms/resend-confirmation-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/resend-confirmation')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
        <ResendConfirmationForm />
    </div>
  )
}
