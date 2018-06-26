import PropTypes from 'prop-types';

export const currentUserPropTypes = PropTypes.shape({
  firstName: PropTypes.string,
  role: PropTypes.string,
  department: PropTypes.string,
});
