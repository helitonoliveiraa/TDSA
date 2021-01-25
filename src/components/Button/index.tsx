import React from 'react';
import { ButtonProps } from '@material-ui/core';

import { Container } from './styles';

const CustomButtom: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

export default CustomButtom;
