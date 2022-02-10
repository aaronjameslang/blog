---
layout: page
title: AWS MFA CLI
---

# AWS MFA CLI

If you've ever had to use the AWS CLI with MFA enabled on your account,
you'll know it's a PITA.

This script will use your standard AWS credentials and a MFA OTP to
add a session token to your environment, meaning you can get back to
business as usual.

```sh
#! /bin/sh
# ~/.aws/aws-mfa-login
# Author: Aaron J. Lang

# Run like `. ~/.aws/aws-mfa-login`
# You must source the script like this, because it needs to be able to
# write variables to your environment
# If you switch to a new terminal after running this script, that new
# terminal won't have the session token, so you'll need to login again

set -u

# Clear any previous variables, we'll rely on ~/.aws/credentials
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
unset AWS_SESSION_TOKEN
unset AWS_EXPIRATION

# Get the MFA ARN
userJson=$(aws sts get-caller-identity)
userArn=$(node -e "console.log($userJson.Arn)")
mfaArn=$(echo $userArn | sed s/user/mfa/)

# Get the MFA OPT (so many TLAs!)
echo "Enter OTP from MFA device $mfaArn:"
read mfaOtp

# Get the sessions credentials
sessionJson=$(aws sts get-session-token --serial-number "$mfaArn" --token-code "$mfaOtp")

# Make them available to other commands
export AWS_ACCESS_KEY_ID=$(node -e "console.log($sessionJson.Credentials.AccessKeyId)")
export AWS_SECRET_ACCESS_KEY=$(node -e "console.log($sessionJson.Credentials.SecretAccessKey)")
export AWS_SESSION_TOKEN=$(node -e "console.log($sessionJson.Credentials.SessionToken)")
export AWS_EXPIRATION=$(node -e "console.log($sessionJson.Credentials.Expiration)")

set +u
```
