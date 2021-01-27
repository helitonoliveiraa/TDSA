/* eslint-disable indent */
import styled, { css } from 'styled-components';
import { AppBar, Table } from '@material-ui/core';
import { lighten, shade } from 'polished';
import CustomButton from '../../components/Button';
import Loading from '../../components/Loading';

const backgroundPost = css`
  padding: 1rem;
  border-radius: 0 0.5rem 0.5rem 0.5rem;
  background: ${({ theme }) => lighten(0.55, theme.colors.gray)};
`;

export const Container = styled.div``;

export const Header = styled(AppBar)`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    padding: 3rem 0;

    div {
      max-width: 1100px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
  `}
`;

export const Button = styled(CustomButton)`
  ${({ theme }) => css`
    background: transparent;
    border: 0.2rem solid ${lighten(0.2, theme.colors.white)};

    &:hover {
      background: ${lighten(0.2, theme.colors.white)};
      color: ${theme.colors.primary};
    }
  `}
`;

export const TableContainer = styled.main`
  position: relative;
  max-width: 1100px;
  margin: 12rem auto 0;
  height: 100vh;
`;

export const CustomTable = styled(Table)`
  max-width: 1100px;
  flex: 1;
`;

export const TableLine = styled.tr`
  ${({ theme }) => css`
    display: block;
    padding: 2rem 3rem;
    background: ${theme.colors.secondary};
    border-radius: 0.5rem;

    & + tr {
      margin-top: 1.6rem;
    }

    td {
      display: flex;
      flex-direction: column;
      width: 100%;

      > div {
        display: flex;
        flex: 1;
        width: 100%;
      }
    }
  `}
`;

export const Photo = styled.img`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  margin-right: 1.2rem;
`;

export const Background = styled.div`
  display: flex;
  flex: 1;
  ${backgroundPost};
`;

export const WrapperContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;

    strong {
      color: ${theme.colors.blackMedio};
      font-size: 2rem;
    }

    p {
      color: ${theme.colors.gray};
    }
  `}
`;

export const WrapperButton = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin: 0 auto 0 2rem;
    width: 4rem;

    button {
      border: 0;
      width: 4rem;
      height: 4rem;
      background: transparent;

      > svg {
        color: ${theme.colors.red};
      }

      & + button {
        margin-top: 1rem;
        svg {
          color: ${theme.colors.green};
        }
      }
    }
  `}
`;

export const WrapperComment = styled.div`
  ${({ theme }) => css`
    display: flex;

    margin-top: 1.5rem;

    max-width: 94.5%;
    margin-left: auto;

    > img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-right: 1.2rem;
    }

    div {
      display: flex;
      flex: 1;
      flex-direction: column;
      ${backgroundPost};

      strong {
        font-size: 1.6rem;
        color: ${theme.colors.blackMedio};
      }

      span {
        margin-top: 0.5rem;
        font-size: 1.2rem;
        color: ${lighten(0.1, theme.colors.gray)};
      }

      p {
        margin-top: 0.8rem;
        font-size: 1.4rem;
        color: ${shade(0.1, theme.colors.gray)};
      }
    }
  `}
`;

export const LoadContainer = styled.span`
  margin: 1rem auto 0;
  width: 10rem;
  height: 10rem;
`;
