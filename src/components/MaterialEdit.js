import { useEffect, useState, useRef } from 'react';
import { ChromePicker } from 'react-color';
import DatePicker from 'react-date-picker';
import '../styles/MaterialEdit.css';


const MaterialEdit = (props) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [material, setMaterial] = useState(props.material);
    const [date, setDate] = useState(props.material.date);

    const colorRef = useRef(null);

    useEffect(() => {
        setMaterial(({...material, "date": date}));
    }, [date])

    useEffect(() => {
        props.onMaterialChange(material);
    }, [material]);

    useEffect(() => {
        
    }, [showColorPicker])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaterial(({...material, [name]: value}));
    }

    const handleColorChange = (c, e) => {
        setMaterial(({...material, "color": c.hex}));
    }

    const submit = () => {
        props.onSubmit(material);
    }

    return (
        <div className='material-edit'>
            <div className='name-input'>
                <label for="name-field">Name</label>
                <input id="name-field" name="name" type="text" value={material.name} onChange={(e) => handleChange(e)} onBlur={() => submit()}></input>
            </div>
            <div className='color-input'>
                <label for="color-dot">Color</label>
                <div id="color-dot" className="circle" style={{backgroundColor: material.color}} onClick={() => {setShowColorPicker(!showColorPicker); submit();}}></div>
            </div>
            <div className='volume-input'>
                <label for="volume-field">Volume (m3)</label>
                <input id="volume-field" name="volume" type="number" value={material.volume} onChange={(e) => handleChange(e)} onBlur={() => submit()}></input>
            </div>
            <div className='cost-input'>
                <label for="cost-field">Cost (USD per m3)</label>
                <input id="cost-field" name="cost" type="number" value={material.cost} onChange={(e) => handleChange(e)} onBlur={() => submit()}></input>
            </div>
            <div className='date-input'>
                <label for="date-field">Delivery Date</label>
                <DatePicker id="date-field" name="date" className='date-picker' value={material.date} onChange={setDate} onBlur={() => submit()}/>
            </div>
            <div className='color-picker'>
                {showColorPicker ? <ChromePicker id="color-picker-component" name="color" color={material.color} onChange={(c, e) => handleColorChange(c, e)}/> : <></>}
            </div>
        </div>
    );
}

export default MaterialEdit;