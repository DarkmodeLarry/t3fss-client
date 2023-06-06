import { SiteHeader } from './site-header'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { SiteFooter } from '@/components/site-footer'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/pages/AuthProvider'

const inter = Inter({
  subsets: ['latin']
})

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <html lang='en' suppressHydrationWarning>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            inter.className
          )}
        >
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
            <div className='relative flex flex-col min-h-screen'>
              <SiteHeader />
              <div className='flex-1'>{children}</div>
              <SiteFooter />
            </div>
          </ThemeProvider>
          {/* <StyleSwitcher /> */}
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  )
}
  async jwt({ token, user }) {
    const dbUser = await db.user.findFirst({
      where: {
        email: token.email
      }
    })

    if (!dbUser) {
      if (user) {
        token.id = user?.id
      }
      return token
    }

    return {
      id: dbUser.id,
      name: dbUser.name,
      role: dbUser.role,
      email: dbUser.email,
      picture: dbUser.image
    }
  }