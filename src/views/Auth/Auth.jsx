import React from "react";

import Login from "components/Login";

import styles from "./Auth.module.css";

export default function Auth() {
  return (
    <div className={styles.auth}>
      <Login />
    </div>
  );
}
