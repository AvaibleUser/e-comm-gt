import React, { useEffect, useRef, useState } from "react";
import { User, UserType } from "e-comm-gt-api";
import { Select } from "../../../components/select.component";
import { findUsers, update } from "../../../services/login.service";
import InputControlled from "../../../components/input.component";

export default function UpdateEmployee() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<UserType | 0>(0);

  useEffect(() => {
    findUsers().then(setUsers);
  }, []);

  useEffect(() => {
    setName(user?.name || "");
    setLastname(user?.lastname || "");
    setPassword(user?.password || "");
    setUserType(user?.userType || 0);
  }, [user]);

  const updateEmployee = async () => {
    if (!user?.username || !name || !lastname || !password || !userType) {
      return alert("Tiene que llenar todos los campos");
    }
    try {
      const employee = await update({
        id: user.id,
        username: user.username,
        name,
        lastname,
        password,
        userType,
      });

      setUsers(await findUsers());
      alert("Se actualizo el empleado con exito");
    } catch (e: any) {
      alert(e.response.data);
    }
  };

  return (
    <div className="bg-neutral py-8 flex flex-col w-3/4 m-auto">
      <div className="flex flex-wrap mx-4 my-2">
        <Select
          value={user?.username}
          setValue={(username: string) =>
            setUser(users.filter((user) => user.username === username)[0])
          }
          placeholder="Seleccione al empleado"
          options={users.map((user) => user.username)}
        />
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-wrap mx-4 my-2">
        <InputControlled placeholder="Nombre" value={name} setValue={setName} />
        <InputControlled
          placeholder="Apellido"
          value={lastname}
          setValue={setLastname}
        />
      </div>
      <div className="flex flex-wrap mx-4 my-2">
        <InputControlled
          placeholder="Contraseña"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <Select
          placeholder="Seleccione el puesto"
          value={userType}
          setValue={setUserType}
          options={[UserType.ADMIN, UserType.PACKER]}
        />
      </div>
      <div className="flex justify-center mx-4 my-2">
        <div className="flex flex-1 justify-center">
          <button onClick={updateEmployee} className="btn m-4 btn-success">
            Actualizar empleado
          </button>
        </div>
      </div>
    </div>
  );
}
