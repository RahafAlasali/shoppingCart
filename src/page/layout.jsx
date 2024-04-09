import { Outlet } from "react-router-dom";
import Nav from "../component/nav";

export default function layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
