import { Spin } from "antd";

const LogoutHandler = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin tip="Cerrando sesión..." fullscreen />
    </div>
  );
};

export default LogoutHandler;
