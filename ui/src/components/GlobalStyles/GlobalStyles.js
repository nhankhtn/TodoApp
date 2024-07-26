import PropTypes from 'prop-types';
import './GlobalStyles.scss';
import '~/assets/fonts/themify-icons-font/themify-icons/themify-icons.css';

function GlobalStyles({ children }) {
    // return React.Children.only(children); //chỉ chấp nhận một con
    return children;
}

GlobalStyles.protoTypes = {
    children: PropTypes.node.isRequired,
};
export default GlobalStyles;
