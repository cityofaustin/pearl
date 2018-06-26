import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DashboardHeader from '../components/DashboardHeader/DashboardHeader';

const currentUser = {
  firstName: 'Steve',
  role: 'superadmin',
  department: 'Office of the Mayor',
};

storiesOf('DashboardHeader', module).add('DashboardHeader', () => (
  <DashboardHeader currentUser={currentUser} />
));
