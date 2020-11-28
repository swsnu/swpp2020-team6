import React from "react";
import PropTypes from "prop-types";

const MyTab = (props) => {
  const { tab, onClick, disabled, itemlists, labels } = props;

  return (
    <div className="MyTab">
      <div className="tab-menus">
        {labels.map((label, index) => (
          <button
            className={`tab-menu${index === tab ? "-clicked" : ""}`}
            type="button"
            onClick={() => onClick(index)}
            disabled={index === disabled}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tab-panel">
        {itemlists
          .filter((_, index) => index === tab)[0]
          .map((item) => {
            return <div className="tab-panel-item">{item}</div>;
          })}
      </div>
    </div>
  );
};

MyTab.propTypes = {
  tab: PropTypes.number,
  onClick: PropTypes.func,
  disabled: PropTypes.number,
  itemlists: PropTypes.arrayOf(PropTypes.any),
  labels: PropTypes.arrayOf(PropTypes.string),
};

export default MyTab;
