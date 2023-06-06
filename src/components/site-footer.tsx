import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className='border-t py-6 md:py-0'>
      <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
        <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
          <Icons.logo className='hidden h-6 w-6 md:inline-block' />
          <p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
            Built by{' '}
            <a
              href={siteConfig.links.twitter}
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              shadcn
            </a>
            . The source code is available on{' '}
            <a
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              GitHub
            </a>
            .
          </p>
          <Link href={siteConfig.links.github} target='_blank' rel='noreferrer'>
            <div
              className={cn(
                buttonVariants({
                  size: 'sm',
                  variant: 'ghost'
                }),
                'w-9 px-0'
              )}
            >
              <Icons.gitHub className='h-5 w-5' />
              <span className='sr-only'>GitHub</span>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  )
}
