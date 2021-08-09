import Tile from './Tile';
import {useState} from 'react';

const TileContainer = (props) => {

    const [tileInfo, setTileInfo] = useState([
        {
            id: 1,
            title: 'sample title 1',
            text: 'this is some sample text'
        },
        {
            id: 2,
            title: 'sample title 2',
            text: 'this is some sample text'
        },
        {
            id: 3,
            title: 'sample title 2',
            text: 'this is some sample text'
        },
        {
            id: 4,
            title: 'sample title 2',
            text: 'this is some sample text'
        },
        {
            id: 5,
            title: 'sample title 2',
            text: 'this is some sample text'
        }
    ])
    return(<>
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