import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Song from "./Song";
import {
  GradientBackground,
  ArtistContainer,
  ArtistHeader,
  ArtistImage,
  ArtistInfo,
  ArtistText,
  ArtistName,
  TopTracksContainer,
  TopTracksHeader,
  TopTracksList,
  RelatedArtistsContainer,
  RelatedArtistsHeader,
  RelatedArtistsList,
  RelatedArtistCard,
  RelatedArtistImage,
  RelatedArtistName,
  RelatedArtistType
} from "./styles/ArtistStyle";

const Artist = ({
  setView,
  globalArtistId,
  setGlobalArtistId,
  setGlobalCurrentSongId,
  setGlobalIsTrackPlaying,
}) => {
  const { data: session } = useSession();
  const [artistData, setArtistData] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  
  async function getArtistData() {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${globalArtistId}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }

  async function getTopTracks() {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${globalArtistId}/top-tracks?` +
      new URLSearchParams({ market: "US" }),
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data.tracks;
  }

  async function getRelatedArtists() {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${globalArtistId}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data.artists;
  }

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        setArtistData(await getArtistData());
        setTopTracks(await getTopTracks());
        setRelatedArtists(await getRelatedArtists());
      }
    }
    f();
  }, [session, globalArtistId]);

  return (
    <ArtistContainer>
      <div>
        <GradientBackground>
          <ArtistHeader>
            {artistData && <ArtistImage src={artistData.images[0].url} />}
            <ArtistInfo>
              <ArtistText>Artist</ArtistText>
              <ArtistName>{artistData?.name}</ArtistName>
            </ArtistInfo>
          </ArtistHeader>
        </GradientBackground>
        <TopTracksContainer>
          <TopTracksHeader>Top tracks</TopTracksHeader>
          <TopTracksList>
            {topTracks?.slice(0, 5).map((track, i) => {
              return (
                <Song
                  setView={setView}
                  setGlobalArtistId={setGlobalArtistId}
                  setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
                  setGlobalCurrentSongId={setGlobalCurrentSongId}
                  key={track.id}
                  sno={i}
                  track={track}
                />
              );
            })}
          </TopTracksList>
        </TopTracksContainer>
        <RelatedArtistsContainer>
          <RelatedArtistsHeader>Related artists</RelatedArtistsHeader>
          <RelatedArtistsList>
            {relatedArtists?.slice(0, 4).map((artist) => {
              return (
                <RelatedArtistCard
                  onClick={() => setGlobalArtistId(artist.id)}
                  key={artist.id}
                >
                  <RelatedArtistImage src={artist?.images[0]?.url} />
                  <RelatedArtistName>{artist.name}</RelatedArtistName>
                  <RelatedArtistType>Artist</RelatedArtistType>
                </RelatedArtistCard>
              );
            })}
          </RelatedArtistsList>
        </RelatedArtistsContainer>
      </div>
    </ArtistContainer>
  );
};

export default Artist;
