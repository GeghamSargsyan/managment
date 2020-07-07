/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";

import cloneDeep from "clone-deep";
import { firestore } from "api";

import { getDrivers } from "selectors";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Popup from "./Popup";
import AddDriverPopup from "./AddDriverPopup";

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  searchBar: {
    margin: "0 auto",
    width: "400px",
    textAlign: "center"
  },
  searchBarInput: {
    padding: "10px",
    width: "300px",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2)",
    border: "1px solid grey",
    borderRadius: "15px"
  },
  row: {
    display: "flex",
    justifyContent: "space-around",
    margin: " 19px 0",
    padding: "19px 8px",
    fontSize: "16px",
    borderBottom: "2px solid",
    boxShadow: "0 12px 20px 0 #8080807a",
    textTransform: "capitalize",
    fontWeight: "bold"
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    marginTop: "50px"
  },
  th: {
    padding: "0.75rem",
    textAlign: "left",
    border: "1px solid #eee",
    textTransform: "capitalize"
  },
  td: {
    padding: "0.75rem",
    textAlign: "left",
    border: "1px solid #eee",
    textTransform: "capitalize"
  }
};

const initialstate = [
  {
    id: "s4845qsq",
    driver: "Davit Sargsya",
    age: 32,
    country: "armenia, ashtarak",
    spentFuel: "150 L",
    FuelConsumption: "500 L",
    driverTel: {
      tel: "010 00 55 66 77",
      home: "010 88 44 65 94"
    },
    salary: "500 000 amd",
    direction: "Rome, Italia",
    location: "Spain"
  },
  {
    id: "assasdas",
    driver: "Minas Hakobyan",
    age: 43,
    country: "armenia, yerevan",
    spentFuel: "150 L",
    FuelConsumption: "500 L",
    driverTel: {
      tel: "010 00 55 66 77",
      home: "010 88 44 65 94"
    },
    salary: "500 000 amd",
    direction: "Rome, Italia",
    location: "russia"
  },
  {
    id: "s4h845qsq",
    driver: "Levon Amiryan",
    age: 28,
    country: "armenia, aparan",
    spentFuel: "150 L",
    FuelConsumption: "500 L",
    driverTel: {
      tel: "010 00 55 66 77",
      home: "010 88 44 65 94"
    },
    salary: "500 000 amd",
    direction: "Rome, Italia",
    location: "France"
  },
  {
    id: "s48aa45qsq",
    driver: "Lena Minasyan",
    age: 50,
    country: "armenia, yerevan",
    spentFuel: "150 L",
    FuelConsumption: "500 L",
    driverTel: {
      tel: "010 00 55 66 77",
      home: "010 88 44 65 94"
    },
    salary: "500 000 amd",
    direction: "Rome, Italia",
    location: "armenia"
  },
  {
    id: "s4847895qsq",
    driver: "Suren Mnacakanyan",
    age: 34,
    country: "armenia, stepanakert",
    spentFuel: "150 L",
    FuelConsumption: "500 L",
    driverTel: {
      tel: "010 00 55 66 77",
      home: "010 88 44 65 94"
    },
    salary: "500 000 amd",
    direction: "Rome, Italia",
    location: "italia"
  },
  {
    id: "s484555qsq",
    driver: "Armo Sargsya",
    age: 25,
    country: "armenia, goris",
    spentFuel: "150 L",
    FuelConsumption: "500 L",
    driverTel: {
      tel: "010 00 55 66 77",
      home: "010 88 44 65 94"
    },
    salary: "500 000 amd",
    direction: "Rome, Italia",
    location: "belarus"
  },
  {
    id: "s4840125qsq",
    driver: "Gagik Vazyan",
    age: 39,
    country: "armenia, gyumry",
    spentFuel: "150 L",
    FuelConsumption: "500 L",
    driverTel: {
      tel: "010 00 55 66 77",
      home: "010 88 44 65 94"
    },
    salary: "500 000 amd",
    direction: "Rome, Italia",
    location: "yerevan"
  },
  {
    id: "s484.255qsq",
    driver: "Gnel AloYan",
    age: 22,
    country: "armenia, ashtarak",
    spentFuel: "150 L",
    FuelConsumption: "500 L",
    driverTel: {
      tel: "010 00 55 66 77",
      home: "010 88 44 65 94"
    },
    salary: "500 000 amd",
    direction: "Rome, Italia",
    location: "Iran"
  }
];

