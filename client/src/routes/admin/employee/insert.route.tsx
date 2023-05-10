import React, { useRef } from "react";
import { UserType } from "e-comm-gt-api";
import { InputRef } from "../../../components/input.component";
import SelectRef from "../../../components/select.component";
import { TextAreaRef } from "../../../components/textarea.component";
import { register } from "../../../services/login.service";

export default function InsertEmployee() {
  const nameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLTextAreaElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const userTypeRef = useRef<HTMLSelectElement>(null);

  const addEmployee = async () => {
    if (
      !nameRef.current?.value ||
      !lastnameRef.current?.value ||
      !usernameRef.current?.value ||
      !passwordRef.current?.value ||
      !userTypeRef.current?.value
    ) {
      return alert("Tiene que llenar todos los campos");
    }
    try {
      const employee = await register({
        name: nameRef.current.value,
        lastname: lastnameRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        userType: userTypeRef.current.value as UserType,
      });

      alert("Se añadio el empleado con exito");
    } catch (e: any) {
      alert(e.response.data);
    }
  };

  return (
    <div className="bg-neutral py-8 flex flex-col w-3/4 m-auto">
      <div className="flex flex-wrap mx-4 my-2">
        <InputRef placeholder="Nombre" reference={nameRef} />
        <TextAreaRef placeholder="Apellido" reference={lastnameRef} />
      </div>
      <div className="flex flex-wrap mx-4 my-2">
        <InputRef placeholder="Nombre de usuario" reference={usernameRef} />
        <InputRef
          placeholder="Contraseña"
          type="password"
          reference={passwordRef}
        />
      </div>
      <div className="flex flex-wrap mx-4 my-2">
        <SelectRef
          placeholder="Seleccione el puesto"
          reference={userTypeRef}
          options={[UserType.ADMIN, UserType.PACKER]}
        />
        <div className="flex-1"></div>
      </div>
      <div className="flex justify-center mx-4 my-2">
        <div className="flex flex-1 justify-center">
          <button onClick={addEmployee} className="btn m-4 btn-success">
            Registrar empleado
          </button>
        </div>
      </div>
    </div>
  );
}
