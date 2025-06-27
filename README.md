# BeautyScan

**BeautyScan** este o aplicație mobilă dezvoltată cu **React Native** și **Expo**, care le permite utilizatorilor să scaneze produse cosmetice și să verifice ingredientele acestora. Aplicația extrage informații din baza de date Open Beauty Facts și analizează siguranța ingredientelor în funcție de o bază proprie. Include funcționalități precum istoric de scanări, salvare preferințe, profil cu alergii și avertismente pentru ingrediente periculoase sau alergenice.



## Livrabilele proiectului

- Codul sursă complet (fără fișiere binare compilate).
- Structură organizată pe componente și ecrane (`app/`, `data/`, `utils/`, `assets/`, etc.).
- Fișiere de configurare: `package.json`, `app.config.js`, `firebase.js`, etc.


## Adresa repository-ului

Repository-ul proiectului este disponibil la:


https://github.com/Malina2002/Licenta


## Pași de instalare și rulare

### 1. Clonarea repository-ului

git clone https://github.com/Malina2002/Licenta.git
cd BeautyScan

# Instalează Node.js
# Descarcă și instalează cea mai recentă versiune LTS de pe:
# https://nodejs.org/

# După instalare, verifică versiunile:
node -v
npm -v

# Instaleare Expo CLI global 
npm install -g expo-cli

# Instalarea tuturor dependențelor proiectului
npm install

# Dacă lipsește expo-camera sau alte module folosite:
npx expo install expo-camera

# Instalarea și a altor module folosite în BeautyScan:
npx expo install firebase
npx expo install expo-router
npx expo install @react-native-async-storage/async-storage
npx expo install nativewind
npx expo install expo-image-picker
npx expo install expo-file-system

### 3. Pornirea aplicației


npx expo start

Se scanează codul QR cu aplicația **Expo Go** (disponibilă pe Android și iOS) pentru a rula aplicația pe telefon.

## Tehnologii utilizate

- **React Native + Expo**
- **Firebase Authentication și Firestore**
- **Open Beauty Facts API**
- **Google Cloud Vision OCR**
- **AsyncStorage pentru date locale**
- **TailwindCSS (via NativeWind) pentru design**
- **expo-camera pentru scanare coduri și etichete**
