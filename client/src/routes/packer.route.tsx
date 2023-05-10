import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "../components/header.component";

import { packerStore } from "../store/packer.store";

import { getPathToRedirect } from "../services/login.service";

export default function Packer() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = getPathToRedirect();

    if (redirectPath !== "/seller") {
      navigate(redirectPath);
    }
  }, []);

  return (
    <>
      <Header items={packerStore} />
      <main className="bg-neutral h-full w-full">
        <Outlet />
      </main>
    </>
  );
}
