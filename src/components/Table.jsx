import React, { useState } from 'react'
import AddForm from './AddForm'
import PropTypes from 'prop-types'

function Table({ data, onSort, sortField, sortDirection, showSelectedUser, addRowToTable }) {
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="table_block mt-5">
            <button 
                type="button" 
                className="add-row btn btn-primary" 
                onClick={() => {
                    showForm 
                    ? setShowForm(false) 
                    : setShowForm(true)}}>
                        {showForm 
                        ? 'Скрыть' 
                        : 'Добавить'}
                        </button>
            {showForm && <AddForm addRowToTable={addRowToTable}/>}
            <table className="table mt-2">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col" onClick={onSort.bind(null, 'id')}>id{sortField === 'id' ? <small className="ml-1">{sortDirection}</small> : null}</th>
                    <th scope="col" onClick={onSort.bind(null, 'firstName')}>FirstName{sortField === 'firstName' ? <small className="ml-1">{sortDirection}</small> : null}</th>
                    <th scope="col" onClick={onSort.bind(null, 'lastName')}>LastName{sortField === 'lastName' ? <small className="ml-1">{sortDirection}</small> : null}</th>
                    <th scope="col" onClick={onSort.bind(null, 'email')}>Email{sortField === 'email' ? <small className="ml-1">{sortDirection}</small> : null}</th>
                    <th scope="col" onClick={onSort.bind(null, 'phone')}>Phone{sortField === 'phone' ? <small className="ml-1">{sortDirection}</small> : null}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id + item.phone} onClick={showSelectedUser.bind(null, item)}>
                            <th scope="row">{item.id}</th>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                        </tr>
                    ))}    
                </tbody>
            </table> 
        </div>
    )
}

Table.propTypes = {
    data : PropTypes.arrayOf(PropTypes.object),
    onSort: PropTypes.func,
    sortField: PropTypes.string,
    sortDirection: PropTypes.string,
    showSelectedUser: PropTypes.func,
    addRowToTable: PropTypes.func
}

export default Table