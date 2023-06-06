'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '../../public/static/Logo.png'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export function MainNav() {
  const pathname = usePathname()
  // const session = useSession()

  return (
    <div className='mr-4 hidden md:flex'>
      <Link
        href='/'
        className='mr-6 flex items-center justify-center space-x-2'
      >
        <Image src={Logo} alt='logo' width={30} height={30} />

        <span className='hidden text-xs font-bold sm:inline-block'>
          {/* {session?.data?.user?.name ?? 'Flow State Swim'} */}
        </span>
      </Link>
      <nav className='flex items-center space-x-6 text-sm font-medium'>
        <Link
          href='/docs'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/docs' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Documentation
        </Link>
        <Link
          href='/docs/components'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/docs/components')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Components
        </Link>
      </nav>
    </div>
  )
}
