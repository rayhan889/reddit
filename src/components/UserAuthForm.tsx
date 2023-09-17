"use client"

import React, { FC, useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { signIn } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  
}

const UserAuthForm: FC<UserAuthFormProps> = ({className, ...props}) => {

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

    const loginWithGoogle = async () => {
        setIsLoading(true);

        try {
            await signIn("google")
        } catch (error) {
            // toast an error
            toast({
              title: "Error",
              description: "There was an error logging in with google",
              variant: "destructive"
            })
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div 
        className={cn('flex justify-center', className)} 
        {...props}
        >
        <Button onClick={loginWithGoogle} isLoading={isLoading} size={'sm'} className='w-full flex items-center gap-2'>
            {isLoading ? null : <Image src='/assets/google_logo.svg' alt='google-logo' width={16} height={16} />}
            Google
        </Button>
    </div>
  )
}

export default UserAuthForm