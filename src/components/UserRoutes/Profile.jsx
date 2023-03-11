import React from 'react'
import styles from "./Profile.module.css"

export default function Profile() {
  return (
    <div className={styles.ZonaDeDatos} title="Zona de Datos">
        <div className={styles.UserCard} title="Datos paciente">
          <div className={styles.AvatarContainer}>
            <div className={styles.AvatarPhoto}>
              <img alt="AvatarIMG"></img>
            </div>
          </div>
          
          <div className={styles.UserInfo}>Info</div>
          <div></div>
        </div> 
      </div>
  )
}
