import React, { useRef } from "react";
import { Sale, SaleState } from "e-comm-gt-api";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { Sale as SaleComponent } from "../../components/sale.component";
import { InputRef } from "../../components/input.component";
import { updateSale } from "../../services/sales.service";

export function Delivery() {
  const revalidator = useRevalidator();
  const salesInDelivery: Sale[] = (useLoaderData() as Sale[]) || [];
  const deadlineRefs = useRef<any>([]);

  const changeDeadline = async (sale: Sale, index: number) => {
    if (
      !deadlineRefs.current[index]?.value ||
      isNaN(+new Date(deadlineRefs.current[index]?.value))
    ) {
      return alert("La fecha es invalida");
    }
    const deadline = deadlineRefs.current[index]?.value;

    try {
      const updatedSale = await updateSale({ ...sale, deadline });
      revalidator.revalidate();
    } catch (e: any) {
      alert(e.response.data);
      console.error(e.response.data);
    }
  };

  const deliverySale = async (sale: Sale) => {
    try {
      const updatedSale = await updateSale({
        ...sale,
        deliveryDate: new Date().toISOString().split("T")[0],
        state: SaleState.DELIVERED,
      });
      alert("Ya se entrego el paquete");
      revalidator.revalidate();
    } catch (e: any) {
      alert(e.response.data);
      console.error(e.response.data);
    }
  };

  return (
    <div className="bg-neutral py-8 flex flex-col w-3/4 m-auto">
      {salesInDelivery.map((sale, index) => {
        const content = (
          <div className="flex justify-end flex-wrap">
            <InputRef
              placeholder="Fecha de entrega"
              type="date"
              reference={(ref_: any) => (deadlineRefs.current[index] = ref_)}
            />
            <button
              className="btn mx-1"
              onClick={() => changeDeadline(sale, index)}
            >
              Cambiar Fecha
            </button>
            <button
              className="btn btn-success mx-1"
              onClick={() => deliverySale(sale)}
            >
              Entregar
            </button>
          </div>
        );
        return <SaleComponent key={sale.id} {...sale} content={content} />;
      })}
    </div>
  );
}
