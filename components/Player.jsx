import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Slider } from "antd";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";

const StyledPlayer = styled.div`
  background-color: #64748b;
  display: flex;
  position: relative;
  @media screen and (max-width: 768px) {
    margin-bottom: 5vh;
  }
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SongImage = styled.img`
  width: 4rem;
  height: 4rem;
`;

const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const SongName = styled.p`
  width: 20vw;
  overflow: hidden;
  text-overflow: ellipsis;
  text-space: nowrap;
  
`;

const ArtistName = styled.p`
  width: 20vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ControlButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const VolumeSlider = styled(Slider)`
  width: 5rem;
  position: absolute;
  right: 1rem;
`;

const ControlContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Player = ({
  globalCurrentSongId,
  globalIsTrackPlaying,
  setGlobalIsTrackPlaying,
}) => {
  const { data: session } = useSession();
  const [songInfo, setSongInfo] = useState(null);
  const [volume, setVolume] = useState(50);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  async function fetchSongInfo(trackId) {
    if (trackId && session && session.accessToken) {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const data = await response.json();
      setSongInfo(data);
    }
  }

  async function fetchDevices() {
    if (session && session.accessToken) {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/devices",
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setDevices(data.devices);
    }
  }

  useEffect(() => {
    if (globalCurrentSongId) {
      fetchSongInfo(globalCurrentSongId);
    }
  }, [globalCurrentSongId]);

  useEffect(() => {
    fetchDevices();
  }, [session]);

  async function handlePlayPause() {
    if (session && session.accessToken) {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        if (data?.is_playing) {
          const response = await fetch(
            "https://api.spotify.com/v1/me/player/pause",
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
          if (response.status === 204) {
            setGlobalIsTrackPlaying(false);
          }
        } else {
          const response = await fetch(
            "https://api.spotify.com/v1/me/player/play",
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
          if (response.status === 204) {
            setGlobalIsTrackPlaying(true);
          }
        }
      } catch (error) {
        console.log
          ("Error handling play/pause:", error);
      }
    }
  }

  async function changeVolume(newVolume) {
    if (session && session.accessToken) {
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${newVolume}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (response.ok) {
        setVolume(newVolume);
      } else {
        console.log("Error setting volume");
      }
    }
  }

  async function transferPlayback(deviceId) {
    if (session && session.accessToken) {
      const response = await fetch(`https://api.spotify.com/v1/me/player`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_ids: [deviceId],
          play: globalIsTrackPlaying,
        }),
      });
      if (response.ok) {
        console.log("Playback transferred to device " + deviceId);
        setSelectedDeviceId(deviceId);
      } else {
        console.log("Error transferring playback");
      }
    }
  }

  const handleDeviceChange = (event) => {
    const deviceId = event.target.value;
    transferPlayback(deviceId);
  };

  return (
    <div>
      {songInfo && (
        <StyledPlayer>
          <SongInfo>
            <SongImage src={songInfo?.album?.images[0].url} alt={songInfo?.name} />
            <SongDetails>
              <SongName>{songInfo?.name}</SongName>
              <ArtistName>
                {songInfo?.artists?.map((artist) => artist.name).join(", ")}
              </ArtistName>
            </SongDetails>
          </SongInfo>
          <ControlContainer>
            <ControlButton onClick={handlePlayPause}>
              {globalIsTrackPlaying ? (
                <PauseIcon className="h-10 w-10" />
              ) : (
                <PlayIcon className="h-10 w-10" />
              )}
            </ControlButton>
          </ControlContainer>
          <div className="flex items-center space-x-4">
            <VolumeSlider
              min={0}
              max={100}
              value={volume}
              onChange={changeVolume}
            />
          </div>
        </StyledPlayer>
      )}
    </div>
  );
};

export default Player;