import { User } from 'next-auth'
import { FC } from 'react'
import { Avatar, AvatarFallback } from './ui/Avatar'
import Image from 'next/image'
import {User as UserLogo} from "lucide-react"
import { AvatarProps } from '@radix-ui/react-avatar'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>
}

const UserAvatar: FC<UserAvatarProps> = ({user, ...props}) => {
  return (
    <Avatar {...props}>
        {user?.image ? (
            <div className='aspect-square relative h-full w-full'>
                <Image
                    src={user?.image}
                    alt={user?.name as string}
                    fill
                    referrerPolicy='no-referrer'
                />
            </div>
        ) : (
            <AvatarFallback>
                <span className='sr-only'>{user?.name}</span>
                <UserLogo className='h-4 w-4' />
            </AvatarFallback>
        )}
    </Avatar>
  )
}

export default UserAvatar