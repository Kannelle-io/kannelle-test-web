# Kannelle Web Dashboard

## Environments

This application has two back-end environments: **prod** and **dev**.
However, we deploy in the front-end application four environments, defined by branches.

### Environments using the **dev** back-end

There are two environments using the **dev** back-end:

- the `develop` branch where all features/bugfix branches are merged. It is updated really frequently and might be unstable since its features aren't yet tested
- the `staging` branch which aims at being used for internal testing. Whenever we developed enough features on `develop` and want to release it for internal testing, we open a pull-request from `develop` to `staging`

Versions on both of these environments are post fixed with an alpha version number, like `v2.4.1-alpha.0` since it consists in pre-release.

### Environments using the **prod** back-end

There are two environments using the **prod** back-end:

- the `beta` branch where tested features are yed for an extended internal testing (client heroes, selected consumers, etc.). Whenever we have enough features on `staging` that have been tested, and we want to provide it for a preprod environment, we open a pull-request from `staging` to `beta`
- the `master` branch consists in the prod environment. Whenever the previously merged features on `beta` do not have problems, we can open a pull-request from `beta` to `master` and our features are accessible for every client.

## Release management

- New versions for the **prod** (on the `master` branch) can either be released:

  - using the `yarn release` script to automatically increment the appropriate digit (major, minor or patch) depending on the commits (if there are only `fix` commits, it will only increase the patch, etc.)
  - using the `yarn release:major` script if we want to force a release incrementing the major number (_only if there are breaking changes in the new version_)
  - using the `yarn release:minor` script if we want to force a release incrementing the minor number (_the script we might use the most_)
  - using the `yarn release:patch` script if we want to force a release incrementing the patch number (_only if we made a fix without adding new features_)

- New versions for the **dev** (on the `develop` branch) can be released:
  - using the above-described four scripts **postfixed by the `--prerelease alpha`** option
  - using the `yarn release:alpha` script to automatically increment the appropriate digit (major, minor or patch) depending on the commits
    > Alpha prereleases will be used whenever we want to submit a new version to the Kannelle team for internal testing.

In both cases, releasing a new version will:

1. Increase the version in the `package.json` file
2. Create a commit for the new version of the `package.json` file
3. Create a tag on this commit in the Git tree

> We intentionally skip the `CHANGELOG.md` generation since it is mostly useful when we squash commits so that there is just one commit in the final Git tree for each PR.

> To try a `release` script without actually executing it, you can use the `--dry-run` option to see what it would do, such as:

```bash
$ yarn run release:minor --dry-run
```

#### Example

Imagine I am on the `develop` branch, the project is in the `2.0.0` version.
I want to create a new feature, so I create my branch, submit a PR in `develop` which is merged.
Therefore, I added a new feature to the project, so its version should be upgraded.
Whenever there are enough new features on `develop` that have been merged and we want to submit it for internal testing, on the `develop` branch, I can run:

```bash
$ yarn run release:minor --prerelease alpha
```

> I can add the `--dry-run` option to ensure it will do the right things.

The project is now in version `2.1.0-alpha.0`, I can submit it to the dev team.

If there are things to fix, I can fix it an run:

```bash
$ yarn run release:patch --prerelease alpha
```

The project is now in version `2.1.0-alpha.1`, etc.

Whenever the tests are OK, we can release on `master`, so on the **`release`** branch before merging on `master`, I can run:

```bash
$ yarn release:minor
```

And this will version the project to `2.1.0`.
