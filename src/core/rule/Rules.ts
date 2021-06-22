export enum CHARTERS_USERS_RULE {
  DELETE = 'delete:users',
  UPDATE_USERS_ROLES_TO_OWNER = 'update:users:roles:Owner',
  UPDATE_USERS_ROLES_TO_KNL_TEAM = 'update:users:roles:KnlTeam',
  READ_USERS_ID_KNL_TEAM = 'read:users:id:KnlTeam',
}

export enum COMPANY_RULE {
  READ = 'read:company',
  CREATE = 'create:company',
  UPDATE = 'update:company',
}

export enum DASHBOARD_RULE {
  VISIT = 'dashboard-page:visit',
}

export type Rules = CHARTERS_USERS_RULE | COMPANY_RULE | DASHBOARD_RULE;

const CreatorStaticRules: Array<Rules> = [];

const AdminStaticRules: Array<Rules> = CreatorStaticRules.concat([DASHBOARD_RULE.VISIT, COMPANY_RULE.READ]);

const OwnerStaticRules: Array<Rules> = AdminStaticRules.concat([
  CHARTERS_USERS_RULE.DELETE,
  CHARTERS_USERS_RULE.UPDATE_USERS_ROLES_TO_OWNER,
]);

const KnlTeamStaticRules: Array<Rules> = OwnerStaticRules.concat([
  CHARTERS_USERS_RULE.UPDATE_USERS_ROLES_TO_KNL_TEAM,
  CHARTERS_USERS_RULE.READ_USERS_ID_KNL_TEAM,
  COMPANY_RULE.CREATE,
  COMPANY_RULE.UPDATE,
]);

// TODO see if usefull
// export const roleFallIn = function <T>(
//   rule: Roles,
//   fallInFns: { knlTeamFn: () => T; adminFn: () => T; ownerFn: () => T; creatorFn: () => T }
// ) {
//   switch (rule) {
//     case Roles.KnlTeam: {
//       return fallInFns.knlTeamFn();
//     }
//     case Roles.Owner: {
//       return fallInFns.ownerFn();
//     }
//     case Roles.Admin: {
//       return fallInFns.adminFn();
//     }
//     case Roles.Creator:
//     default: {
//       return fallInFns.creatorFn();
//     }
//   }
// };

// TODO see if usefull
// export const getRoleNameByCode = (rule: Roles) =>
//   roleFallIn<string>(rule, {
//     knlTeamFn: () => i18nManager.roles.knlTeamRole,
//     ownerFn: () => i18nManager.roles.ownerRole,
//     adminFn: () => i18nManager.roles.adminRole,
//     creatorFn: () => i18nManager.roles.creatorRole,
//   });

export const rules = {
  Creator: CreatorStaticRules,
  Admin: AdminStaticRules,
  Owner: OwnerStaticRules,
  KnlTeam: KnlTeamStaticRules,
};
