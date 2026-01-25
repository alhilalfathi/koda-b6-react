import adminPicture from "../assets/img/Ellipse183.png"
import userPicture from "../assets/img/Ellipse184.png"

export const ChatWidget = () => {
  return (
    <div className="fixed right-10 bottom-15 ">

      {/* Chat Box */}
        <article className="w-80 bg-white rounded-2xl mb-5">

            {/* Header */}
            <div className="bg-[#FF8906] p-4 rounded-t-2xl flex items-center gap-3">
                <img src={adminPicture} alt="admin profile" className="w-10 h-10 rounded-full" />
                <div>
                    <h4 className="text-white text-sm font-semibold">
                        Maria Angela
                    </h4>
                    <span className="text-xs text-zinc-300">
                        Admin Support
                    </span>
                </div>
            </div>

            {/* Chat Body */}
            <div className="p-5 space-y-4">

                {/* Admin Message */}
                <div className="flex items-start gap-2">
                    <img src={adminPicture} alt="admin" className="w-9 h-9 rounded-full" />
                    <div className="bg-zinc-300 px-4 py-2 rounded-xl max-w-[65%] text-sm">
                        Halo, Ada yang bisa kami bantu?
                    </div>
                </div>

                {/* User Message */}
                <div className="flex items-start gap-2 justify-end">
                    <div className="bg-zinc-300 px-4 py-2 rounded-xl max-w-[65%] text-sm">
                        Saya kesulitan mencari kopi
                    </div>
                    <img src={userPicture} alt="user" className="w-9 h-9 rounded-full" />
                </div>

            </div>

            {/* Input */}
            <div className="p-3 border-t flex items-center gap-2">
                <input type="text" placeholder="Masukan Pesan Anda" className="w-3/4 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
                <button className="w-1/4 bg-[#FF8906] rounded-lg p-2 flex justify-center">
                    <img src="src/assets/img/sent.png" alt="send" />
                </button>
            </div>
        </article>

      {/* Chat Button */}
        <div className="w-14 h-14 bg-[#FF8906] rounded-full flex items-center justify-center cursor-pointer absolute right-0 bottom-[-2]">
            <img src="src/assets/img/ChatCircleDots.png" alt="Chat" className="mt-1" />
        </div>

    </div>
  )
}
