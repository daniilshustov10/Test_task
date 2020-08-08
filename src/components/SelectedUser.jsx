import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

const SelectedUser = ({ selectedUser, hideSelectedUser }) => {   

    return (
            <div className="selected-user">
            <p>Выбран пользователь <b>{selectedUser.firstName + ' ' + selectedUser.lastName}</b></p>
            {selectedUser.address && selectedUser.description
                ?   <Fragment>
                        <p>Описание:</p>
                        <textarea defaultValue={selectedUser.description} />
                        <p>Адрес проживания: <b>{selectedUser.address.streetAddress}</b></p>
                        <p>Город: <b>{selectedUser.address.city}</b></p>
                        <p>Провинция/штат: <b>{selectedUser.address.state}</b></p>
                        <p>Индекс: <b>{selectedUser.address.zip}</b></p>
                    </Fragment>
                : null                
            }
            <button type="button" className="btn btn-primary" onClick={hideSelectedUser}>Скрыть</button>            
        </div>
    )
}

SelectedUser.propTypes = {
    selectedUser: PropTypes.object,
    hideSelectedUser: PropTypes.func
}

export default SelectedUser