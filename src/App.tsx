// import "./App.css";
import {
  AuthProvider,
  FirestoreProvider,
  StorageProvider,
  useFirebaseApp,
} from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { RootLayout } from "./components/layout/RootLayout";

function App() {
  const app = useFirebaseApp();
  const db = getFirestore(app);
  const storage = getStorage(app);
  const auth = getAuth(app);

  return (
    <FirestoreProvider sdk={db}>
      <StorageProvider sdk={storage}>
        <AuthProvider sdk={auth}>
          <RootLayout/>
        </AuthProvider>
      </StorageProvider>
    </FirestoreProvider>
  );
}

export default App;
