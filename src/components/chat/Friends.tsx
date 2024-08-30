import { FriendItem } from "./FriendItem"
import { FriendsSearch } from "./FriendsSearch"

export const Friends = () => {
  return (

    <section className="grid grid-rows-[auto_1fr] h-screen">
      <div className="border-b p-4">
        <h2 className="font-bold mb-4 text-2xl">Chats</h2>
        <FriendsSearch/>
      </div>
      <div className="bg-white overflow-y-auto overscroll-contain">
        {
          Array.from({length: 14}).map((_,i) => (
            <FriendItem key={i} />
          ))  
        }
      </div>
    </section>
  )
}
