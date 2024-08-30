import Login from "../auth/Login";
import Register from "../auth/Register";

const AuthLayout = () => {
  return (
    <div className="max-w-[1200px] mx-auto min-h-screen bg-orange-300 grid md:grid-cols-2 md:place-content-center">
      <Login />
      <Register />
    </div>
  );
};

export default AuthLayout;
