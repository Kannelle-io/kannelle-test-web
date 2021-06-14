import { filter } from 'lodash';
import isString from 'lodash/isString';
import { THEME } from '../../Constants';
import { RoleList, RoleListType, Roles } from './RolesTypes';
import { rules, Rules } from './Rules';

export type RoleTheme = {
  TEXT_COLOR: string;
  BACKGROUND_COLOR: string;
};

export class Role {
  private readonly role: Roles;

  private readonly weight: number;

  constructor(role: Roles | string) {
    if (isString(role)) {
      if (!(role in Roles)) {
        throw new Error(`Role ${role} does not exist.`);
      }
      this.role = Roles[role as keyof typeof Roles];
      this.weight = RoleList[this.role]?.weight;
    } else {
      this.role = role;
      this.weight = RoleList[role as keyof typeof Roles]?.weight;
    }
  }

  isKnlTeam = (): boolean => this.role === Roles.KnlTeam;

  isOwner = (): boolean => this.role === Roles.Owner;

  isAdmin = (): boolean => this.role === Roles.Admin;

  isCreator = (): boolean => this.role === Roles.Creator;

  get currentRole(): Roles {
    return this.role;
  }

  getRules = (): Rules[] => {
    return rules[this.role];
  };

  isAllowedTo = (rule: Rules): boolean => {
    return this.getRules().includes(rule);
  };

  getRoleTheme = (): RoleTheme => {
    return THEME.CHARTERS.ROLES[this.role];
  };

  getWeight = (): number => {
    return this.weight;
  };

  getAccessibleRoles = (): RoleListType[] => {
    const list = Object.values(RoleList);
    return filter(list, (item) => item.weight <= this.weight);
  };

  getAccessibleRolesCodes = (): Roles[] => {
    return this.getAccessibleRoles().map((item) => item.code);
  };

  getVisibleRolesCodes = (): Roles[] => {
    const list = Object.values(RoleList);
    let visibleRoles;
    if (this.isKnlTeam()) {
      visibleRoles = list;
    } else if (this.isAdmin() || this.isOwner()) {
      visibleRoles = filter(list, (item) => [Roles.Creator, Roles.Admin, Roles.Owner].includes(item.code));
    } else {
      visibleRoles = filter(list, (item) => item.code === Roles.Creator);
    }

    return visibleRoles.map((item) => item.code);
  };

  getVisibleButNotAccessibleRolesCodes = (): Roles[] => {
    const visibleRoles = this.getVisibleRolesCodes();
    const accessibleRoles = this.getAccessibleRolesCodes();
    return visibleRoles.filter((code) => !accessibleRoles.includes(code));
  };
}
