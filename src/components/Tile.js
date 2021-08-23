import {useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {Form, FormGroup, Button, Label, Input} from 'reactstrap';

const Tile = (props) => {
    const [updatedTile, setUpdatedTile] = useState({
        can_name: '',
        can_text: ''
    })

    const handleCopy = () => {
        // setTileInfo(null)
        navigator.clipboard.writeText(props.tileData.can_text)
    }

    const deleteCan = () => {
        axiosWithAuth()
        .delete(`https://cans-be.herokuapp.com/api/cans/delete-can/${props.tileData.id}`)
        .then((res) => {
            console.log('res from deleteCan', res)
        })
    }

    const updateCan = (e) => {
        e.preventDefault();

        axiosWithAuth()
        .put(`https://cans-be.herokuapp.com/api/cans/update-can/${props.tileData.id}`, updatedTile)
        .then((res) => {
            console.log('res from editCan put', res)
        })
    }

    const handleChanges = (e) => {
        e.persist();
        const currentTile = {
            ...updatedTile,
            [e.target.name]: e.target.value
        }
        setUpdatedTile(currentTile) 
    }

    return (<> 
        <div className='tile'>
            <div>
                <span onClick={() => handleCopy()}>|C|</span>
                <span onClick={() => updateCan()}> |*| </span>
                <span onClick={() => deleteCan()}>|X|</span>
            </div>
            {props.tileData.can_name}
            <div className='tile-text'>{props.tileData.can_text}</div>
        </div>

        <Form onSubmit={updateCan}>
                <FormGroup>
                    <Label for="can_name"></Label>
                    <Input type="text" name="can_name" placeholder="Can Name" onChange={handleChanges} value={updatedTile.can_name} />
                </FormGroup>
                <FormGroup>
                    <Label for="can_text"></Label>
                    <Input type="text" name="can_text" placeholder="Can Text" onChange={handleChanges} value={updatedTile.can_text} />
                </FormGroup>

            
                <Button type="submit">Update</Button>
        </Form>
    </>)
}

export default Tile;

// Add put functionality to edit existing tiles
// Replace the C & * with actual UI elements for copy edit & delete
// Add a hover function that expands the tile to show the can text
