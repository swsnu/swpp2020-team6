import PropTypes from "prop-types";
import { withRouter } from "react-router";

const Authenticate = (props) => {
  const { authenticated, history, address } = props;
  if (authenticated) {
    history.push(address);
  } else {
    history.push("/signin");
  }
};

Authenticate.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  address: PropTypes.string.isRequired,
};

export default withRouter(Authenticate);
