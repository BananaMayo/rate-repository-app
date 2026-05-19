# Rate Repository App
Full Stack Open React Native

A mobile application for rating GitHub repositories. Users can browse GitHub-style repositories, view individual repository details and reviews, and create new reviews when signed in. The app is built with React Native and Expo, and it uses a GraphQL API as its backend. Created as part of Full Stack Open, part 10.


### Note about Expo SDK version

I started this course at the beginning of 2026 and followed the course material that was available at the time. When I started the project, the material instructed me to create the app with Expo SDK 50:

*"Let's get started with Expo by initializing our project with create-expo-app:*

*npx create-expo-app rate-repository-app --template expo-template-blank@sdk-50*

*Note, that the @sdk-50 sets the project's Expo SDK version to 50, which supports React Native version 0.73. Using other Expo SDK versions might cause you trouble while following this material."*


Only after the deployment of this app, I noticed that the course material had been updated to use Expo SDK 55 instead: 

*"Let's get started with Expo by initializing our project with create-expo-app:*

*npx create-expo-app rate-repository-app --template blank@sdk-55*

*Note, that the @sdk-55 sets the project's Expo SDK version to 55. You should use this exact version while following this material."*

Because the application was already completed with SDK 50, I decided not to upgrade at the final stage to avoid introducing dependency or compatibility issues. The app has been developed and tested using the Android Emulator and the web preview, where the UI and functionality worked as expected.

My phone currently does not support the required SDK version for testing this QR code through Expo Go, so I was not able to verify the QR code on iOS myself.

I hope this does not cause too much trouble when reviewing the repository or the deployed application.

## Try the App on Your Phone

You can try the app on your phone by scanning the following QR code with Expo Go

<img width="485" height="524" alt="image" src="https://github.com/user-attachments/assets/cbc72de7-ab65-4cb4-9969-410b68b5284b" />
