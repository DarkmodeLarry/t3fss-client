import { CommandMenu } from '@/components/command-menu'
import { MainNav } from '@/components/main-nav'
import { MobileNav } from '@/components/mobile-nav'
import { ModeToggle } from '@/components/mode-toggle'
import { UserNav } from './user-nav'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { buttonVariants } from './ui/button'
import Link from 'next/link'
// import { BottomNavigation } from './bottom-navigation/BottomNavigation'
// import { Collections } from '@/types'

// export interface NavLink {
//   name: 'men' | 'women' | 'kids' | 'sale' | 'blog' | 'contacts'
//   href: string
//   collapsible?: boolean
// }

// export const navLinks: NavLink[] = [
//   { name: 'men', href: '/products/men', collapsible: true },
//   { name: 'women', href: '/products/women', collapsible: true },
//   { name: 'kids', href: '/products/kids' },
//   { name: 'sale', href: '/sale' },
//   { name: 'blog', href: '/blog' },
//   { name: 'contacts', href: '/contacts' }
// ]

// export const sideNavLinks: [string, IconType][] = [
//   ['/wishlist', FiHeart],
//   ['/cart', FiShoppingBag],
//   ['/signin', FiUser]
// ]

export function SiteHeader() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  console.log(session)
  return (
    <header className='sticky top-0 z-40 w-full border-b supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur'>
      <div className='container flex items-center h-14'>
        <MainNav />
        <MobileNav />
        <div className='flex items-center justify-between flex-1 space-x-2 sm:space-x-4 md:justify-end'>
          <div className='flex-1 w-full md:w-auto md:flex-none'>
            <CommandMenu />
          </div>
          <nav className='flex items-center space-x-1'>
            <UserNav />
            <div className='mx-2'>
              <ModeToggle />
            </div>
            <div className=''>
              {session && (
                <>
                  <Button
                    className='w-full mx-3 text-xs border-red-300'
                    variant='outline'
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                  >
                    Sign out
                  </Button>
                </>
              )}
            </div>
            {!session && (
              <>
                <Link
                  href='/api/auth/signin'
                  className={buttonVariants({ variant: 'outline' })}
                  onClick={(e) => {
                    e.preventDefault()
                    signIn()
                  }}
                >
                  Sign in
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
      {/* <BottomNavigation navLinks={navLinks} collections={collections} /> */}
    </header>
  )
}
