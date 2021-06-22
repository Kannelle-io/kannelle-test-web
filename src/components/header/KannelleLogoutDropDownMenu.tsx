import { LogoutOutlined } from '@ant-design/icons/lib';
import { Menu } from 'antd';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { THEME } from '../../Constants';
import { useAuth0 } from '../../core/auth/Auth0Config';
import AuthUtils from '../../utils/AuthUtils';

const styleMenu = createUseStyles({
  menu: {
    padding: '0 8px',
    width: 200,
    border: 'solid 1px #f0f0f0',
    boxShadow: '0 8px 15px 0 hsla(0, 0%, 0%, 0.15) !important',
    '& .ant-menu-item': {
      fontSize: THEME.MENU.FONT_SIZE_TEXT,
    },
    '& .ant-menu-item .anticon': {
      fontSize: THEME.MENU.FONT_SIZE_ICON,
      minWidth: THEME.MENU.FONT_SIZE_ICON,
    },
    '& .ant-menu-submenu-active': {
      color: `${THEME.MENU.MAIN_TEXT_COLOR} !important`,
    },
    '& .ant-menu-submenu-title:hover': {
      color: THEME.MENU.MAIN_TEXT_COLOR,
      backgroundColor: THEME.MENU.MAIN_BACKGROUND_COLOR,
      transition: 'all 300ms ease-in-out',
    },
    '& .ant-menu-title-content': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: THEME.MENU.DEFAULT_TEXT_COLOR,
    '&:hover, &:hover .anticon': {
      color: THEME.MENU.MAIN_TEXT_COLOR,
      backgroundColor: THEME.MENU.MAIN_BACKGROUND_COLOR,
      transition: 'all 300ms ease-in-out',
    },
  },
  menuItemIcons: {
    color: THEME.MENU.DEFAULT_ICON_COLOR,
    '&:hover': {
      color: THEME.MENU.MAIN_TEXT_COLOR,
    },
    marginRight: 10,
  },
});

const KannelleLogoutDropDownMenu: FunctionComponent = () => {
  const classes = styleMenu();
  const { t } = useTranslation();

  const { user, isAuthenticated, logout } = useAuth0();

  const logUserOut = (): void => {
    const auth0ReturnTo = AuthUtils.getAuthEnvironmentVariable(process.env.REACT_APP_AUTH0_RETURN_TO) || '';
    console.log({
      email: user.email,
      name: user.name,
    });
    logout({ returnTo: auth0ReturnTo });
  };

  return (
    <Menu className={classes.menu} selectable={false}>
      {isAuthenticated && (
        <Menu.Item className={classes.menuItem} key="logout" onClick={logUserOut}>
          <LogoutOutlined className={classes.menuItemIcons} />
          {t('dropDown.logout')}
        </Menu.Item>
      )}
      <Menu.Divider />
    </Menu>
  );
};

export default KannelleLogoutDropDownMenu;
