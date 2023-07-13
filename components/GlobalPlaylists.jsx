import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { PlaylistContainer, PlaylistName, PlaylistImage, PlaylistTitle, PlaylistOwner, PlaylistList, PlaylistWrapper } from './styles/PlaylistStyle';

const GlobalPlaylists = ({ setView, setGlobalPlaylistId }) => {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  function selectPlaylist(playlist) {
    setView('playlist');
    setGlobalPlaylistId(playlist.id);
  }

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        const response = await fetch(
          `https://api.spotify.com/v1/browse/featured-playlists?${new URLSearchParams({
            country: 'US',
          })}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setPlaylists(data?.playlists?.items);
      }
    }
    f();
  }, [session]);

  return (
    <>
      <PlaylistList>
        <PlaylistName>Global Playlists</PlaylistName>
        <PlaylistWrapper>
          {playlists?.map((playlist) => (
            <PlaylistContainer onClick={() => selectPlaylist(playlist)} key={playlist?.id}>
              <PlaylistImage src={playlist?.images[0]?.url} alt={playlist?.name} />
              <PlaylistTitle>{playlist?.name}</PlaylistTitle>
              <PlaylistOwner>By {playlist?.owner?.display_name}</PlaylistOwner>
            </PlaylistContainer>
          ))}
        </PlaylistWrapper>
      </PlaylistList>
    </>

  );
};



export default GlobalPlaylists;