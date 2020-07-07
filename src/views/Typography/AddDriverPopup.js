import React, { useState, useCallback } from "react";
import styles from "./Popup.module.css";
import PropTypes from "prop-types";

const AddDriverPopup = ({ open, handleToggleAdd, handleAdd }) => {
  const [state, setstate] = useState({
    FuelConsumption: null,
    NumberOfTheCar: null,
    admin_id: Math.random() * 8999 + "DO1WA0qa2ieSVddwqLXPgZBCabi1",
    age: null,
    country: null,
    direction: null,
    driver: null,
    homeTel: null,
    id: "65146546uihiughuygyug",
    latitude: "54.6445",
    location: null,
    longitude: "54.6566"
  });

  const handleChange = useCallback(
    name => event => {
      const value = event.target.value;
      setstate(prevState => ({
        ...prevState,
        [name]: value
      }));
    },
    [state]
  );
  return (
    <div
      className={styles.popup}
      style={{ display: open ? "block" : "none" }}
      // onClick={handleToggleAdd}
    >
      <div
        className={styles.popupContainer}
        style={{ width: "60%", height: "67vh", paddingTop: "10px" }}
      >
        <span className={styles.close} onClick={handleToggleAdd}>
          X
        </span>
        <section>
          <section className={styles.change}>
            <h2 style={{ textAlign: "center" }}>Add Driver</h2>
            <hr />
            <section className={styles.row}>
              <label>
                Car make <br />
                <input
                  type="text"
                  placeholder="car make"
                  onChange={handleChange("make")}
                />
              </label>
              <label>
                car model <br />
                <input
                  type="text"
                  placeholder="car model"
                  onChange={handleChange("model")}
                />
              </label>
              <label>
                Number Of The Car <br />
                <input
                  type="text"
                  placeholder="Number Of The Car"
                  onChange={handleChange("NumberOfTheCar")}
                />
              </label>
              <label>
                Driver Name <br />
                <input
                  type="text"
                  placeholder="diver name"
                  onChange={handleChange("driver")}
                />
              </label>
              <label>
                Driver age <br />
                <input
                  type="number"
                  placeholder="diver age"
                  onChange={handleChange("age")}
                />
              </label>
              <label>
                Driver state <br />
                <input
                  type="text"
                  placeholder="diver state"
                  onChange={handleChange("country")}
                />
              </label>
              <label>
                Driver Tel <br />
                <input
                  type="number"
                  placeholder="Tel"
                  onChange={handleChange("tel")}
                />
                <br />
                <input
                  type="number"
                  placeholder="Home"
                  onChange={handleChange("homeTel")}
                />
              </label>
              <label>
                salary <br />
                <input
                  type="text"
                  placeholder="salary"
                  onChange={handleChange("salary")}
                />
              </label>
              <label>
                Fuel consumption <br />
                <input
                  type="number"
                  placeholder="fuel consumption"
                  onChange={handleChange("FuelConsumption")}
                />
              </label>
              <label>
                spent fuel <br />
                <input
                  type="number"
                  placeholder="spent fuel"
                  onChange={handleChange("spentFuel")}
                />
              </label>
              <label>
                location <br />
                <input
                  type="text"
                  placeholder="location"
                  onChange={handleChange("location")}
                />
              </label>
              <label>
                direction <br />
                <input
                  type="text"
                  placeholder="direction"
                  onChange={handleChange("direction")}
                />
              </label>
            </section>
          </section>
          <button onClick={() => handleAdd({ ...state })}>Add</button>
        </section>
      </div>
    </div>
  );
};

AddDriverPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleToggleAdd: PropTypes.func.isRequired,
  handleChangeAdd: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired
};

export default AddDriverPopup;
