import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import MaterialEdit from './MaterialEdit';
import '../styles/Materials.css';

const boxBackgroundColor = "#101013";

const circleStyle = {
    'width': '30px',
    'height': '30px',
    'border-radius': '15px'
}

const Materials = (props) => {
    const [materialsList, setMaterialsList] = useState([]);
    const [totalCost, setTotalCost] = useState(0.0);
    const [activeMaterial, setActiveMaterial] = useState({});
    const [hideMaterialEdit, setHideMaterialEdit] = useState(true);

    const baseURL = props.targetURL;

    useEffect(() => {
        axios.get(baseURL)
            .then((res) => {
                setMaterialsList(res.data);
            })
    }, []);

    useEffect(() => {
    let cost = 0.0;
    if(materialsList.length > 0) {
        const tempMaterialsList = materialsList;
        for (let i=0; i<tempMaterialsList.length; i++) {
            cost += parseFloat(tempMaterialsList[i].cost);
        }
    } else {
        setHideMaterialEdit(true);
    }
    setTotalCost(cost.toFixed(2));
    }, [materialsList]);

    async function handleAdd() {
        const defaultMaterial = { id: uuidv4(), name: "New Material", volume: 0, cost: "0", color: "#42d8b7", date: null }
        axios.post(baseURL, defaultMaterial)
            .then((res) => {
                setMaterialsList([...materialsList, defaultMaterial]);
                setActiveMaterial(defaultMaterial);
                setHideMaterialEdit(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function handleDelete() {
        const deleteURL = baseURL + `/${activeMaterial.id}`;
        axios.delete(deleteURL)
            .then((res) => {
                let tempMaterialsList = [...materialsList];
                const activeMaterialIndex = tempMaterialsList.indexOf(activeMaterial);
                tempMaterialsList.splice(activeMaterialIndex, 1);
                setMaterialsList(tempMaterialsList);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function handleMaterialSubmit(material) {
        const updateURL = baseURL +  `/${activeMaterial.id}`;
        axios.put(updateURL, material)
            .then((res) => {
                handleMaterialChange(material);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleMaterialChange = (material) => {
        setActiveMaterial(material)
        let tempMaterialsList = [...materialsList];
        const activeMaterialIndex = tempMaterialsList.indexOf(activeMaterial);
        tempMaterialsList[activeMaterialIndex] = material;
        setMaterialsList(tempMaterialsList);
    }

    const handleMaterialClick = (element, index) => {
        setActiveMaterial(element);
        setHideMaterialEdit(false);
    }

    return (
        <div className="materials-container">
            <h1 id="component-header">Materials</h1>
            <div className="button-container">
                <button name="add-button" className="add-button" onClick={async () => await handleAdd()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    Add
                </button>
                <button name="delete-button" className="delete-button" disabled={materialsList.length < 1} onClick={async () => await handleDelete()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                    Delete
                </button>
            </div>
            <div className="activity-container">
                <div name="material-list" className="clickable-list">
                    <ul>
                        {materialsList.length > 0 ? materialsList.map((element, index) => {
                            return (
                                <li className={index == materialsList.indexOf(activeMaterial) ? "active-item" : "item"} key={index} onClick={() => handleMaterialClick(element, index)}>
                                    <div className="circle" style={{backgroundColor: element.color}}/>
                                    <div>
                                        <p>{element.name}</p>
                                        <p>{element.volume} m3</p>
                                    </div>
                                </li>
                                )
                            })
                        : <li>No Materials</li>
                        }
                    </ul>
                </div>
                <div>
                    {hideMaterialEdit ? <></> : <MaterialEdit material={activeMaterial} onMaterialChange={handleMaterialChange} onSubmit={handleMaterialSubmit} />}
                </div>
            </div>
            <p name="cost-counter">Total Cost: ${totalCost}</p>
        </div>
    );
}

export default Materials;