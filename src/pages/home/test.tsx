import React, { useState } from 'react';
import {css} from "@emotion/react"; // CSS 파일을 import

const DualListSelection = () => {
    const list1Items = ['Item 1', 'Item 2', 'Item 3'];
    const list2Items = {
        'Item 1': ['Subitem A', 'Subitem B', 'Subitem C'],
        'Item 2': ['Subitem X', 'Subitem Y', 'Subitem Z'],
        'Item 3': ['Subitem P', 'Subitem Q', 'Subitem R'],
    };

    const [selectedList1Item, setSelectedList1Item] = useState(null);
    const [selectedList2Item, setSelectedList2Item] = useState(null);

    const handleList1Selection = (item) => {
        setSelectedList1Item(item);
        setSelectedList2Item(null);
    };

    const handleList2Selection = (item) => {
        setSelectedList2Item(item);
    };

    return (
        <div css={dualListContainer}>
            <div css={listContainer}>
                <h2>List 1</h2>
                <ul>
                    {list1Items.map((item) => (
                        <li
                            key={item}
                            onClick={() => handleList1Selection(item)}
                            /*className={
                                selectedList1Item === item ? styles.selected : styles.item
                            }*/
                        >
                            {item}
                        </li>
                    ))}
                </ul>
                <p>Selected Item in List 1: {selectedList1Item}</p>
            </div>

            <div css={listContainer}>
                <h2>List 2</h2>
                <ul>
                    {selectedList1Item &&
                        list2Items[selectedList1Item].map((item) => (
                            <li
                                key={item}
                                onClick={() => handleList2Selection(item)}
                                /*className={
                                    selectedList2Item === item ? styles.selected : styles.item
                                }*/
                            >
                                {item}
                            </li>
                        ))}
                </ul>
                <p>Selected Item in List 2: {selectedList2Item}</p>
            </div>
        </div>
    );
};


const dualListContainer = css`
    display: flex;
    justify-content: space-around;
    margin: 20px;
`

const listContainer = css`
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`

const item = css`
  cursor: pointer;
  list-style: none;
  padding: 5px;
  margin: 5px;
  background-color: #fff;
  transition: background-color 0.3s;
`



export default DualListSelection;