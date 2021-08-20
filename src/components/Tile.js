import {useState} from 'react';

const Tile = (props) => {
    const [tileInfo, setTileInfo] = useState(props)

    const handleCopy = () => {
        // setTileInfo(null)
        navigator.clipboard.writeText(props.tileData.can_text)
    }

    return (<> 
        <div className='tile'>
            <div>
                <span onClick={() => handleCopy()}>|C|</span>
                <span> |*| </span>
                <span>|X|</span>
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
