import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";

const stylesSelect = (theme) => ({
  formControl: {
    padding: theme.spacing(1),
    maxHeight: 50,
    minWidth: 150,
  },
});

const StyledSelect = (props) => {
  const { classes, value, onChange, items, customId, label } = props;

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl} error={value === 0}>
        <InputLabel id={`${customId}-label`}>{label}</InputLabel>
        <Select labelId={`${customId}-label`} id={customId} value={value} onChange={onChange}>
          {items.map((item) => {
            return <MenuItem value={item.value}>{item.name}</MenuItem>;
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
