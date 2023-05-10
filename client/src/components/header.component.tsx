import React from "react";
import { Link } from "react-router-dom";

import { getPathToRedirect } from "../services/login.service";
import ItemComponent from "./item.component";
import ItemModel from "../models/item.model";

export default function Header({ items }: any) {
  const itemsInComponent = items.map(({ id, itemName, itemUri }: ItemModel) => (
    <ItemComponent key={id} itemName={itemName} itemUri={itemUri} />
  ));

  return (
    <nav className="navbar p-4">
      <div className="navbar-start">
        <Link
          to={getPathToRedirect()}
          className="btn btn-ghost normal-case text-xl"
        >
          <span className="lowercase text-secondary">e_</span>
          <span className="uppercase">COMM</span>
          <sup className="lowercase text-secondary">gt</sup>
        </Link>
      </div>
      <div className="navbar-center lg:flex">
        <ul className="menu menu-horizontal px-1">{itemsInComponent}</ul>
      </div>
      <div className="navbar-end">
        <Link to="/login" className="btn btn-ghost">
          Log Out
        </Link>
      </div>
    </nav>
  );
}
