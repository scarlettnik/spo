import { PlayIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const SongContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  overflow: hidden;
  text-color: ${({ theme }) => theme.textPrimary};
  font-size: 1,5vh;
  padding: 1vh;
  cursor: default;

  &:hover {
    background-color: #757575;
    border-radius: 10px;
    transition: 80%;
  }
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
`;

const TrackNumber = styled.p`
  width: 5px;
  padding-right: 1rem;
`;

const AlbumImage = styled.img`
  height: 40px;
  width: 40px;
`;

const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  .name {
    width: 20vh;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .artist {
    width: 20vh;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    span {
      ${({ theme }) => css`
        color: ${theme.textPrimary};
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      `}
    }
  }
`;

const TrackDuration = styled.p`
  width: 50px;
  text-align: right;
`;

const AlbumName = styled.p`
  width: 20vh;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const PlayButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

`;

const Song = ({ sno, track, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setView, setGlobalArtistId }) => {
    const { data: session } = useSession()
    const [hover, setHover] = useState(false)

    async function playSong(track) {
        setGlobalCurrentSongId(track.id)
        setGlobalIsTrackPlaying(true)
        if (session && session.accessToken) {
            const response = await fetch("https://api.spotify.com/v1/me/player/play", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${session.accessToken}`
                },
                body: JSON.stringify({
                    uris: [track.uri]
                })
            })
            console.log("on play", response.status)
        }
    }

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (
            seconds == 60 ?
                (minutes + 1) + ":00" :
                minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        );
    }

    function selectArtist(artist) {
        setView("artist")
        setGlobalArtistId(artist.id)
    }

    return (
        <SongContainer onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <TrackInfo onClick={async () => await playSong(track)}>
                {hover ? (
                    <PlayButton>
                        <PlayIcon className='h-5 w-5 text-white' />
                    </PlayButton>
                ) : (
                    <TrackNumber>{sno + 1}</TrackNumber>
                )}
                {track?.album?.images[0]?.url && <AlbumImage src={track?.album?.images[0].url} />}
                <TrackDetails>
                    <p className='name'>{track?.name}</p>
                    <p className='artist'>
                        {track?.artists?.map((artist, i) => {
                            return (
                                <span key={artist.id} onClick={() => selectArtist(artist)}>{artist?.name}{i !== track?.artists?.length - 1 && `, `}</span>
                            )
                        })}
                    </p>
                </TrackDetails>
            </TrackInfo>
            <div className='flex items-center justify-between ml-auto md:ml-0'>
                <AlbumName>{track?.album?.name}</AlbumName>
                <TrackDuration>{millisToMinutesAndSeconds(track?.duration_ms)}</TrackDuration>
            </div>
        </SongContainer>
    )
}

export default Song;