'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import setSelectedMenuItemName from 'actions/setSelectedMenuItemName';

const MenuSelectionSync = ({ name }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedMenuItemName(name));
  }, [dispatch, name]);

  return null;
};

export default MenuSelectionSync;
