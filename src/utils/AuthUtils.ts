export default class AuthUtils {
  // Check if the current branch name is defined and is a pull request.
  // If that is the case, we return the branch name itself
  // Else we return the `defaultValue` passed as an input
  static getAuthEnvironmentVariable = (defaultValue?: string): string | undefined => {
    const branchName = process.env.REACT_APP_PR_BRANCH_NAME || '';
    const amplifySuffixUrl = process.env.REACT_APP_AMPLIFY_SUFFIX_URL || '';
    // Pull request branch names start with `pr-<PR_NUMBER>`
    const prBranchCheckRegExp = new RegExp(/pr-\d+$/);
    if (branchName !== '' && prBranchCheckRegExp.test(branchName) && amplifySuffixUrl) {
      return `https://${branchName}.${amplifySuffixUrl}`;
    }

    return defaultValue;
  };
}
