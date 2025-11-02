#!/bin/bash

# Firebase Rules Deployment Script
echo "Installing Firebase CLI..."
npm install -g firebase-tools

echo "Logging into Firebase..."
firebase login

echo "Deploying Firestore rules..."
firebase deploy --only firestore:rules

echo "Rules deployed successfully!"
