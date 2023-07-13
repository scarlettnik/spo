import React from "react";
import { RelatedArtistsContainer, RelatedArtistsHeader, RelatedArtistsList, RelatedArtist } from "@/components/styles/ArtistStyle";

const RelatedArtists = ({ setGlobalArtistId, relatedArtists }) => {
  return (
    <RelatedArtistsContainer>
      <RelatedArtistsHeader>Related Artists</RelatedArtistsHeader>
      <RelatedArtistsList>
        {relatedArtists.map((artist) => (
          <RelatedArtist
            key={artist.id}
            onClick={() => setGlobalArtistId(artist.id)}
          >
            {artist.name}
          </RelatedArtist>
        ))}
      </RelatedArtistsList>
    </RelatedArtistsContainer>
  );
};

export default RelatedArtists;