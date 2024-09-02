import { Button } from "../ui/button"


export const Profile = () => {
  return (
    <div className="bg-blue-300 p-4 text-xl text-center border-l-2">
      <img src="https://randomuser.me/api/portraits/men/63.jpg" className="mx-auto rounded-md w-24 h-24" alt="" />
      <h2 className="mt-2">Profile</h2>
      <p className="font-semibold mb-1">Alejandro Magno</p>
      <p className="text-gray-500 mb-4">email@email.com</p>
      <Button className="w-full">Salir</Button>
    </div>
  )
}
