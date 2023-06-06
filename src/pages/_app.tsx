import type { AppType } from 'next/dist/shared/lib/utils'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import '@/styles/Calendar.css'
import '@/styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/radix-calendar.css'
import 'react-day-picker/dist/style.css'
import { api } from '@/utils/api'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  console.log(session)
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider attribute='class' defaultTheme='shade' enableSystem>
          <div className='relative flex flex-col min-h-screen'>
            <SiteHeader />
            <Component {...pageProps} />
            <SiteFooter />
          </div>
        </ThemeProvider>
        <Toaster />
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
