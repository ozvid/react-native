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

#### 4. Building Android Standalone App ####
# Start building standalone android build using `production` release channel
exp build:android --release-channel production --no-publish --non-interactive

# Download the artifact to current directory as `app.apk`
mkdir -p dist
curl -o dist/app.apk "$(exp url:apk --non-interactive)"

#### 5. Submit and publish standalone Android app to the Google Play Store ####
# Use fastlane to upload your current standalone android build
# Customize this to fit your needs. Take note of env variables. 
# Check out https://docs.fastlane.tools for more info.
# fastlane supply --track 'internal' --json_key '<path/to/json_key.json>' --package_name "io.superteam" --apk "app.apk" --skip_upload_metadata --skip_upload_images --skip_upload_screenshots

#### Misc ####
# [Optional] You may or may not need to do this depending on your setup.
rm dist/app.apk
# exp logout
