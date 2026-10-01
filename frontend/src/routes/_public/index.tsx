import { SignInForm } from '@/components/organisms/forms/signin-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='p-5 h-full flex flex-col justify-center'>
      <SignInForm />
    </div>
  )
}
