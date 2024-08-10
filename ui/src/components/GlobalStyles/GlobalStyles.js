import PropTypes from 'prop-types';
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
    // return React.Children.only(children); //chỉ chấp nhận một con
    return <div className='app'>
        {children}
    </div>;
}

GlobalStyles.protoTypes = {
    children: PropTypes.node.isRequired,
};
export default GlobalStyles;
