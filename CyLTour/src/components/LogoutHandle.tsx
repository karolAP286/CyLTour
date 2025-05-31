import { Spin } from "antd";
import useLogout from "../hooks/useLogout";

const LogoutHandler = () => {
  useLogout();
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin tip="Cerrando sesión..." fullscreen />
    </div>
  );
};

export default LogoutHandler;
