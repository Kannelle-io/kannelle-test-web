export enum Roles {
  KnlTeam = 'KnlTeam',
  Owner = 'Owner',
  Admin = 'Admin',
  Creator = 'Creator',
}

export type RoleListType = {
  code: Roles;
  key: string;
  infoKey: string;
  weight: number;
};

export const RoleList = {
  KnlTeam: {
    code: Roles.KnlTeam,
    key: 'roles.names.KnlTeam',
    infoKey: 'roles.tooltip.KnlTeam',
    weight: 3,
  },
  Owner: {
    code: Roles.Owner,
    key: 'roles.names.Owner',
    infoKey: 'roles.tooltip.Owner',
    weight: 2,
  },
  Admin: {
    code: Roles.Admin,
    key: 'roles.names.Admin',
    infoKey: 'roles.tooltip.Admin',
    weight: 1,
  },
  Creator: {
    code: Roles.Creator,
    key: 'roles.names.Creator',
    infoKey: 'roles.tooltip.Creator',
    weight: 0,
  },
};
