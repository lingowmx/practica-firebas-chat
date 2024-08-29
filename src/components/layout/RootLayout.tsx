
import Login from "../auth/Login";
import Register from "../auth/Register";

export const RootLayout = () => {
  const user = false;
  return (
    <div>
      {user ? (
        <h1>Welcome back!</h1>
      ) : (
        <div className="h-screen bg-orange-300 grid grid-cols-2 place-content-center">
          <Login />
          <Register/>
        </div>
      )}
    </div>
  );
};
