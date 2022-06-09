# react-native-kakao-sdk-all

react-native-kakao-sdk-all

React Native 카카오 SDK 비공식 라이브러리 모듈입니다.<br>
카카오 디벨로퍼스에서 제공하는 공식 SDK ( [Android](https://developers.kakao.com/docs/latest/ko/sdk-download/android) / [iOS](https://developers.kakao.com/docs/latest/ko/sdk-download/ios) )를 사용할 수 있는 브릿지 역활을 수행합니다. 

공식 SDK에서 제공하는 카카오 로그인, 사용자 관리, 친구, 메시지(카카오톡), 카카오스토리, 메시지(카카오톡 공유), 카카오내비, 카카오톡 소셜 피커 기능을 사용할 수 있습니다.


## Installation

```sh
npm install react-native-kakao-sdk-all
npm install
npx pod-install
```

```sh
yarn add react-native-kakao-sdk-all
yarn
```

버전규칙 X.Y.Z

X: 공식 SDK X<br>
Y: 공식 SDK Y<br>
X: 공식 SDK (Z + 100) + 라이브러리 버전

ex: 공식 SDK 2.10.0 => 2.10.1001

## Usage

```js
import KakaoSDK, { UserApi } from "react-native-kakao-sdk-all";

// ...

await KakaoSDK.init(); // KAKAO_NATIVE_APP_KEY 리소스가 설정된 경우 생략 가능

if(await UserApi.isKakaoTalkLoginAvailable()) {
    await UserApi.loginWithKakaoTalk();
} else {
    await UserApi.loginWithKakaoAccount();
}

let me = await UserApi.me();
```

example 프로젝트에서 제공되는 모든 API를 테스트 할 수 있습니다.

---

## 1. 시작하기

라이브러리 설치 후, 실제 사용하기 위해선 몇가지 간단한 설정이 필요 합니다.<br>

### 1.1. 카카오디벨로퍼스 준비

카카오 API 사용을 위해 먼저 [카카오디벨로퍼스](https://developers.kakao.com/) 사이트에서 앱을 만들어야 합니다.<br>
카카오디벨로퍼스 [공식 가이드](https://developers.kakao.com/docs/latest/ko/getting-started/app) 를 참고 하여 애플리케이션을 등록합니다.

> 공식 문서의 앱 만들기, 앱 키, 플랫폼 등록 까지 진행 되셔야만 합니다.

### 1.2. Android

설정에 어려움이 있다면, 카카오 Android SDK [공식 문서](https://developers.kakao.com/docs/latest/ko/getting-started/sdk-android) 를 참고 하십시오.<br>
단, [필요한 모듈 설정하기](https://developers.kakao.com/docs/latest/ko/getting-started/sdk-android#select-module) 문서는 라이브러리에 포함되어 있으므로 설정하실 필요 없습니다. 



#### 1.2.1. AndroidManifest.xml 설정

SDK를 사용하기 위한 인터넷 사용권한과, 카카오 로그인 기능 사용을 위해 activity를 추가 하십시오.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android" 
          package="com.example.sample">
    <!-- 인터넷 사용 권한 설정 -->
    <uses-permission android:name="android.permission.INTERNET" />

    <!-- 카카오 로그인 기능 설정 -->
    <activity android:name="com.kakao.sdk.auth.AuthCodeHandlerActivity"
              android:exported="true">
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <!-- Redirect URI: "kakao${NATIVE_APP_KEY}://oauth" -->
            <data android:host="oauth"
                  android:scheme="kakao${NATIVE_APP_KEY}" />
        </intent-filter>
    </activity>

    ...
```

#### 1.2.2. strings.xml 설정 (옵션)

아래와 같이 리소스에 추가되어 있다면, `KakaoSDK.init()` 기능을 사용하여 SDK를 초기화하실 필요 없습니다.<br>
SDK 사용 시, 자동으로 초기화 됩니다.  

```xml
<resources>
    <string name="KAKAO_NATIVE_APP_KEY">${NATIVE_APP_KEY}</string>
</resources>
```

설정하지 않고 다음과 같이 직접 초기화 할 수도 있습니다.

```js
KakaoSDK.init({ appKey: '${NATIVE_APP_KEY}' })
```

#### 1.2.3. build.gradle 설정

SDK최소 버전 설정과 repository 추가하십시오.

```text
// yourProject/android/build.gradle
buildscript {
    ext {
        // 최소 값 21 이상 설정
        minSdkVersion = 21
    
    ...
}

repositories {
    // repository 추가
    maven { url 'https://devrepo.kakao.com/nexus/content/groups/public/' }
     
    ...
}
```

#### 1.2.4. 키 해시 등록하기

카카오디벨로퍼스의 `내 애플리케이션 > 앱 설정 > 플랫폼` 메뉴에서 키 해시를 등록 하십시오.

> React Native 0.60 부터는 아래와 같은 디버깅 해시 키가 기본적으로 등록되어 있습니다.<br>
> 개발중일 때는 아래 키를 등록 하여 사용하시고, 릴리즈 때는 [공식 문서](https://developers.kakao.com/docs/latest/ko/getting-started/sdk-android#add-key-hash) 를 참고하여 릴리즈 키 해시를 추가 등록 하셔야 합니다. 
>> Xo8WBi6jzSxKDVR4drqm84yr9iU=

### 1.3. iOS

설정에 어려움이 있다면, 카카오 Android SDK [공식 문서](https://developers.kakao.com/docs/latest/ko/getting-started/sdk-ios) 를 참고 하십시오.<br>
단, [설치하기](https://developers.kakao.com/docs/latest/ko/getting-started/sdk-ios#apply-sdk) 문서는 라이브러리에 포함되어 있으므로 설정하실 필요 없습니다.

#### 1.3.1. info.plist 설정

Xcode 에서 설정하거나 info.plist 파일을 직접 수정하실 수 있습니다.

```xml
// yourProject/ios/yourProject/info.plist

<dict>
    <key>LSApplicationQueriesSchemes</key>
    <array>
        <!-- 카카오톡으로 로그인 -->
        <string>kakaokompassauth</string>
        <!-- 카카오톡 공유 -->
        <string>kakaolink</string>
    </array>
    
    <key>CFBundleURLTypes</key>
    <array>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>kakao${NATIVE_APP_KEY}</string>
        </array>
    </array>
    
    <key>KAKAO_NATIVE_APP_KEY</key>
    <string>${NATIVE_APP_KEY}</string>
    
    ...
```

## 2. 사용하기

wiki 문서를 참고
