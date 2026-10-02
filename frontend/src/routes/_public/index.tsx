import { SignInForm } from '@/components/organisms/forms/signin/signin-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='p-5'>
      <SignInForm />
    </div>
  )
}
