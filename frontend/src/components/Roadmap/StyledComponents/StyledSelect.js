import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";

const stylesSelect = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const StyledSelect = (props) => {
  const { classes, value, onChange, items, customId, label, placeholder } = props;

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl} error={value === 0}>
        <InputLabel id={`${customId}-label`}>{label}</InputLabel>
        <Select labelId={`${customId}-label`} id={customId} value={value} onChange={onChange}>
          <MenuItem value={0}>
            <em>{placeholder}</em>
          </MenuItem>
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
  placeholder: PropTypes.string,
};

export default withStyles(stylesSelect)(StyledSelect);
