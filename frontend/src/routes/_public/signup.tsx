

import { SignUpForm } from '@/components/organisms/forms/signup/sign-up-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='p-5'>
      <SignUpForm />
    </div>
  )
}
