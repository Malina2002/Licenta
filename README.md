# BeautyScan

**BeautyScan** este o aplicație mobilă dezvoltată cu **React Native** și **Expo**, care le permite utilizatorilor să scaneze produse cosmetice și să verifice ingredientele acestora.  
Aplicația extrage informații din baza de date **Open Beauty Facts** și analizează siguranța ingredientelor în funcție de o bază proprie.  
Include funcționalități precum: istoric de scanări, salvare preferințe, profil cu alergii și avertismente pentru ingrediente periculoase sau alergenice.

---

## Livrabilele proiectului

- Codul sursă complet (fără fișiere binare compilate)
- Structură organizată pe directoare (`app/`, `data/`, `utils/`, `assets/`, etc.)
- Fișiere de configurare: `package.json`, `app.config.js`, `firebase.js`, etc.

---

## Adresa repository-ului

https://github.com/Malina2002/Licenta

---

## Pași de instalare și rulare

### 1. Clonarea repository-ului

```bash
git clone https://github.com/Malina2002/Licenta.git
cd BeautyScan
```

### 2. Instalarea Node.js

Descarcă și instalează cea mai recentă versiune LTS de pe:  
https://nodejs.org/

După instalare, verifică versiunile:

```bash
node -v
npm -v
```

### 3. Instalarea Expo CLI

```bash
npm install -g expo-cli
```

### 4. Instalarea dependențelor proiectului

```bash
npm install
```

### 5. Instalarea modulelor necesare

```bash
npx expo install expo-camera
npx expo install firebase
npx expo install expo-router
npx expo install @react-native-async-storage/async-storage
npx expo install nativewind
npx expo install expo-image-picker
npx expo install expo-file-system
```

### 6. Pornirea aplicației

```bash
npx expo start
```

Scanează codul QR cu aplicația **Expo Go** (disponibilă pe Android și iOS) pentru a rula aplicația pe telefon.

---

## Tehnologii utilizate

- React Native + Expo
- Firebase Authentication și Firestore
- Open Beauty Facts API
- AsyncStorage pentru date locale
- TailwindCSS (NativeWind) pentru design modern
- expo-camera pentru scanare coduri de bare și etichete
