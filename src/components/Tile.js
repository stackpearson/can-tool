import {useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Tile = (props) => {
    const [tileInfo, setTileInfo] = useState(props)

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

    return (<> 
        <div className='tile'>
            <div>
                <span onClick={() => handleCopy()}>|C|</span>
                <span> |*| </span>
                <span onClick={() => deleteCan()}>|X|</span>
            </div>
            {props.tileData.can_name}
            <div className='tile-text'>{props.tileData.can_text}</div>
        </div>
    </>)
}

export default Tile;

// Add put functionality to edit existing tiles
// Replace the C & * with actual UI elements for copy edit & delete
// Add a hover function that expands the tile to show the can text
