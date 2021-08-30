import Tile from './Tile';
import {useEffect, useState} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {Form, FormGroup, Button, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {setCans, addCan} from '../actions/canActions';

const TileContainer = (props) => {

    useEffect(() => {
        getCans();
    }, [])

    const getCans = () => {
        axiosWithAuth()
        .get(`https://cans-be.herokuapp.com/api/cans/user-cans/${localStorage.getItem('user-id')}`)
        .then(res => {
            props.setCans(res.data)
        })
    }

    const addCan = (e) => {
        e.preventDefault();
        e.persist();
        axiosWithAuth()
        .post(`https://cans-be.herokuapp.com/api/cans/new-can/${localStorage.getItem('user-id')}`, newTile)
        .then((res) => {
            props.addCan(res.data)
            hideAddCanForm()
            
        })
    }

    const [newTile, setNewTile] = useState({
        can_name: '',
        can_text: ''
    })
    
    const handleChanges = (e) => {
        e.persist();
        const currentTile = {
            ...newTile,
            [e.target.name]: e.target.value
        }
        setNewTile(currentTile) 
    }

    const hideAddCanForm = () => {
        if (document.getElementById('add-can-form')) {
          let form = document.getElementById('add-can-form');
          form.classList.add('hidden')
        }
      }



    return(<>
    <div id='add-can-form' className='hidden'>
        <h3>Add A Can</h3> 
    
    <Form className='add-can-form' onSubmit={addCan} onReset={() => hideAddCanForm()}>
    
        <FormGroup>
            <Label for="can_name"></Label>
            <Input type="text" name="can_name" placeholder="Can Name" onChange={handleChanges} value={newTile.can_name} />
        </FormGroup>

        <FormGroup>
            <Label for="can_text"></Label>
            <Input type="textarea" name="can_text" placeholder="Can Text" onChange={handleChanges} value={newTile.can_text} />
        </FormGroup>

        <div className='add-can-controls'>
            <Button color="success" size="lg" type="submit">Add</Button>
            <Button color='danger' type='reset'>Cancel</Button>
        </div>
        
    </Form>
    </div>
        <div className='tile-container'>
        {props.cansOnProps.cans.map((tile) => (
            <Tile key={tile.id} tileData={tile} />
        ))}
        </div>
    </>)
}

const mapStateToProps = state => {
    return {
        cansOnProps: state.canReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    {setCans, addCan}
  )(TileContainer)

// Add CRUD functionalty for tiles
// Add themes
// Add a titles region so you can organize cans into categories