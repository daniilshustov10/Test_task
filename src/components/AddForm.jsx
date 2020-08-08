import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddForm extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        disabled: true
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    isValidForm = () => {
        const { firstName, lastName, email, phone } = this.state
        if (firstName && lastName && email && phone) {
            this.setState({disabled: false})
        }
    }

    submitForm = event => {        
        event.preventDefault()

        const { firstName, lastName, email, phone } = this.state
        const { addRowToTable } = this.props

        const row = {
            firstName,
            lastName,
            email,
            phone          
        }

        addRowToTable(row)

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            disabled: true
        })
    }

    render() {
        const { firstName, lastName, email, phone, disabled } = this.state

        return (    
            <form id="form" onSubmit={this.submitForm}>
                <div className="form-group">
                    <label forhtml="firstName">First name</label>
                    <input 
                        type="text"  
                        className="form-control" 
                        onChange={this.onChange}
                        onKeyUp={this.isValidForm}
                        name="firstName" 
                        id="firstName" 
                        value={firstName} 
                    />
                </div>
                <div className="form-group">
                    <label forhtml="lastName">Last name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        onChange={this.onChange} 
                        onKeyUp={this.isValidForm} 
                        name="lastName" 
                        id="lastName" 
                        value={lastName}  
                    />
                </div>
                <div className="form-group">
                    <label forhtml="email">E-mail</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        onChange={this.onChange}
                        onKeyUp={this.isValidForm}  
                        name="email" 
                        id="email" 
                        value={email} 
                    />
                </div>
                <div className="form-group">
                    <label forhtml="phone">Phone</label>
                    <input 
                        type="phone" 
                        className="form-control" 
                        onChange={this.onChange}
                        onKeyUp={this.isValidForm}
                        name="phone" 
                        id="phone" 
                        value={phone} 
                    />
                </div>                
                
                <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={disabled}>
                        Добавить в таблицу
                </button>
            </form>
        )
    }
}

AddForm.propTypes = {
    addRowToTable: PropTypes.func
}

export default AddForm