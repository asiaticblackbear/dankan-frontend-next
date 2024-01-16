import React, { useState } from 'react';
import { Button, List, ListItem, Typography, Container } from '@mui/material';
import styles from '../../styles/Home.module.css'; // Import your styles

const DualListSelection = () => {
    const list1Items = ['Item 1', 'Item 2', 'Item 3'];
    const list2Items = {
        'Item 1': ['Subitem A', 'Subitem B', 'Subitem C'],
        'Item 2': ['Subitem X', 'Subitem Y', 'Subitem Z'],
        'Item 3': ['Subitem P', 'Subitem Q', 'Subitem R'],
    };
    const list3Items = ['Item X', 'Item Y', 'Item Z'];

    const [selectedList1Item, setSelectedList1Item] = useState(null);
    const [selectedList2Item, setSelectedList2Item] = useState(null);
    const [scrollList, setScrollList] = useState([]);

    const handleList1Selection = (item) => {
        setSelectedList1Item(item);
        setSelectedList2Item(null);
        addToScrollList(list1Items.indexOf(item)); // Add corresponding item from List 3
    };

    const handleList2Selection = (item) => {
        setSelectedList2Item(item);
        addToScrollList(list2Items[selectedList1Item].indexOf(item)); // Add corresponding item from List 3
    };

    const addToScrollList = (index) => {
        const newItem = list3Items[index];
        if (!scrollList.includes(newItem)) {
            setScrollList((prevList) => [...prevList, newItem]);
        }
    };

    const removeFromScrollList = (itemToRemove) => {
        setScrollList((prevList) => prevList.filter((item) => item !== itemToRemove));
    };

    const clearScrollList = () => {
        setScrollList([]);
    };

    return (
        <Container maxWidth="md" className={styles.dualListContainer}>
            <List>
                <Typography variant="h6">List 1</Typography>
                {list1Items.map((item) => (
                    <ListItem
                        key={item}
                        onClick={() => handleList1Selection(item)}
                        selected={selectedList1Item === item}
                        button
                    >
                        {item}
                    </ListItem>
                ))}
                <Typography>Selected Item in List 1: {selectedList1Item}</Typography>
            </List>

            <List>
                <Typography variant="h6">List 2</Typography>
                {selectedList1Item &&
                    list2Items[selectedList1Item].map((item) => (
                        <ListItem
                            key={item}
                            onClick={() => handleList2Selection(item)}
                            selected={selectedList2Item === item}
                            button
                        >
                            {item}
                        </ListItem>
                    ))}
                <Typography>Selected Item in List 2: {selectedList2Item}</Typography>
                <Button variant="contained" onClick={addToScrollList}>
                    Add to Scroll List
                </Button>
            </List>

            <List>
                <Typography variant="h6">List 3</Typography>
                {list3Items.map((item) => (
                    <ListItem key={item} onClick={() => addToScrollList(list3Items.indexOf(item))} button>
                        {item}
                    </ListItem>
                ))}
            </List>

            <List>
                <Typography variant="h6">Scroll List</Typography>
                {scrollList.map((item) => (
                    <ListItem key={item} onClick={() => removeFromScrollList(item)} button>
                        {item}
                    </ListItem>
                ))}
                <Button variant="contained" onClick={clearScrollList}>
                    Clear Scroll List
                </Button>
            </List>
        </Container>
    );
};

export default DualListSelection;