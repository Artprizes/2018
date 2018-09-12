
git clone https://github.com/Artprizes/2018.git
xcode-select --install
brew install node
brew install watchman
brew install imagemagick

npm install -g react-native-cli
cd art-prizes-native

npm install

npm install -D fsevents@1.2.4
npm install --save react-native-fbsdk@0.6.0 react-native link react-native-fbsdk

(Ensure in your xcode build settings that facebook sdk link ok)
react-native install react-native-fbsdk
react-native link react-native-fbsdk

npm i -S react-native-fbsdk
npm link

npm install -g app-icon
app-icon generate -i ./logo.png


cd ios

using xcode open art-prizes-native/ios/artprizesnative.xcodeprj

In manu "Product" select clean to clean project

hold option key down and select "Product menu" and select clean build folder

now select iPhone 8 plus (example) 

check in build-settinvgs that the Framework path has ~/Documents/FacebookSDK
(download it dfrom https://developers.facebook.com/docs/ios/componentsdks and rename and save to ~/Documents)
run

This will show up in simulator

To testflight it

(1) Select generic ios 
(1.5) Select "General" tab  and set build version to next one
(2) Go to menu "Product" and archive
(3) Once finished click  on "validate" in top right
(4) Upload to App Store button

To create developer cert
(1) open Applications/Utilities keychain util
(2) Create certificate 
(3) save to disk
(4) Open developer.apple.com 
(5) go to account
(6) go to certs, identifiers and profiles
(7) go to production
(8) download cert

Android

cd android

./gradlew assembleRelease


then sign in android app
