#!/bin/bash

# To call like the following:
# ./release.sh 2.4.6

RED='\033[0;31m'

if [[ $# -eq 0 ]] ; then
    echo -e "${RED}Please enter a release number as a parameter."
    echo -e "${RED}You should call this script like the following:"
    echo -e "${RED}\t./release.sh 2.4.6"
    exit 0
fi

VERSION=$1
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo -e "\nReleasing version $VERSION\n"
echo -e "=========================="

echo -e "\nTag version $VERSION"
echo -e "--------------------------"
yarn run release --release-as $VERSION

echo -e "\nPushing tag to $CURRENT_BRANCH"
echo -e "--------------------------"
git push --follow-tags origin ${CURRENT_BRANCH}

# echo -e "\nCreate release v$VERSION in Sentry"
# echo -e "--------------------------"
# Bugged for now (invalid email id because of brackets in Github bot email, see PR: https://github.com/getsentry/sentry/pull/20342)
# yarn run sentry-cli releases new v$VERSION
# yarn run sentry-cli releases set-commits --auto v$VERSION
# yarn run sentry-cli releases finalize v$VERSION
