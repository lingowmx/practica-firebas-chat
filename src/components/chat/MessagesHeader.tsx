import { Button } from "../ui/button"

export const MessagesHeader = () => {
  return (
    <header className="border-b-2 p-4 flex items-center">
        <img
          src="https://randomuser.me/api/portraits/women/45.jpg"
          alt=""
          className="size-14 rounded-lg"
        />
        <div className="pl-4">
          <h3 className="text-lg font-semibold text-gray-700">CGLM</h3>
          <p className="text-xs text-gray-50">status</p>
        </div>
        <div className="ml-auto">
          <Button>Cerrar</Button>
        </div>
      </header>
  )
}
