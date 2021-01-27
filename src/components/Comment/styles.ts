/* eslint-disable operator-linebreak */
import styled, { css } from 'styled-components';
import { lighten, shade } from 'polished';
import { Modal } from '@material-ui/core';
import CustomButton from '../Button';

export const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const fieldConfig = css`
  ${({ theme }) => css`
    width: 100%;
    padding: 1.6rem;
    border-radius: 1rem;
    border: none;
    border: 0.2rem solid ${lighten(0.4, theme.colors.gray)};
    color: ${theme.colors.gray};
    font-size: 1.8rem;
    font-weight: 700;

    ::placeholder {
      color: ${lighten(0.3, theme.colors.gray)};
      font-size: 1.6rem;
      font-weight: normal;
    }
  `}
`;

export const FormWrapper = styled.div`
  ${({ theme }) => css`
    max-width: 600px;
    flex: 1;

    background: ${lighten(0.2, theme.colors.white)};
    padding: 2rem 3rem;
    border-radius: 1rem;

    div {
      display: flex;
      justify-content: space-between;

      h1 {
        color: ${theme.colors.primary};
        margin-bottom: 1rem;
      }

      button {
        border: none;
        background: transparent;
        color: ${theme.colors.primary};
        display: flex;
        align-items: center;

        &:hover {
          color: ${shade(0.2, theme.colors.primary)};
        }
      }
    }

    form {
      display: flex;
      flex-direction: column;

      label {
        display: block;
        margin-bottom: 1rem;
      }

      input {
        ${fieldConfig}

        & + input,
        & + textarea {
          margin-top: 2rem;
        }
      }

      textarea {
        ${fieldConfig}
      }

      button {
        margin-top: 2rem;
      }
    }
  `}
`;

export const Button = styled(CustomButton)`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
  `}
`;
