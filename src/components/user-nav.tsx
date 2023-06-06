import { CreditCard, LogOut, PlusCircle, Settings, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export function UserNav() {
  const { data: session } = useSession()
  console.log(session)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {session || (
          <Button
            variant='ghost'
            className='relative flex items-center justify-center w-full p-1 border-2 rounded-full'
          >
            <Avatar className='flex flex-col w-8 h-8'>
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback>{session?.user?.name}</AvatarFallback>
            </Avatar>
            <span className='hidden text-pink-500 sm:inline-block'>
              {session.user?.name}
            </span>
          </Button>
        )}
        {session === null}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>FSS</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {session?.user?.name && (
                <span className='text-xs leading-none text-muted-foreground'>
                  {session?.user?.name}
                </span>
              )}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className='w-4 h-4 mr-2' />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className='w-4 h-4 mr-2' />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/settings'>
              <Settings className='w-4 h-4 mr-2' />
              <span>Settings</span>
            </Link>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
        >
          <Button className='w-full ' variant='ghost'>
            <span>Log out</span>
          </Button>

          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
