import React, { useState } from 'react';
import styles from '../../styles/Home.module.css'; // Import your styles

const DualListSelection = () => {
    const list1Items = ['Item 1', 'Item 2', 'Item 3'];
    const list2Items = {
        'Item 1': ['Subitem A', 'Subitem B', 'Subitem C'],
        'Item 2': ['Subitem X', 'Subitem Y', 'Subitem Z'],
        'Item 3': ['Subitem P', 'Subitem Q', 'Subitem R'],
    };
    const jobList = ['Job A', 'Job B', 'Job C', 'Job D'];

    const [selectedList1Item, setSelectedList1Item] = useState(null);
    const [selectedList2Item, setSelectedList2Item] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [scrollList, setScrollList] = useState([]);

    const handleList1Selection = (item) => {
        setSelectedList1Item(item);
        setSelectedList2Item(null);
        setSelectedJob(null);
    };

    const handleList2Selection = (item) => {
        setSelectedList2Item(item);
        setSelectedJob(null);
    };

    const handleJobSelection = (job) => {
        setSelectedJob(job);
        setSelectedList1Item(null);
        setSelectedList2Item(null);
    };

    const addToScrollList = () => {
        if (selectedList2Item && !scrollList.includes(selectedList2Item)) {
            setScrollList((prevList) => [...prevList, selectedList2Item]);
        } else if (selectedJob && !scrollList.includes(selectedJob)) {
            setScrollList((prevList) => [...prevList, selectedJob]);
        }
    };

    const removeFromScrollList = (itemToRemove) => {
        setScrollList((prevList) => prevList.filter((item) => item !== itemToRemove));
    };

    const clearScrollList = () => {
        setScrollList([]);
    };

    return (
        <div className={styles.dualListContainer}>
            <div className={styles.listContainer}>
                <h2>List 1</h2>
                <ul>
                    {list1Items.map((item) => (
                        <li
                            key={item}
                            onClick={() => handleList1Selection(item)}
                            className={
                                selectedList1Item === item ? styles.selected : styles.item
                            }
                        >
                            {item}
                        </li>
                    ))}
                </ul>
                <p>Selected Item in List 1: {selectedList1Item}</p>
            </div>

            <div className={styles.listContainer}>
                <h2>List 2</h2>
                <ul>
                    {selectedList1Item &&
                        list2Items[selectedList1Item].map((item) => (
                            <li
                                key={item}
                                onClick={() => handleList2Selection(item)}
                                className={
                                    selectedList2Item === item ? styles.selected : styles.item
                                }
                            >
                                {item}
                            </li>
                        ))}
                </ul>
                <p>Selected Item in List 2: {selectedList2Item}</p>
                <button onClick={addToScrollList}>Add to Scroll List</button>
            </div>

            <div className={styles.listContainer}>
                <h2>Job List</h2>
                <ul>
                    {jobList.map((job) => (
                        <li
                            key={job}
                            onClick={() => handleJobSelection(job)}
                            className={
                                selectedJob === job ? styles.selected : styles.item
                            }
                        >
                            {job}
                        </li>
                    ))}
                </ul>
                <p>Selected Job: {selectedJob}</p>
                <button onClick={addToScrollList}>Add to Scroll List</button>
            </div>

            <div className={styles.scrollListContainer}>
                <h2>Scroll List</h2>
                <ul className={styles.scrollList}>
                    {scrollList.map((item) => (
                        <li key={item} onClick={() => removeFromScrollList(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
                <button onClick={clearScrollList}>Clear Scroll List</button>
            </div>
        </div>
    );
};

export default DualListSelection;