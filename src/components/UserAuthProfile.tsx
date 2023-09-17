import { User } from 'next-auth'
import { FC } from 'react'
import { DropdownMenu, DropdownMenuTrigger } from './ui/DropdownMenu'
import UserAvatar from './UserAvatar'

interface UserAuthProfileProps {
  user: Pick<User, 'name' | 'email' | 'image'>
}

const UserAuthProfile: FC<UserAuthProfileProps> = ({user}) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar user={user} />
        </DropdownMenuTrigger>
    </DropdownMenu>
  )
}

export default UserAuthProfile