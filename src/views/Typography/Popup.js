import React from "react";
import styles from "./Popup.module.css";
import PropTypes from "prop-types";

const Popup = ({ open, handleToggle, handleChange, state, handleSave }) => {
  return (
    <div
      className={styles.popup}
      style={{ display: open ? "block" : "none" }}
      onClick={handleToggle}
    >
      {console.log(state, "stateeeeeeeeeeee")}
      <div className={styles.popupContainer}>
        <span className={styles.close} onClick={handleToggle()}>
          X
        </span>
        <section>
          <section className={styles.info}>
            <section className={styles.infoItem}>
              <small>Driver Name</small> <br />
              <span>{state.driver}e</span>
            </section>
            <section className={styles.infoItem}>
              <small>Driver Tel</small> <br />
              <span>
                TEL: {state.tel}
                <br />
                HOME: {state.homeTel}
              </span>
            </section>
            <section className={styles.infoItem}>
              <small>Car Make</small> <br />
              <span>{state.make}</span>
            </section>
            <section className={styles.infoItem}>
              <small>Car Model</small> <br />
              <span>{state.model}</span>
            </section>
            <section className={styles.infoItem}>
              <small>Number Of The Car</small> <br />
              <span>{state.NumberOfTheCar}</span>
            </section>
            <section className={styles.infoItem}>
              <small>Fuel consumption</small> <br />
              <span>{state.FuelConsumption} L</span>
            </section>
            <section className={styles.infoItem}>
              <small>spent fuel</small> <br />
              <span>{state.spentFuel}</span>
            </section>
          </section>
          <hr />
          <section className={styles.info}>
            <section className={styles.infoItem}>
              <small>location</small> <br />
              <span>{state.location}</span>
            </section>
            <section className={styles.infoItem}>
              <small>direction</small> <br />
              <span>{state.country}</span>
            </section>
            <section className={styles.infoItem}>
              <small>salary</small> <br />
              <span>{state.salary}</span>
            </section>
          </section>
          <section className={styles.change}>
            <hr />
            <section className={styles.row}>
              <label>
                Driver Name <br />
                <input
                  type="text"
                  placeholder="diver name"
                  onChange={handleChange(state.id, "driver")}
                />
              </label>
              <label>
                Driver age <br />
                <input
                  type="number"
                  placeholder="diver age"
                  onChange={handleChange(state.id, "age")}
                />
              </label>
              <label>
                Driver state <br />
                <input
                  type="text"
                  placeholder="diver state"
                  onChange={handleChange(state.id, "state")}
                />
              </label>
              <label>
                Driver Tel <br />
                <input
                  type="number"
                  placeholder="Tel"
                  onChange={handleChange(state.id, "tel")}
                />
                <br />
                <input
                  type="number"
                  placeholder="Home"
                  onChange={handleChange(state.id, "homeTel",)}
                />
              </label>
              <label>
                salary <br />
                <input
                  type="text"
                  placeholder="salary"
                  onChange={handleChange(state.id, "salary")}
                />
              </label>
              <label>
                Fuel consumption <br />
                <input
                  type="number"
                  placeholder="fuel consumption"
                  onChange={handleChange(state.id, "FuelConsumption")}
                />
              </label>
              <label>
                spent fuel <br />
                <input
                  type="number"
                  placeholder="spent fuel"
                  onChange={handleChange(state.id, "spentFuel")}
                />
              </label>
              <label>
                location <br />
                <input
                  type="text"
                  placeholder="location"
                  onChange={handleChange(state.id, "location")}
                />
              </label>
              <label>
                direction <br />
                <input
                  type="text"
                  placeholder="direction"
                  onChange={handleChange(state.id, "direction")}
                />
              </label>
            </section>
          </section>
          {console.log(state.id, 'idddddddddddddddddddddddddddddddd',state)}
          <button onClick={() => handleSave(state.id)}>Change</button>
        </section>
      </div>
    </div>
  );
};

Popup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default Popup;
