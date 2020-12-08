import React from "react";
import PropTypes from "prop-types";
import PersonIcon from "@material-ui/icons/Person";
import { userColor } from "../../constants";

import "./UserCard.scss";

const UserCard = (props) => {
  const { authorName, authorId, history } = props;

  return (
    <button
      type="button"
      className="UserCard"
      onClick={() => {
        history.push(`/mypage/${authorId}`);
      }}
    >
      <div className="user-image" style={{ backgroundColor: userColor[authorId % 8] }}>
        {authorName.charAt(0).toUpperCase()}
      </div>
      <div className="user-name">
        <PersonIcon className="user-icon" />
        {authorName}
      </div>
    </button>
  );
};

UserCard.propTypes = {
  authorName: PropTypes.string,
  authorId: PropTypes.number,
  history: PropTypes.objectOf(PropTypes.any),
};

export default UserCard;
