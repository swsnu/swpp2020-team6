import React from "react";
import PropTypes from "prop-types";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

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
      <PersonOutlineOutlinedIcon className="user-icon" />
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
