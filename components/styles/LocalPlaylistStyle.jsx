import styled, {css} from 'styled-components';


export const Header = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 7px;
  height: 80vh;
  background: linear-gradient(to bottom, green, ${props => props.color}) !important;
  padding: 1rem;
`;

export const PlaylistImage = styled.img`
  width: 25vh;
  border: 50%;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0;
`;

export const PlaylistLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
`;

export const PlaylistTitle = styled.h1`
  font-size: 3vh;
  font-weight: 800;
  margin: 0;
  color: white;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
    
`;
export const SongList = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 0 2rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 0rem);
  @media (max-width: 700px) {
  
    ${SongList} {
      padding: 0 1rem;
      ${css`
        & > * {
          flex-basis: calc(100% - 2rem);
        }
      `}
    }
  }
`;