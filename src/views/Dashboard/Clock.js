import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

export default function Clock() {
  const [time, setTime] = useState({
    date: null,
    time: null
  });

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    const [date, currentTime] = new Date().toLocaleString().split(",");
    setTime({ date, time: currentTime });
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <h3 className={classes.cardTitle}>{time.time && time.time}</h3>
      <h3 className={classes.cardTitle}>{time.date && time.date}</h3>
    </React.Fragment>
  );
}
