import {useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {Form, FormGroup, Button, Label, Input, UncontrolledTooltip, UncontrolledCollapse} from 'reactstrap';
import {connect} from 'react-redux';
import {updateCan, deleteCan} from '../actions/canActions';
import {BsFillGearFill, BsClipboard, BsTrash, BsFillEyeFill, BsFillEyeSlashFill} from 'react-icons/bs';

const Tile = (props) => {
    const [updatedTile, setUpdatedTile] = useState({
        can_name: props.tileData.can_name,
        can_text: props.tileData.can_text
    })

    const handleCopy = () => {
        // setTileInfo(null)
        navigator.clipboard.writeText(props.tileData.can_text)
    }

    const deleteCan = () => {
        axiosWithAuth()
        .delete(`https://cans-be.herokuapp.com/api/cans/delete-can/${props.tileData.id}`)
        .then((res) => {
            props.deleteCan(props.tileData)
            console.log('res from deleteCan', res)

        })
    }

    const updateCan = (e) => {
        e.preventDefault();
        console.log('udpatedTile', updatedTile)
        axiosWithAuth()
        .put(`https://cans-be.herokuapp.com/api/cans/update-can/${props.tileData.id}`, updatedTile)
        .then((res) => {
            console.log('res from editCan put', res)
            props.updateCan(res.data)
            hideEdit();
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

    // const showCanText = () => {
    //     if (document.getElementById('can-text') && document.getElementById('view-icon') && document.getElementById('hide-icon-container')) {
    //       let form = document.getElementById('can-text');
    //       let showIcon = document.getElementById('view-icon')
    //       let hideIcon = document.getElementById('hide-icon-container')
    //       form.classList.remove('hidden')
    //       showIcon.classList.add('hidden')
    //       hideIcon.classList.remove('hidden')
    //     }
    //   }

    //   const hideCanText = () => {
    //     if (document.getElementById('can-text') && document.getElementById('show-icon-container') && document.getElementById('hide-icon-container')) {
    //       let form = document.getElementById('can-text');
    //       let showIcon = document.getElementById('show-icon-container')
    //       let hideIcon = document.getElementById('hide-icon-container')
    //       form.classList.add('hidden')
    //       showIcon.classList.remove('hidden')
    //       hideIcon.classList.add('hidden')
    //     }
    //   }

    const showCanText = () => {
        if (document.getElementById(`can-text-${props.tileData.id}`) && document.getElementById(`view-icon-${props.tileData.id}`) && document.getElementById(`hide-icon-${props.tileData.id}`)) {
          let form = document.getElementById(`can-text-${props.tileData.id}`);
          let showIcon = document.getElementById(`view-icon-${props.tileData.id}`)
          let hideIcon = document.getElementById(`hide-icon-${props.tileData.id}`)
          form.classList.remove('hidden')
          showIcon.classList.add('hidden')
          hideIcon.classList.remove('hidden')
        }
      }

      const hideCanText = () => {
        if (document.getElementById(`can-text-${props.tileData.id}`) && document.getElementById(`view-icon-${props.tileData.id}`) && document.getElementById(`hide-icon-${props.tileData.id}`)) {
          let form = document.getElementById(`can-text-${props.tileData.id}`);
          let showIcon = document.getElementById(`view-icon-${props.tileData.id}`)
          let hideIcon = document.getElementById(`hide-icon-${props.tileData.id}`)
          form.classList.add('hidden')
          showIcon.classList.remove('hidden')
          hideIcon.classList.add('hidden')
        }
      }

      const allowEdit = () => {
        if (document.getElementById(`edit-form-${props.tileData.id}`)) {
          let form = document.getElementById(`edit-form-${props.tileData.id}`);
          form.classList.remove('hidden')
        }
      }

      const hideEdit = () => {
        if (document.getElementById(`edit-form-${props.tileData.id}`)) {
            let form = document.getElementById(`edit-form-${props.tileData.id}`);
            form.classList.add('hidden')
          }
      }


    return (<> 
        <div className='tile'>
            <div>

                <div className='tile-controls'>
                    <UncontrolledTooltip placement='top' target='clipboard-icon'>
                        Copy can text to clipboard
                    </UncontrolledTooltip>
                    <BsClipboard id='clipboard-icon' onClick={() => handleCopy()}/>

                    <UncontrolledTooltip placement='top' target={`edit-form-button-${props.tileData.id}`}>
                        Edit this can
                    </UncontrolledTooltip>
                    <BsFillGearFill id={`edit-form-button-${props.tileData.id}`} onClick={() => allowEdit()}/>

                    <UncontrolledTooltip placement='top' target='delete-icon'>
                        Delete this can
                    </UncontrolledTooltip>
                    <BsTrash id='delete-icon' onClick={() => deleteCan()}/>

                    <UncontrolledTooltip placement='top' target={`view-icon-${props.tileData.id}`}>
                        View can text
                    </UncontrolledTooltip>
                    <BsFillEyeFill id={`view-icon-${props.tileData.id}`} onClick={() => showCanText()}/>

                    <UncontrolledTooltip placement='top' target={`hide-icon-${props.tileData.id}`}>
                        Hide can text
                    </UncontrolledTooltip>
                    <BsFillEyeSlashFill id={`hide-icon-${props.tileData.id}`} className='hidden' onClick={() => hideCanText()}/>
                </div>
  
            </div>
            <p className='can-name'>{props.tileData.can_name}</p>
            <div id={`can-text-${props.tileData.id}`} className='hidden'>{props.tileData.can_text}</div>


            <div id={`edit-form-${props.tileData.id}`} className='hidden'>
                    <Form onSubmit={updateCan}>
                    <FormGroup>
                        <Label for="can_name"></Label>
                        <Input type="text" name="can_name" placeholder="Can Name" onChange={handleChanges} value={updatedTile.can_name} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="can_text"></Label>
                        <Input type="text" name="can_text" placeholder="Can Text" onChange={handleChanges} value={updatedTile.can_text} />
                    </FormGroup>

                    <div className='edit-buttons'>
                        <Button type="submit" color='success'>Update</Button>
                        <Button onClick={() => hideEdit()} type='reset' color='danger'>Cancel</Button>
                    </div>
                    </Form>
                </div>
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
    {updateCan, deleteCan}
  )(Tile)

// Add put functionality to edit existing tiles
// Replace the C & * with actual UI elements for copy edit & delete
// Add a hover function that expands the tile to show the can text
