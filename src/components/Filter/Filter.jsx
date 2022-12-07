import PropTypes from 'prop-types';
import React from 'react';
import {Label} from './Filter.styled'

const Filter = ({ value, onChange }) => {
    return (<Label>Find contacts<input type="text"
        value={value}
        onChange={onChange} />
    </Label>);
};

Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
}
export default Filter;