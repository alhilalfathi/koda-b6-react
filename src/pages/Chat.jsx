import { ChatWidget } from "../component/Chat"
import { HomeHeader } from "../component/HomeHeader"
import { HomeNav } from "../component/HomeNav"


export const ChatPage = () => {
  return (
    <div>
        <HomeNav />

        <HomeHeader />

        <ChatWidget />
    </div>
  )
}
