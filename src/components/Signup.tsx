import UserAuthForm from './UserAuthForm'
import { Icons } from './Icons'
import Link from 'next/link'

const SignUp = ({}) => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
        <div className='flex flex-col space-y-2 text-center'>
            <Icons.logo className='mx-auto h-6 w-6' />
            <h1 className='text-2xl font-semibold tracking-tight'>Welcome to Breaddit!</h1>
            <p className='text-sm max-w-xs mx-auto'>
                By continuing, you are setting up a Breadit accout and agree our User Agreement and Privay Policy.
            </p>

        <UserAuthForm />

        <p className='px-8 text-center text-sm text-zinc-700'>
            Already have an acoount?{" "}
            <Link href='/sign-in' className='text-sm underline underline-offset-4 hover:text-zinc-800'>Sign In</Link>
        </p>
        </div>
    </div>
  )
}

export default SignUp