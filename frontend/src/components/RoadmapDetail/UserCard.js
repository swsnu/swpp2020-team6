import React from "react";
import PropTypes from "prop-types";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

import "./UserCard.scss";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: "#ff0000",
    width: 30,
    height: 30,
    fontSize: 25,
    textAlign: "center",
  },
});

const UserCard = (props) => {
  const classes = useStyles();
  const { authorName, onClick } = props;

  return (
    <div className="UserCard">
      <PersonOutlineOutlinedIcon className="person-icon" />
      <CardHeader
        className="card-header"
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {authorName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={authorName}
        onClick={() => onClick()}
      />
    </div>
  );
};

UserCard.propTypes = {
  authorName: PropTypes.string,
  onClick: PropTypes.func,
};

export default UserCard;
