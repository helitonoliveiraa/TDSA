import React from 'react';
import Loader from 'react-loader-spinner';

const Loading: React.FC = () => (
  <Loader type="Puff" color="#00BFFF" height={30} width={30} timeout={3000} />
);

export default Loading;
