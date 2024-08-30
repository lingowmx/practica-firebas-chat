

export const FriendItem = () => {
  return (
    <article className="flex items-center gap-x-4 py-2 px-4 border-b hover:bg-gray-100 cursor-pointer">
          <img className= "rounded-lg w-14 h-14"src="https://randomuser.me/api/portraits/women/85.jpg" alt="user" />
          <div className="">
            <h3 className="font-semibold text-lg">Natasa</h3>
            <p className="text-xs text-gray-500">Lorem , lalala, </p>
          </div>
        </article>
  )
}
