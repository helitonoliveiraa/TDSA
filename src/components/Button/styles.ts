import styled, { css } from 'styled-components';
import { Button } from '@material-ui/core';
import { shade } from 'polished';

export const Container = styled(Button)`
  ${({ theme }) => css`
    background: transparent;
    color: ${theme.colors.white};
    font-size: 1.6rem;
    font-weight: 700;
    padding: 1rem;

    &:hover {
      background: ${shade(0.2, theme.colors.primary)};
    }
  `}
`;
