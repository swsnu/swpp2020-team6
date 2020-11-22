import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const StyledTabs = withStyles({
  root: {
    textColor: "",
  },
  indicator: {
    height: "3px",
    backgroundColor: "#6E1D00",
  },
})(Tabs);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 18,
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(4),
    "&$selected": {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  selected: {},
}))(Tab);

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2} boxShadow={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number,
};

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    background: "#FA391E",
  },
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledMyPage = (props) => {
  const { classes, tab, onChange, disabled, myRoadmaps, pinnedRoadmaps } = props;

  return (
    <div className={classes.root}>
      <AppBar position="relative" style={{ backgroundColor: "#ED351C" }}>
        <StyledTabs
          id="mypage-tabs"
          value={tab}
          onChange={onChange}
          aria-label="simple tabs example"
          variant="fullWidth"
          centered
        >
          <StyledTab label="My Roadmaps" {...a11yProps(0)} />
          <StyledTab label="Pinned Roadmaps" {...a11yProps(1)} disabled={disabled} />
        </StyledTabs>
      </AppBar>
      <TabPanel value={tab} index={0}>
        <Box className="roadmap-list" display="flex" flexDirection="row" flexWrap="wrap">
          {myRoadmaps}
        </Box>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Box className="roadmap-list" display="flex" flexDirection="row" flexWrap="wrap">
          {pinnedRoadmaps}
        </Box>
      </TabPanel>
    </div>
  );
};

StyledMyPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any),
  tab: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  myRoadmaps: PropTypes.arrayOf(PropTypes.any),
  pinnedRoadmaps: PropTypes.arrayOf(PropTypes.any),
};

export default withStyles(styles)(StyledMyPage);
