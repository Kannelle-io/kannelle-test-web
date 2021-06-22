import { CaretDownOutlined } from '@ant-design/icons/lib';
import { Button, Dropdown } from 'antd';
import React, { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';
import { useAuth0 } from '../../core/auth/Auth0Config';
import KannelleLogoutDropDownMenu from './KannelleLogoutDropDownMenu';

const useStyles = createUseStyles({
  dropdown: {
    position: 'fixed',
  },
});

const KannelleHeaderUserInfo: FunctionComponent = () => {
  const classes = useStyles();
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <Dropdown overlay={<KannelleLogoutDropDownMenu />} overlayClassName={classes.dropdown}>
      <Button className="user-info" type="link">
        <strong>{user.name}</strong>
        <CaretDownOutlined />
      </Button>
    </Dropdown>
  );
};

export default KannelleHeaderUserInfo;
