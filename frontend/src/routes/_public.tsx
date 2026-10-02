import { LangSelect } from '@/components/organisms/lang-select'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  return (
    <div className='flex min-h-screen w-full'>
      <div className='w-lg max-xl:w-sm max-lg:w-full pt-3'>
        <div className='p-5 flex flex-col items-center gap-3'>
          {t("welcome")}
          <LangSelect />
        </div>
        <Outlet />
      </div>
      <div className='flex-1 max-lg:hidden'></div>
    </div>
  )
}
