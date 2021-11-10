import React from "react";
import TableRow from "./TableRow";

const Table = ({data}) => {

    return <table>
        <caption>{'Заголовок таблицы'}</caption>
        <thead>
            <tr>
                <th>{'name'}</th>
                <th>{'balance'}</th>
                <th>{'email'}</th>
            </tr>
        </thead>
        <tbody>
            {data.map((value) => {
                return <TableRow data={value} key={value.id}/>
            })}
        </tbody>
    </table>
};
export default Table;
