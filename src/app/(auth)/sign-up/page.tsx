import Signup from '@/components/Signup'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FC } from 'react'
import {ChevronLeft} from "lucide-react"

const page: FC = ({}) => {
  return (
    <div className='absolute inset-0'>
        <div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20'>
            <Link href={'/'} className={cn(buttonVariants({variant: 'ghost'}), 'self-start -mt-20')}>
              <ChevronLeft className='h-4 w-4 mr-2' />
              Home
            </Link>

            <Signup />
        </div>
    </div>
  )
}

export default page