const useStyles = makeStyles(styles);

export default function TypographyPage(props) {
  const driversInfo = useSelector(getDrivers);

  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const classes = useStyles();
  const state = useCallback(
    () => cloneDeep([driversInfo ? cloneDeep(driversInfo) : []]),
    [props]
  );
  const [option, setOption] = useState({});
  const [popupState, setPopupState] = useState({});

  const handleChange = useCallback(
    (id, fildName) => event => {
      const value = event.target.value;

      setOption(prevState => ({
        ...prevState,
        [fildName]: value
      }));
    },
    [option, setOption]
  );

  const handleSave = useCallback(
    async id => {
      try {
        const response = await firestore
          .collection("driverInfo")
          .where("id", "==", id)
          .get();

        const driver = response.docs.map(i => i.id)[0];
        console.log(option, driver, "hgjjhhghjghj");
        await firestore
          .collection("driverInfo")
          .doc(driver)
          .update({
            ...option
          });
      } catch (e) {
        console.error(e);
      }
    },
    [option]
  );

  const handleAdd = useCallback(data => {
    try {
      (async () => {
        await firestore
          .collection("driverInfo")
          .doc(Math.random() * 785 + "scsdsds")
          .set({
            ...data,
            admin_id: "DO1WA0qa2ieSVddwqLXPgZBCabi1"
          });
      })();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleToggle = useCallback(
    id => () => {
      if (id) {
        let curentDriver = {};
        console.log(
          props,
          "props.totalInfo.driversInfoprops.totalInfo.driversInfoprops.totalInfo.driversInfo"
        );
        driversInfo.forEach(driver => {
          if (driver.id === id) {
            curentDriver = driver;
          }
        });

        console.log(state(), curentDriver);
        setPopupState(curentDriver);
      }
      setOpen(prevState => !prevState);
    },
    [props]
  );

  const handleToggleAdd = useCallback(
    event => {
      event.stopPropagation();
      setOpenAdd(prevState => !prevState);
    },
    [setOpenAdd]
  );

  return (
    <>
      {createPortal(
        <Popup
          open={open}
          state={popupState}
          handleToggle={handleToggle}
          handleChange={handleChange}
          handleSave={handleSave}
        />,
        document.getElementById("root")
      )}
      {createPortal(
        <AddDriverPopup
          open={openAdd}
          handleToggleAdd={handleToggleAdd}
          handleChangeAdd={handleChange}
          handleAdd={handleAdd}
        />,
        document.getElementById("root")
      )}
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Drivers Information panel</h4>
        </CardHeader>
        <CardBody>
          <div className={classes.searchBar}>
            <input
              className={classes.searchBarInput}
              type="search"
              placeholder="Search"
            />
          </div>
          <button
            onClick={handleToggleAdd}
            style={{
              background: "#00acc1",
              color: "#fff",
              fontSize: "15px",
              padding: "7px",
              border: "0",
              width: "210px",
              margin: "25px 0",
              cursor: "pointer"
            }}
          >
            Add Driver &#x2b;
          </button>
          <section>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th className={classes.th}>Draiver</th>
                  <th className={classes.th}>Age</th>
                  <th className={classes.th}>Country</th>
                  <th className={classes.th}>location</th>
                  <th className={classes.th}>info</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(driversInfo) &&
                  driversInfo.map((driver, i) => (
                    <tr
                      key={driver.id + Math.random() * 878}
                      style={{ background: i % 2 === 0 ? "#ccc" : "#fff" }}
                    >
                      <td className={classes.th}>{driver.driver}</td>
                      <td className={classes.th}>{driver.age}</td>
                      <td className={classes.th}>{driver.country}</td>
                      <td className={classes.th}>{driver.location}</td>
                      <td
                        className={classes.th}
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer"
                        }}
                        onClick={handleToggle(driver.id)}
                      >
                        info
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        </CardBody>
      </Card>
    </>
  );
}
