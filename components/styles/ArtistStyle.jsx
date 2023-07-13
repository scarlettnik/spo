import styled, { css } from 'styled-components';

export const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500'
]

export const GradientBackground = styled.section`
    ${({ color }) => css`
        background-image: linear-gradient(to bottom, transparent, ${color}, var(--color-neutral-900));
    `}
`;

export const ArtistContainer = styled.div`
    height: calc(100vh - var(--header-height));
    display: flex;
    width:100%;
    flex-direction: column;
`;

export const ArtistHeader = styled.header`
    display: flex;
    align-items: flex-end;
    background-color: var(--color-neutral-900);
    height: 20rem;
    padding: 3vh;
    padding-top: 0;
`;

export const ArtistImage = styled.img`
    height: 25vh;
    width: 25vh;
    border-radius: 50%;
`;
export const ArtistText = styled.p`
font-size: 2vh;
color: white;
margin: 0.5rem;
font-size: bold;

`
export const ArtistInfo = styled.div`
    margin-left: 2vh;
`;

export const ArtistName = styled.h1`
    font-size: 3vh;
    font-weight: 800;
    color: white;
    margin-bottom: 0.5rem;
    overflow: hidden
`;

export const TopTracksContainer = styled.div`
    padding: 2rem;
`;

export const TopTracksHeader = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
`;

export const TopTracksList = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
`;

export const RelatedArtistsContainer = styled.div`
    padding: 1rem;
`;

export const RelatedArtistsHeader = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
`;

export const RelatedArtistsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0 2rem;
`;

export const RelatedArtistCard = styled.div`
    cursor: pointer;
    position: relative;
    width: 13vh;
    margin-bottom: 1rem;
    background-color: #353535;
    border-radius: 0.5rem;
    padding: 1rem;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #757575;
    }
`;

export const RelatedArtistImage = styled.img`
    border-radius: 50%;
`;

export const RelatedArtistName = styled.p`
    font-size: 1rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const RelatedArtistType = styled.p`
    font-size: 0.875rem;
    color: var(--color-neutral-400);
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;