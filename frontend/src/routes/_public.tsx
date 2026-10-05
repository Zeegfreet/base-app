import { LangSelect } from '@/components/organisms/lang-select'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import authImage from "@/assets/auth.jpeg"

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  return (
    <div className='flex min-h-screen w-full'>
      <div className='w-lg flex flex-col items-center max-lg:flex-1'>
        <div className='p-5 flex flex-col items-center gap-3'>
          {t("welcome")}
          <LangSelect />
        </div>
        <Outlet />
      </div>
      <div className='flex-1 max-lg:hidden flex '>
        <img src={authImage} className=' w-full h-screen' />
      </div>
    </div>
  )
}
