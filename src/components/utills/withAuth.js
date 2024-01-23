import React from 'react';
import { navigate } from '@gatsbyjs/reach-router';
import Cookies from 'js-cookie';

const withAuth = (Component) => {
  return (props) => {
    const token = Cookies.get('jwt');
    console.log(token)
    if (!token) {
      navigate('/', { replace: true });
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuth;