import React, {useEffect, useState} from "react";
import Table from "./Table";

const App = () => {

    const [load, setLoad] = useState(true);
    const [data, setData] = useState(true);
    const [onlyActive, setOnlyActive] = useState(false);

    useEffect(async () => {
        /*** Здесь мы делаем вид, что запрашиваем данные на сервере. Этот запрос желательно вынести в Redux,
            чтобы не повторять его каждый раз, когда меняется значение onlyActive */
        const answer = await fetch('./data.json');
        const data = await answer.json();
        const formattedData = formattingData(onlyActive ? data.filter((value) => value.isActive) : data);
        setData(formattedData);
        setLoad(false);
    }, [onlyActive]);

    const formattingData = (data) => {
        /*** Меняем структуру данных на более удобную. Алгоритм из 3 не вложенных циклов, сложность O(n), приемлема для данной задачи */
        const mappedData = {};
        data.forEach((value) => {
            mappedData[value.id] = value;
        });

        data.forEach((value) => {
            if(value.parentId && mappedData[value.parentId]) {
                const children = mappedData[value.parentId].children;
                mappedData[value.parentId].children  = children ? [...children, value] : [value];
            }
        });

        return data.filter((value) => !value.parentId);
    }

    return load ? <div>{'Load'}</div>
        : <>
            <Table data={data}/>
            <label>{'Показывать только isActive'}
                <input type={'checkbox'}
                       onChange={() => setOnlyActive(!onlyActive)}
                       checked={onlyActive}
                />
            </label>
        </>
};
export default App;
