/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import styles from "./ActiveDrivers.module.css";

const ActiveDrivers = ({ drivers }) => {
  return (
    <div className={styles.activeDrivers}>
      {drivers.map(driver => (
        <div key={driver.id} className={styles.active}>
          <span />
          {`${driver.name} 
            speed: 50km/h`}
        </div>
      ))}
    </div>
  );
};

ActiveDrivers.propTypes = {
  drivers: PropTypes.objectOf(PropTypes.string)
};

export default ActiveDrivers;
