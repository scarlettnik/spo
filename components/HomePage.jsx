import React from 'react';
import GlobalPlaylists from './GlobalPlaylists';


const HomePage = ({ setView, setGlobalPlaylistId }) => {

    return (
        <div className='flex flex-col gap-15 overflow-auto mt-25'>
            <div> 
                <GlobalPlaylists
                    setView={setView}
                    setGlobalPlaylistId={setGlobalPlaylistId}
                />
            </div>
        </div>
    )
}

export default HomePage;