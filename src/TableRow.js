import React, {useState} from "react";

const TableRow = ({data}) => {

    const [showChildren, setShowChildren] = useState(false);

    return <>
        <tr onClick={() => data.children && setShowChildren(!showChildren)}>
            <th>{data.name}
                {data.children ? <div className={showChildren ? 'children-show' : 'children-hide'}/> : null}
            </th>
            <th>{data.balance}</th>
            <th>{data.email}</th>
        </tr>
        {showChildren && data.children.map((value) => {
            return <TableRow data={value} key={value.id}/>
        })}
    </>
};
export default TableRow;
