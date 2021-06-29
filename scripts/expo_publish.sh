#! /usr/bin/env bash

while getopts ":r:c:" o; do
    case "${o}" in
        r)
            r=${OPTARG}
            ;;
        c)
            c=${OPTARG}
            ;;
        *)
            usage
            ;;
    esac
done
shift $((OPTIND-1))

#### 2. Script Setup ####
# It's useful to exit the bash script when a command exits with a non-zero status
# as the following commands must be run successfully in sequence for expected results.
set -e # exit entire script when command exits with non-zero status

# Install dependencies
yarn install

# [Optional] Login to Expo using username & password
# You may or may not need to do this depending on your setup.
# Note the $EXPO_USERNAME and $EXPO_PASSWORD env variables
exp login -u $EXP_USERNAME -p $EXP_PASSWORD --non-interactive

#### 3. Publish to Expo ####
# Publish `production` release 
if [ -z "${r}" ]; then
    exp publish --non-interactive
elif [ ! -z "${r}" ] && [ ! -z "${c}" ]; then
    exp publish --release-channel "${r////_}" --config "${c}" --non-interactive
elif [ ! -z "${r}" ] && [ -z "${c}" ]; then
    exp publish --release-channel "${r////_}" --non-interactive
fi
