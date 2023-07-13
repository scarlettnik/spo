import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Song from "./Song";
import {
  Header,
  PlaylistImage,
  HeaderContent,
  PlaylistLabel,
  PlaylistTitle,
  Container,
  SongList,
  Wrapper,
} from "./styles/LocalPlaylistStyle";

const LocalPlaylist = ({
  globalPlaylistId,
  setGlobalCurrentSongId,
  setGlobalIsTrackPlaying,
  setView,
  setGlobalArtistId,
}) => {
  const { data: session } = useSession();
  const [playlistData, setPlaylistData] = useState(null);

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        console.log(session);
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${globalPlaylistId}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setPlaylistData(data);
      }
    }
    f();
  }, [session, globalPlaylistId]);

  return (
    <Container>
      <Wrapper>
        <Header>
          {playlistData && <PlaylistImage src={playlistData.images[0].url} />}
          <HeaderContent>
            <PlaylistLabel>Playlist</PlaylistLabel>
            <PlaylistTitle>{playlistData?.name}</PlaylistTitle>
          </HeaderContent>
        </Header>
        <SongList>
          {playlistData?.tracks?.items?.map((track, i) => {
            return (
              <Song
                setView={setView}
                setGlobalArtistId={setGlobalArtistId}
                setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
                setGlobalCurrentSongId={setGlobalCurrentSongId}
                key={track.track.id}
                sno={i}
                track={track.track}
              />
            );
          })}
        </SongList>
      </Wrapper>
    </Container>
  );
};

export default LocalPlaylist;
