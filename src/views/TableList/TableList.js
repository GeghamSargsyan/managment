import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { getDrivers } from "selectors";

// core components
import moment from "moment";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList(props) {
  const classes = useStyles();

  const driversInfo = useSelector(getDrivers);

  const [state, setState] = useState({
    week: [],
    month: []
  });

  useEffect(() => {
    const currentDate = moment();

    const weekStart = currentDate
      .clone()
      .startOf("isoWeek")
      .format("YYYY-MM-DD");
    const weekEnd = currentDate
      .clone()
      .endOf("isoWeek")
      .format("YYYY-MM-DD");

    const getKey = obj => {
      const [dd, mm, yy] = Object.keys(obj)[0].split("/");
      return `${yy}-${mm}-${dd}`;
    };
    const getPerWeek = spentFuels => {
      let perWeek = 0;
      if (!spentFuels) return;
      spentFuels.forEach(item => {
        if (moment(getKey(item)).isBetween(weekStart, weekEnd)) {
          perWeek += +Object.values(item)[0];
        }
      });
      return perWeek || "0";
    };

    const data = Array.isArray(driversInfo)
      ? driversInfo.reduce((newArr, item) => {
          newArr.push([
            item.driver,
            `${item.make} ${item.model}`,
            item.Mileage || 0,
            item.spentFuels ? getPerWeek(item.spentFuels) : 0
          ]);
          return newArr;
        }, [])
      : [];

    const startOfMonth = moment()
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = moment()
      .endOf("month")
      .format("YYYY-MM-DD");

    const getPerMothe = spentFuels => {
      let perMoth = 0;
      if (!spentFuels) return;
      spentFuels.forEach(item => {
        if (moment(getKey(item)).isBetween(startOfMonth, endOfMonth)) {
          perMoth += +Object.values(item)[0];
        }
      });
      return perMoth || "0";
    };

    const data2 =
      Array.isArray(driversInfo) &&
      driversInfo.reduce((newArr, item) => {
        newArr.push([
          item.driver,
          `${item.make} ${item.model}`,
          item.Mileage || 0,
          item.spentFuels ? getPerMothe(item.spentFuels) : 0
        ]);
        return newArr;
      }, []);

    setState({
      month: data2,
      week: data
    });
    console.log(data, "dataaaaaaaa");
  }, [props]);
  return (
    <GridContainer>
      {/* {console.log(props.totalInfo, "propsssssssssssssssssss", getTabeleData())} */}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>
              Fuel consumption per week
            </h4>
            <p className={classes.cardCategoryWhite}>information</p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="info"
              tableHead={["Name", "Car Type", "Mileage", "Fuel consumption"]}
              tableData={state.week || []}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Fuel consumption per month
            </h4>
            <p className={classes.cardCategoryWhite}>information</p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Car Type", "Mileage", "Fuel consumption"]}
              tableData={state.month || []}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
