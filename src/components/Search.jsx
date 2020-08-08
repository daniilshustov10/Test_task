import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ searchHandler }) => {
    const [value, setValue] = useState('')

    function onChangeHandler(event) {
        setValue(event.target.value)
    }

    return (
        <div className="input-group search-row mt-5">            
            <input type="text" value={value} onChange={onChangeHandler} className="form-control" />
            <div className="input-group-prepend">
                <button type="button" className="btn btn-primary" onClick={() => searchHandler(value)}>Поиск</button>
            </div>
        </div>
    )
}

Search.propTypes = {
    searchHandler: PropTypes.func
}

export default Search