import React from "react";
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: "#ff0000",
  },
});

const UserCard = (props) => {
  const classes = useStyles();
  const { authorName, onClick } = props;

  return (
    <div className="UserCard">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {authorName.charAt(0)}
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
