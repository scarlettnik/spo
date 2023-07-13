import { signIn } from "next-auth/react"

const Login = () => {
    return (
        <div className='w-full h-screen flex bg-neutral-800 items-center justify-center'>
            <button className="text-white py-2 rounded-full p-4 bg-green-500 font-bold text-lg" onClick={() => signIn('spotify', { callbackUrl: "/" })}>Login with spotify</button>
        </div>
    );
}

export default Login;
