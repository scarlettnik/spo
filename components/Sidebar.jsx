import {
  BuildingLibraryIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const SidebarWrapper = styled.div`

  width: 28vh;
  text-align: left;
  flex-grow: 0;
  flex-shrink: 0;
  border-right: 1px solid #333;
  padding: 3vh;
  font-size: 1vh;
  display: flex;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 5vh;
    position: fixed;
    bottom: 0;
    left: 0;
    justify-content: space-around;
    align-items: center;
    background-color: #111;
    padding: 1rem;
    z-index: 999;
    transition: all 0.3s ease-in-out;
    display: flex
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  color: #9e9e9e;
  cursor: pointer;
  width: 100%;
  text-decoration: none;
  font-size: 2.5vh;
  padding: 1vh;
  &:hover {
    color: #fff;
  }

  ${({ active }) =>
    active &&
    css`
      color: #fff;
    `}
    @media screen and (max-width: 768px) {
      justify-content: flex-start;
      padding: 0.5vh 2vh;
      font-size: 16px;
      width: auto;
    }
`;

const PlaylistName = styled.p`
  cursor: default;
  color: #9e9e9e;
  width: 95%;
  text-decoration: none;
  font-size: 2.5vh;
  padding: 1vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: #fff;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Text = styled.span`
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const Account = styled.p`
  padding-left: 1rem;
  font-size: 3vh;
  color: white;
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const Hr = styled.hr`
color: #353535;
width: 100%;
`
const Sidebar = ({ view, setView, setGlobalPlaylistId }) => {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        const response = await fetch(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setPlaylists(data.items);
      }
    }
    f();
  }, [session]);

  return (
    <SidebarWrapper>
      <div>
        <Button>
          <img src={session?.user.image} className='h-7 w-7 rounded-full' alt="profile pic" />
          <Account>
            {session?.user?.name}
          </Account>
        </Button>
        <Button
          onClick={() => signOut()}
        >
          <ArrowRightOnRectangleIcon className="h-7 w-7" />
          <Text>Log Out</Text>
        </Button>
        <Button
          active={view === "homepage"}
          onClick={() => setView("homepage")}
        >
          <HomeIcon className="h-7 w-7" />
          <Text>Home</Text>
        </Button>
        <Button active={view === "search"} onClick={() => setView("search")}>
          <MagnifyingGlassIcon className="h-7 w-7" />
          <Text>Search</Text>
        </Button>
        <Button active={view === "library"} onClick={() => setView("library")}>
          <BuildingLibraryIcon className="h-7 w-7" />
          <Text>Your Library</Text>
        </Button>
        <Hr />
        <div>
          {playlists?.map((playlist) => {
            return (
              <PlaylistName
                key={playlist.id}
                onClick={() => {
                  setView("playlist");
                  setGlobalPlaylistId(playlist?.id);
                }}
                active={view === "playlist"}
              >
                {playlist?.name}
              </PlaylistName>
            );
          })}
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
