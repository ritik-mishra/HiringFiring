import React, { Component, useMemo } from 'react';
import {useTable} from "react-table";

export const Jobstack =() =>{
  const data = [{  
    name: 'Ayaan',  
    age: 26  
    },{  
     name: 'Ahan',  
     age: 22  
     },{  
     name: 'Peter',  
     age: 40      
     },{  
     name: 'Virat',  
     age: 30  
     },{  
     name: 'Rohit',  
     age: 32  
     },{  
     name: 'Dhoni',  
     age: 37  
     }]  
  const columns = [{  
    Header: 'Name',  
    accessor: 'name'  
    },{  
    Header: 'Age',  
    accessor: 'age'  
    }]  
    const tableInstance = useTable({
      columns, data
    })

    const {
      getTableProps, getTableBodyProps, headerGroups, rows, prepareRow
    } = tableInstance
    return(
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
            
          </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td> 
                  })}
            
                </tr>
              )
            })
          }
          
        </tbody>
      </table>
    )

}
  
export default Jobstack;