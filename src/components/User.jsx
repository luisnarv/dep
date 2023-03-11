import React from "react";
import styles from "./User.module.css";
import {Link, Outlet} from "react-router-dom"

export default function User() {
  return (
    <div className={styles.BodyContainer}>
      <div
        className={styles.Panel}
        title="Zona de Sidebar y display"
      >
        <div className={styles.Sidebar} title="Sidebar">
          <ul className={styles.ListOfLinks}>
            <Link className={styles.Links} to="/user/profile"><li className={styles.Box}>Mi Perfil</li></Link>
            <Link className={styles.Links} to="/user/orders"><li className={styles.Box}>Ordernes y Pagos</li></Link>
            <Link className={styles.Links} to="/user/result&payment"><li className={styles.Box}>Examenes y Resultados</li></Link>
            <Link className={styles.Links} to="/user/appointment"><li className={styles.Box}>Obtener turno</li></Link>
            <Link className={styles.Links} to="/user/reviews"><li className={styles.Box}>Reviews</li></Link>
          </ul>
        </div>
        <div className={styles.Display} title="Display">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
