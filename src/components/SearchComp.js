import { TextField } from "@material-ui/core";
import React from "react";

const SearchComp = (props) => {
  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        onChange={(e) => props.beenSearched(e.target.value)}
      />
    </div>
  );
};

export default SearchComp;
