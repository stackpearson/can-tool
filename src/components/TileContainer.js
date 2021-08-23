import Tile from './Tile';
import {useEffect, useState} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {Form, FormGroup, Button, Label, Input} from 'reactstrap';

const TileContainer = (props) => {

    useEffect(() => {
        getCans();
    }, [])

    const getCans = () => {
        axiosWithAuth()
        .get(`https://cans-be.herokuapp.com/api/cans/user-cans/${localStorage.getItem('user-id')}`)
        .then(res => {
            console.log(res)
            setTileInfo(res.data)
        })
    }

    const addCan = (e) => {
        e.preventDefault();

        axiosWithAuth()
        .post(`https://cans-be.herokuapp.com/api/cans/new-can/${localStorage.getItem('user-id')}`, newTile)
        .then((res) => {
            console.log('res from addCan post', res.data)
            tileInfo.push(res.data)
        })
    }

    const handleChanges = (e) => {
        e.persist();
        const currentTile = {
            ...newTile,
            [e.target.name]: e.target.value
        }
        setNewTile(currentTile) 
    }


    const [tileInfo, setTileInfo] = useState([])

    const [newTile, setNewTile] = useState({
        can_name: '',
        can_text: ''
    })



    return(<>
    <div>
        <span>Add Can</span>
    </div>
    <Form onSubmit={addCan}>
                <FormGroup>
                    <Label for="can_name"></Label>
                    <Input type="text" name="can_name" placeholder="Can Name" onChange={handleChanges} value={newTile.can_name} />
                </FormGroup>
                <FormGroup>
                    <Label for="can_text"></Label>
                    <Input type="text" name="can_text" placeholder="Can Text" onChange={handleChanges} value={newTile.can_text} />
                </FormGroup>

            
                <Button type="submit">Add</Button>
                </Form>
        <div className='tile-container'>
        {tileInfo.map((tile) => (
            <Tile key={tile.id} tileData={tile} />
        ))}
        </div>
    </>)
}

export default TileContainer;

// Add CRUD functionalty for tiles
// Add themes
// Add a titles region so you can organize cans into categories