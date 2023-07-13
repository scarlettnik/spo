import { useEffect, useState } from "react";

function useRelatedArtistsData(session, artistId) {
  const [relatedArtists, setRelatedArtists] = useState([]);

  useEffect(() => {
    async function fetchRelatedArtistsData() {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const data = await response.json();
      setRelatedArtists(data.artists);
    }
    if (session && session.accessToken) {
      fetchRelatedArtistsData();
    }
  }, [session, artistId]);

  return relatedArtists;
}

export default useRelatedArtistsData;