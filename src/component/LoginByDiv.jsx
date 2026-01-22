import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
export const LoginByDiv = ()=>{
  return (
    <div className="w-full max-w-md mx-auto">
        <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-400">Or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
        </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <a href="#" className="flex items-center justify-center gap-3 h-12 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                <ImFacebook2 />
                <span className="text-sm font-medium text-gray-700">
                    Facebook
                </span>
            </a>

            <a href="#" className="flex items-center justify-center gap-3 h-12 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                <FcGoogle />
                <span className="text-sm font-medium text-gray-700">
                    Google
                </span>
            </a>
      </div>
    </div>
  )
}