import Tile from './Tile';
import {useEffect, useState} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const TileContainer = (props) => {

    // let user_id = localStorage.getItem('user-id');

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


    const [tileInfo, setTileInfo] = useState()
    return(<>
        <div className='tile-container'>
        {tileInfo.map((tile) => (
            <Tile key={tile.id} tileData={tile} />
        ))}
        <p>here's your</p>
        </div>
    </>)
}

export default TileContainer;

// Add CRUD functionalty for tiles
// Add themes
// Add a titles region so you can organize cans into categories