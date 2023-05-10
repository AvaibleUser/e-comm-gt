import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "../components/header.component";

import { adminStore } from "../store/admin.store";

import { getPathToRedirect } from "../services/login.service";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = getPathToRedirect();

    if (redirectPath !== "/seller") {
      navigate(redirectPath);
    }
  }, []);

  return (
    <>
      <Header items={adminStore} />
      <main className="bg-neutral h-full w-full">
        <Outlet />
      </main>
    </>
  );
}
