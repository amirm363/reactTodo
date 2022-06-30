import { Button, Card, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../styles/styles.css";

const useStyles = makeStyles(() => ({
  input1: {
    height: 25,
    padding: 0,
  },
}));

const OtherDataComp = (props) => {
  const [addressData, setAddressData] = useState(props.data.address);

  useEffect(() => {
    props.setUser((user) => {
      return { ...user, user: { ...user.user, address: addressData } };
    });
  }, [addressData]);

  const classes = useStyles();
  return (
    <Card id="card" style={{ borderColor: "black" }}>
      <div>
        <label className="Labels2 street" htmlFor="street">
          Street:
        </label>
        <TextField
          variant="outlined"
          className="textField"
          InputProps={{ classes: { input: classes.input1 } }}
          value={addressData.street}
          onChange={(e) =>
            setAddressData({ ...addressData, street: e.target.value })
          }
        />
        <br />
        <label className="Labels2 city" htmlFor="city">
          City:
        </label>
        <TextField
          variant="outlined"
          className="textField"
          InputProps={{ classes: { input: classes.input1 } }}
          value={addressData.city}
          onChange={(e) =>
            setAddressData({ ...addressData, city: e.target.value })
          }
        />
        <br />
        <label className="Labels2" htmlFor="zip-code">
          Zip Code:
        </label>
        <TextField
          variant="outlined"
          className="textField"
          InputProps={{ classes: { input: classes.input1 } }}
          value={addressData.zipcode}
          onChange={(e) =>
            setAddressData({ ...addressData, zipcode: e.target.value })
          }
        />
        <br />
      </div>
    </Card>
  );
};

export default OtherDataComp;
