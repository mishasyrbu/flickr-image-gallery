import React from 'react';
import classNames from 'classnames';

import './styles.scss';

export interface Props {
    placeholder?: string,
    className?: string,
    value: string,
    onChange: Function,
}

const SearchInput: React.FC<Props> = ({ placeholder, className, value, onChange }) => {
    const handleOnChangeEvent = (event: React.SyntheticEvent) => {
        const value = (event.target as HTMLInputElement).value;
        onChange(value);
    };

    return (
        <input
            className={classNames('search-input', className)}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleOnChangeEvent}
        />
    );
}

export default SearchInput;
