import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/icons'
import { RxDiscordLogo } from 'react-icons/rx'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import { useState, ChangeEvent, type FC } from 'react'
import { HiLockClosed } from 'react-icons/hi'
import { api } from '../utils/api'
import Image from 'next/image'
import Logo from '../../public/static/Logo.png'
import { signIn } from 'next-auth/react'

const Login: FC = ({}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const router = useRouter()

  const { mutate: login, error } = api.admin.login.useMutation({
    onSuccess: () => {
      router.push('/admin-dashboard')
    }
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      <Card className='container'>
        <CardHeader className='relative space-y-1'>
          <Image
            src={Logo}
            alt='logo'
            width={40}
            height={40}
            className='pt-4 pb-6'
          />
          <CardTitle className='text-2xl'>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <form className=''>
          <CardContent className='grid gap-4'>
            <div className='grid grid-cols-2 gap-6'>
              <Button
                variant='outline'
                className='border-2 rounded-lg border-slate-700'
                onClick={() => signIn('github')}
              >
                <Icons.gitHub className='w-4 h-4 mr-2' />
                Github
              </Button>
              <Button
                variant='outline'
                onClick={() => signIn('google')}
                className='border-2 border-slate-700'
              >
                <FcGoogle className='w-4 h-4 mr-2' />
                Google
              </Button>
              <Button
                variant='outline'
                onClick={() => signIn('discord')}
                className='border-2 border-slate-700'
              >
                <RxDiscordLogo className='w-4 h-4 mr-2' />
                Discord
              </Button>
              <Button variant='outline' className='border-2 border-slate-700'>
                <Icons.facebook className='w-4 h-4 mr-2' />
                Facebook
              </Button>
            </div>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='px-2 bg-background text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>
          </CardContent>
          {/* Email & Password Login */}
          <div className='grid gap-4'>
            <input type='hidden' name='remember' defaultValue='true' />
            <p className='text-sm text-red-600 pb-'>
              {error && 'Invalid login credentials'}
            </p>
            <CardContent className='mt-8 space-y-6 '>
              <div className='grid gap-2'>
                <Label htmlFor='email' className='sr-only'>
                  Email address
                </Label>
                <Input
                  id='email-address'
                  name='email'
                  type='email'
                  value={input.email}
                  onChange={handleChange}
                  autoComplete='email'
                  required
                  placeholder='Email'
                  className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-500 rounded-none appearance-none rounded-t-md bg-slate-600 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-slate-500 sm:text-sm'
                />
              </div>
              <div className='grid gap-2'>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  value={input.password}
                  onChange={handleChange}
                  required
                  autoComplete='current-password'
                  className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-500 rounded-none appearance-none rounded-b-md bg-slate-600 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-slate-500 sm:text-sm'
                  placeholder='Password'
                />
              </div>

              <Button
                className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-slate-400 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
                type='submit'
                onClick={(e) => {
                  e.preventDefault()
                  login(input)
                }}
              >
                <HiLockClosed
                  className='w-4 h-4 mr-3 text-gray-400 group-hover:text-amber-400'
                  aria-hidden='true'
                />
                Sign in
              </Button>
            </CardContent>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Login
