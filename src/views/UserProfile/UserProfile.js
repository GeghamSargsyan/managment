import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserInfo } from "selectors";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
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
  }
};

const intialState = {
  fullname: "",
  email: "",
  city: "",
  country: "",
  postalCode: "",
  status: ""
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const user = useSelector(getUserInfo);
  const [option, setOption] = useState({ ...intialState });

  useEffect(() => {
    console.log(user, "userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    setOption(user);
  }, [user, option]);

  const handleChange = useCallback(inputName => {
    return event => {
      if (event && event.target && event.target.value && inputName) {
        const value = event.target.value;
        setOption(prevState => ({
          ...prevState,
          [inputName]: value
        }));
      }
    };
  });

  const handleClick = () => {};

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        {console.log(props, "propsikkk")}
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company: GLS"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText={option.fullname}
                    id="username"
                    onChange
                    formControlProps={{
                      fullWidth: true,
                      onChange: handleChange("username")
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={option.userEmail}
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                      onChange: handleChange("email")
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={option.city}
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                      onChange: handleChange("city")
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={option.country}
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                      onChange: handleChange("country")
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={option.postalCode}
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                      onChange: handleChange("postalCode")
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText={option.status}
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                      onChange: handleChange("status")
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button onClick={handleClick} color="primary">
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>
                Manager at {option.companyName}
              </h6>
              <h4 className={classes.cardTitle}>{option.fullname}</h4>
              <p className={classes.description}>{option.status}</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
