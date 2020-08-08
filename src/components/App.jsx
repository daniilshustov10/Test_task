import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import ReactPaginate from 'react-paginate'
import Header from './Header'
import Table from './Table'
import Alert from './Alert'
import Loader from './Loader'
import SelectedUser from './SelectedUser'
import Search from './Search'

class App extends Component { 

    state = {
        data: [],
        isShowAlert: false,
        isLoading: false,
        disabled: false,
        sortDirection: 'desc',
        sortField: 'id',
        selectedUser: null,
        currentPage: 0,
        search: ''
    }

    getData = URL => {
        const { data, sortField } = this.state

        this.setState({
            isLoading: true, 
            disabled: true
        })

        return fetch(URL)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject(new Error(response.statusText))
                }
                return Promise.resolve(response)
            })
            .then(response => response.json())           
            .then(response => {
                this.setState({data: data.concat(response)})
            })
            .then(() => {
                this.setState({
                    isLoading: false,
                    disabled: false
                    })
                }
            )
            .then(() => this.onSort(sortField))
            .catch(e => {
                this.setState({isShowAlert: true})
                setTimeout(() => {
                    this.setState({isShowAlert: false})
                }, 3000)
            })
    }

    onSort = sortField => {
        const { data, sortDirection } = this.state

        const cloneData = data.concat()
        const reverseSortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
        const orderedData = _.orderBy(cloneData, sortField, reverseSortDirection)

        this.setState({
            data: orderedData,
            sortDirection: reverseSortDirection,
            sortField
        })
    }  
    
    addRowToTable = row => {
        const { data } = this.state
        this.setState({data: [{id: uuidv4(), ...row}, ...data]})
    }
    
    showSelectedUser = item => {
        this.setState({selectedUser: item })
    }

    hideSelectUser = () => {
        this.setState({selectedUser: null})
    }

    pageChangeHandler = ({selected}) => {
        this.setState({currentPage: selected})
    }

    searchHandler = search => {
        this.setState({search, currentPage: 0})
    }

    getFilteredData(){
        const {data, search} = this.state
    
        if (!search) {
          return data
        }    
  
        const regexp = new RegExp(search, 'i')
       
        const result = data.filter(item => {
            return regexp.test(item.firstName) || regexp.test(item.lastName) || regexp.test(item.email) || regexp.test(item.phone)
        })

        return result.length ? result : data
    }

    render() {
        const { 
            data, 
            isShowAlert, 
            isLoading, 
            sortDirection, 
            sortField, 
            selectedUser, 
            currentPage, 
            disabled 
        } = this.state
        
        const numberRows = 50
        const filterData = this.getFilteredData()
        const pageCount = Math.ceil(filterData.length/numberRows)
        const displayData  =  _.chunk(filterData, numberRows)[currentPage] 

        return (
            <div id="container">
                {isShowAlert && <Alert />}
                <Header getData={this.getData} disabled={disabled}/>
                {data.length 
                ? <Fragment>
                    <Search searchHandler={this.searchHandler}/>
                    <Table 
                        onSort={this.onSort} 
                        showSelectedUser={this.showSelectedUser}
                        addRowToTable={this.addRowToTable}
                        sortDirection={sortDirection} 
                        sortField={sortField} 
                        data={displayData}
                    /> {data.length > numberRows 
                        ?  <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.pageChangeHandler}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                nextClassName="page-item"
                                previousLinkClassName="page-link"
                                nextLinkClassName="page-link"
                                forcePage={currentPage}
                            />
                        : null
                     }
                   
                </Fragment>
                : isLoading 
                    ? <Loader /> 
                    : <p className="mt-5">Вы еще не загружали данные!</p>}
                {selectedUser && <SelectedUser selectedUser={selectedUser} hideSelectedUser={this.hideSelectUser}/>}
            </div>            
        )
    }  
}

export default App