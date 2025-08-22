
import { SignUpForm } from "@/components/signup-form"
import Image from "next/image"
import Link from "next/link"

export default function SignUpPage() {
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
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}




  
