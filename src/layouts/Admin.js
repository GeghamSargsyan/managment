import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import { getUserInfo } from "selectors";
import { getDrivers as getDriversAc } from "store/thunks";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/logo.jpg";
let ps;

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = useRef();

  const user = useSelector(getUserInfo);
  // states and functions
  const [image, setImage] = useState(bgImage);
  const [color, setColor] = useState("blue");
  const [fixedClasses, setFixedClasses] = useState("dropdown");
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.userId) return;
    dispatch(getDriversAc(user.userId));
  }, [user, dispatch, getDriversAc]);

  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  // initialize and destroy the PerfectScrollbar plugin
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Freight Managment"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {routes.map((prop, key) => {
                  if (prop.layout === "/admin") {
                    return (
                      <Route
                        path={prop.layout + prop.path}
                        render={() => <prop.component />}
                        key={key}
                      />
                    );
                  }
                  return null;
                })}
                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
            </div>
          </div>
        ) : (
          <div className={classes.map}>
            <Switch>
              {routes.map((prop, key) => {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    render={() => <prop.component />}
                    key={key}
                  />
                );
              })}
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
          </div>
        )}
        {getRoute() ? <Footer /> : null}
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </div>
  );
}

// addd drever
// firestore.collection("driverInfo").doc(Math.random() * 897 + 'ss').set({
//   id: Math.random() * 897,
//   driver: "Gnel AloYan",
//   age: 22,
//   country: "armenia, ashtarak",
//   spentFuel: "150 L",
//   FuelConsumption: "500 L",
//   tel: "010 00 55 66 77",
//   homeTel: "010 88 44 65 94",
//   salary: "500 000 amd",
//   direction: "Rome, Italia",
//   location: "Iran"
// });
