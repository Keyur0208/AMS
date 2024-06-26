import {NextUIProvider} from '@nextui-org/react'

export function Nextui_Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}