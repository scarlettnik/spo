import styled from "styled-components";

export const PlaylistContainer = styled.div`
  cursor: pointer;
  width: 27vh;
  margin-bottom: 1rem;
  margin-left: 1rem;
  border-radius: 0.375rem;
  padding: 1rem;
  background-color: #363636;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #2d3748;
  }
  
  @media screen and (max-width: 1000px) {
    width: 19vh;
    margin-left: 0.5rem;
    overflow-y: auto
  }
`;

export const PlaylistName = styled.h2`
  font-size: 5vh;
  font-weight: 700;
  margin: 1rem;
  color: white;
`;

export const PlaylistImage = styled.img`
  width: 22vh;
  height: 20vh;
  margin-bottom: 1rem;
  @media screen and (max-width: 768px) {
    width: 18vh;
    height: 18vh;
  }
`;

export const PlaylistTitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PlaylistOwner = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  color: #a0aec0;
  width: 12vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PlaylistList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: calc(100vh - 0rem);
  padding: 0.5rem;
  overflow-y: hidden;
  
`;

export const PlaylistWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  display: flex;
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
  
`;
