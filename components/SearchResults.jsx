import React from 'react';
import {PlaylistContainer, PlaylistName, PlaylistImage, PlaylistTitle, PlaylistOwner, PlaylistList, PlaylistWrapper} from './styles/SearchResultStyle'

const SearchResults = ({ playlists, artists, setView, setGlobalPlaylistId, setGlobalArtistId }) => {

    function selectPlaylist(playlist) {
        setView("playlist")
        setGlobalPlaylistId(playlist.id)
    }

    function selectArtist(artist) {
        setView("artist")
        setGlobalArtistId(artist.id)
    }

    return (
        <PlaylistList>
            <div>
                    <PlaylistName>Top result</PlaylistName>
                    <PlaylistWrapper>
                        <PlaylistContainer onClick={() => selectPlaylist(playlists[0])}>
                            {playlists && <>
                                <PlaylistImage src={playlists[0]?.images[0]?.url} />
                                <PlaylistTitle>{playlists[0]?.name}</PlaylistTitle>
                                <PlaylistOwner>By {playlists[0]?.owner?.display_name} <span >Playlist</span></PlaylistOwner>
                            </>}
                        </PlaylistContainer>
                    </PlaylistWrapper>
            </div>
            <div>
                <PlaylistName>Artists</PlaylistName>
                <PlaylistWrapper>
                    {artists?.slice(0, 5).map((artist) => {
                        return <PlaylistContainer onClick={() => selectArtist(artist)} key={artist.id}>
                            <PlaylistImage src={artist?.images[0]?.url} />
                            <PlaylistTitle>{artist?.name}</PlaylistTitle>
                            <PlaylistOwner>Artist</PlaylistOwner>
                        </PlaylistContainer>
                    })}
                </PlaylistWrapper>
            </div>
            <div>
                <PlaylistName>Playlists</PlaylistName>
                <PlaylistWrapper>
                    {playlists?.slice(0, 5)?.map((playlist) => {
                        return <PlaylistContainer onClick={() => selectPlaylist(playlist)} key={playlist?.id}>
                            <PlaylistImage src={playlist?.images[0]?.url} />
                            <PlaylistTitle>{playlist?.name}</PlaylistTitle>
                            <PlaylistOwner>By {playlist?.owner?.display_name}</PlaylistOwner>
                        </PlaylistContainer>
                    })}
                </PlaylistWrapper>
            </div>
        </PlaylistList>
    )
}

export default SearchResults;
