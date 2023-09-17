import { User } from 'next-auth'
import { FC } from 'react'
import { Avatar, AvatarFallback } from './ui/Avatar'
import Image from 'next/image'
import {User as UserLogo} from "lucide-react"

interface UserAvatarProps {
  user: Pick<User, 'image' | 'name'>
}

const UserAvatar: FC<UserAvatarProps> = ({user}) => {
  return (
    <Avatar>
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