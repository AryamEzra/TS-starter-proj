import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  // return (
  //   <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
  //     <div className="flex w-full max-w-sm flex-col gap-6">
  //       <a href="#" className="flex items-center gap-2 self-center font-medium">
          
  //       </a>
  //       <LoginForm />
  //     </div>
  //   </div>
  // )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-center">
          <Link href="/" className="inline-block">
            <Image 
              src="/images/amazon-logo-white.png" 
              alt="Amazon" 
              width={120} 
              height={40} 
              className="mx-auto"
            />
          </Link>
          <h1 className="text-white text-2xl font-bold mt-4">Sign In</h1>
          <p className="text-blue-100">Welcome back to your account</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <LoginForm />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New to Amazon?{" "}
              <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}




  
