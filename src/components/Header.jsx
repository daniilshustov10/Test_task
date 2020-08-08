import React, { Component } from 'react'
import { SMALL_DATASET_URL, BIG_DATASET_URL } from '../constants'
import PropTypes from 'prop-types'

class Header extends Component {

    state = {
        selectValue: 'small'
    }

    onChangeHandler = event => {
        this.setState({selectValue: event.target.value})
    }

    onClickHandler = () => {
        const { getData } = this.props
        const { selectValue } = this.state

        selectValue === 'small' ? getData(SMALL_DATASET_URL) : getData(BIG_DATASET_URL)
    }
    

    render() {
        const { selectValue } = this.state
        const { disabled } = this.props
        return (
            <header className="pt-5">
                <select value={selectValue} onChange={this.onChangeHandler} id="select-dataset" className="custom-select mr-3">
                    <option value="small">Маленький набор данных</option>
                    <option value="big">Большой набор данных</option>
                </select>
                
                <button type="button" className="btn btn-primary" disabled={disabled} onClick={this.onClickHandler}>Загрузить</button>
            </header>
        )
    }
}

Header.propTypes = {
    getData: PropTypes.func,
    disabled: PropTypes.bool
}

export default Header