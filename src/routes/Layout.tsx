import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
}