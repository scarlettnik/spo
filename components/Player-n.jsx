import React, { useState, useEffect } from 'react';
import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';


function Player({ globalPlaylistId }) {
  const [playlist, setPlaylist] = useState([]);
  const { data: session } = useSession()
  const [trackIndex, setTrackIndex] = useState(0);
  const [playbackState, setPlaybackState] = useState({
    paused: true,
    track_window: {},
  });



  useEffect(() => {
    if (!session) {
      return;
    }

    const fetchData = async () => {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${globalPlaylistId}/tracks?market=US&fields=items(track(uri,name,artists))`, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        },
      });

      const data = await response.json();
      setPlaylist(data.items);
    };

    fetchData();
  }, [playlistId]);

  const onPlay = async () => {
    const response = await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: [playlist[trackIndex].track.uri]
      })
    });

    if (response.ok) {
      setPlaybackState({ ...playbackState, paused: false });
    }
  };

  const onPause = async () => {
    const response = await fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      setPlaybackState({ ...playbackState, paused: true });
    }
  };

  const onPrevTrack = async () => {
    const prevIndex = trackIndex === 0 ? playlist.length - 1 : trackIndex - 1;
    const response = await fetch('https://api.spotify.com/v1/me/player/previous', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (response.ok) {
      setTrackIndex(prevIndex);
      setPlaybackState({ ...playbackState, paused: false });
    }
  };

  const onNextTrack = async () => {
    const nextIndex = trackIndex === playlist.length - 1 ? 0 : trackIndex + 1;
    const response = await fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (response.ok) {
      setTrackIndex(nextIndex);
      setPlaybackState({ ...playbackState, paused: false });
    }
  };

  const onPlayerStateChanged = (state) => {
    setPlaybackState(state);
  };

  return (
    <>
      {playlist.length > 0 && (
        <>
          <iframe
            src={`https://open.spotify.com/embed/track/${playlist[trackIndex].track.uri}`}
            width="300"
            height="380"
            allowtransparency="true"
            allow="encrypted-media"
            title="Spotify Player"
            onPlay={onPlayerStateChanged}
            onPause={onPlayerStateChanged}
          />

          <div className="flex justify-center items-center mt-4">
            <button onClick={onPrevTrack}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button onClick={playbackState.paused ? onPlay : onPause}>
              {playbackState.paused ? (
                <PlayCircleIcon className="h-12 w-12 text-green-500" />
              ) : (
                <PauseCircleIcon className="h-12 w-12 text-red-500" />
              )}
            </button>
            <button onClick={onNextTrack}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center items-center mt-4">
            <p className="text-gray-600">
              {playlist[trackIndex].track.name} -{' '}
              {playlist[trackIndex].track.artists.map((artist) => artist.name).join(', ')}
            </p>
          </div>
        </>
      )}
    </>
  )
}
export default Player