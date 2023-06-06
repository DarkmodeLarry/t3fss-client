import { Metadata } from 'next'
import Link from 'next/link'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from '@/components/page-header'
import Logo from '../../public/static/Logo.png'
import { Calendar } from '@/components/react-calendar'
import RadCalendar from '@/components/radix-calendar'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Tis the home page'
}

const Home = () => {
  return (
    <>
      <div className='container relative pb-10 border-2 border-destructive'>
        <section className='container flex flex-col items-center justify-center space-y-8 overflow-hidden border-2 rounded-lg border-primary'>
          <PageHeader className='space-y-6'>
            <PageHeaderHeading>Flow State Swim</PageHeaderHeading>
            <Link
              href='/docs/forms/react-hook-form'
              className='inline-flex items-center px-3 py-1 text-sm font-medium rounded-lg bg-muted'
            >
              <Image src={Logo} alt='logo' width={30} height={30} />
              <Separator className='h-4 mx-2' orientation='vertical' /> Building
              forms with React Hook Form and Zod
            </Link>
            <h2 className='mt-4 text-4xl font-bold'>
              Immerse Yourself in the State of Flow
            </h2>
            <PageHeaderDescription>
              Whether you&apos;re a beginner looking to improve your form, or a
              seasoned swimmer aiming to enhance your speed and endurance,
              unlock your full potential with personalized swim coaching.
            </PageHeaderDescription>
            <div className='flex items-center w-full pt-4 pb-8 space-x-4 md:pb-10'>
              <Link href='/login' className={cn(buttonVariants())}>
                Get Started
              </Link>
              <Link
                target='_blank'
                rel='noreferrer'
                href={siteConfig.links.github}
                className={cn(buttonVariants({ variant: 'outline' }))}
              >
                <Icons.gitHub className='w-4 h-4 mr-2' />
                GitHub
              </Link>
            </div>
          </PageHeader>
        </section>

        <Calendar />
        <RadCalendar />
      </div>
    </>
  )
}

export default Home
