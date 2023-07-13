import {MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import styled from 'styled-components';

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 90%;
  margin: 5%;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 3rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #4d4d4d;
  background-color: #fff;
  border-radius: 9999px;
  border: 1px solid #d1d1d1;
  outline: none;
`;

export const SearchIcon = styled(MagnifyingGlassIcon)`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  color: #4d4d4d;
`;
