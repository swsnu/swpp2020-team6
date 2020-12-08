import React from "react";
import PropTypes from "prop-types";
import PersonIcon from "@material-ui/icons/Person";

import "./UserCard.scss";

const UserCard = (props) => {
  const { authorName, authorId, history } = props;

  return (
    <div
      className="UserCard"
      onClick={() => {
        history.push(`/mypage/${authorId}`);
      }}
    >
      <div className="user-image">{authorName.charAt(0).toUpperCase()}</div>
      <PersonIcon className="user-icon" />
      <div className="user-name">{authorName}</div>
    </div>
  );
};

UserCard.propTypes = {
  authorName: PropTypes.string,
  authorId: PropTypes.number,
  history: PropTypes.objectOf(PropTypes.any),
};

export default UserCard;
