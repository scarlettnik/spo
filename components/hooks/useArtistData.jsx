import { useEffect, useState } from "react";

function useArtistData(session, artistId) {
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    async function fetchArtistData() {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const data = await response.json();
      setArtistData(data);
    }
    if (session && session.accessToken) {
      fetchArtistData();
    }
  }, [session, artistId]);

  return artistData;
}

export default useArtistData;