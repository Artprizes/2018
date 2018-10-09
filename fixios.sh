#!/bin/bash
cd ios
pod install

cd cd node_modules/react-native/third-party/glog-0.3.4
cd ios
pod install

cd ios
pod install

../../scripts/ios-configure-glog.sh
