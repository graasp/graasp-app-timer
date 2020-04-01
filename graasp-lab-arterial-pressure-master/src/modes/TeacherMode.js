import React, { Fragment } from 'react';
import MainView from '../views/MainView';
import Header from '../layout/Header';
import Settings from '../components/Content/Settings';
import './CommonStyle.css';

const TeacherMode = () => (
  <Fragment>
    <Header />
    <MainView />
    <Settings />
  </Fragment>
);

export default TeacherMode;
