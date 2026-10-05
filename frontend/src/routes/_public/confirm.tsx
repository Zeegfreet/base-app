import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const schema = z.object({
  token: z.string()
})

const validateParams = (params: Record<string, unknown>) => {
  const data = schema.safeParse(params)
  return data
}

export const Route = createFileRoute('/_public/confirm')({
  validateSearch: validateParams,
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useSearch()
  console.log(params.data)
  return <div>Hello "/_public/confirm"!</div>
}
