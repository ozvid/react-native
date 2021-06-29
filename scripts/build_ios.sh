#! /usr/bin/env bash

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

#### 6. Building iOS Standalone App ####
# Start building standalone android build using `production` release channel
exp build:ios --release-channel production --non-interactive

# Download the artifact to current directory as `app.ipa`
mkdir -p dist
curl -o dist/app.ipa "$(exp url:ipa --non-interactive)"

#### 7. Submit standalone iOS app to iTunes Connect ####
# Make sure the following env variables are set
# export DELIVER_USERNAME=<your-itunes-connect-email>
# export DELIVER_PASSWORD=<your-itunes-connect-password>

# Use fastlane to upload your current standalone iOS build to itc
# fastlane deliver --verbose --ipa "app.ipa" --skip_screenshots --skip_metadata

#### Misc ####
# [Optional] You may or may not need to do this depending on your setup.
rm dist/app.ipa
# exp logout
