import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";
import "../../../css/basic.scss";

const BootstrapInput = withStyles((theme) => ({
  root: {
    border: "2px solid #cccccc",
    borderRadius: 5,
  },
  input: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: "100%",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: ["Ubuntu"].join(","),
    "&:focus": {
      borderRadius: 5,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
  error: {
    border: "2px solid #ff0000",
    borderRadius: 5,
  },
}))(InputBase);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Ubuntu"].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(MenuItem);

const style = {
  root: { fontFamily: ["Ubuntu"].join(",") },
};

const stylesSelect = (theme) => ({
  formControl: {
    padding: theme.spacing(1),
    minWidth: 170,
  },
});

const StyledSelect = (props) => {
  const { classes, value, onChange, items, customId, label } = props;

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl} error={value === 0}>
        <InputLabel id={`${customId}-label`}>{label}</InputLabel>
        <Select
          style={style}
          labelId={`${customId}-label`}
          id={customId}
          value={value}
          onChange={onChange}
          input={<BootstrapInput />}
        >
          {items.map((item) => {
            return <StyledMenuItem value={item.value}>{item.name}</StyledMenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
};

StyledSelect.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any),
  value: PropTypes.number,
  onChange: PropTypes.func,
  items: PropTypes.objectOf(PropTypes.object),
  customId: PropTypes.string,
  label: PropTypes.string,
};

export default withStyles(stylesSelect)(StyledSelect);
