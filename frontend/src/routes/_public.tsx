import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex min-h-screen w-full'>
      <div className='w-lg max-xl:w-sm max-lg:w-full pt-3'>
        <Outlet />
      </div>
      <div className='flex-1 max-lg:hidden'></div>
    </div>
  )
}
