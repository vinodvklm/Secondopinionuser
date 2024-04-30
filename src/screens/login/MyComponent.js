import { requireNativeComponent, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const iface = {
  name: 'MyComponent',
  propTypes: {
    myCallback: PropTypes.func,
    ...ViewPropTypes,
  },
};

export default requireNativeComponent('MyComponent', iface);