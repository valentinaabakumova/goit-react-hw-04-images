import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Loader({ query }) {
  return (
    <Wrapp>
      <TailSpin
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
      ;
    </Wrapp>
  );
}

const Wrapp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

Loader.propTypes = {
  query: PropTypes.string,
};
export default Loader;
