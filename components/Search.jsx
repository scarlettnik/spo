import {useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import GlobalPlaylists from './GlobalPlaylists';
import SearchResults from './SearchResults';
import {SearchBar, SearchInput, SearchIcon } from './styles/SearchStyle'
const Search = ({ setView, setGlobalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setGlobalArtistId }) => {
    const { data: session } = useSession()
    const [searchData, setSearchData] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)

    async function updateSearchResults(query) {
        const response = await fetch("https://api.spotify.com/v1/search?" + new URLSearchParams({
            q: query,
            type: ["artist", "playlist", "track"]
        }), {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        setSearchData(data)
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [inputRef])

    return (
        <div className='flex-grow h-screen'>
            <SearchBar>
                <SearchIcon/>
                <SearchInput value={inputValue} onChange={async (e) => {
                        setInputValue(e.target.value)
                        await updateSearchResults(e.target.value)
                    }} ref={inputRef} 
                />
            </SearchBar>
            <div>
                {inputValue == '' ? <GlobalPlaylists
                    setView={setView}
                    setGlobalPlaylistId={setGlobalPlaylistId}
                /> : <SearchResults
                    playlists={searchData?.playlists?.items}
                    songs={searchData?.tracks?.items}
                    artists={searchData?.artists?.items}
                    setView={setView}
                    setGlobalPlaylistId={setGlobalPlaylistId}
                    setGlobalCurrentSongId={setGlobalCurrentSongId}
                    setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
                    setGlobalArtistId={setGlobalArtistId}
                />}
            </div>
        </div>
    )
}

export default Search;
