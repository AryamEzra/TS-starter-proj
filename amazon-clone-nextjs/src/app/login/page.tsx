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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image 
              src="/images/amazon-logo.png" 
              alt="Amazon" 
              width={120} 
              height={40} 
              className="mx-auto"
            />
          </Link>   
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}




  
