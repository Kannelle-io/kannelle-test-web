/*
 * There is a bug in react-beautiful-dnd displaying a false positive warning in development.
 * See: https://github.com/atlassian/react-beautiful-dnd/issues/131
 *
 * To prevent this warning to show up, we add the '__react-beautiful-dnd-disable-dev-warnings' to true
 * to deactive the library logs (see: https://github.com/atlassian/react-beautiful-dnd/blob/2360665305b854434e968e41c7b4105009b73c40/src/dev-warning.js)
 * */

declare global {
  interface Window {
    '__react-beautiful-dnd-disable-dev-warnings': any;
  }
}

window['__react-beautiful-dnd-disable-dev-warnings'] = true;

export {};
