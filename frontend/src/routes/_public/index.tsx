import { SignInForm } from '@/components/organisms/forms/signin-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className=' m-10 border rounded-sm p-3 center'>
        <SignInForm />
      </div>
    </div>
  )
}
