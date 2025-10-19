import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "cantosdelcarmelo.firebaseapp.com",
  projectId: "cantosdelcarmelo",
  storageBucket: "cantosdelcarmelo.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXXXX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login");
const loginSection = document.getElementById("login-section");
const uploadSection = document.getElementById("upload-section");

const titleInput = document.getElementById("song-title");
const lyricsFile = document.getElementById("lyrics-file");
const audioFile = document.getElementById("audio-file");
const uploadBtn = document.getElementById("upload");

loginBtn.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    loginSection.classList.add("hidden");
    uploadSection.classList.remove("hidden");
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};

uploadBtn.onclick = async () => {
  const title = titleInput.value;
  const lyrics = lyricsFile.files[0];
  const audio = audioFile.files[0];

  if (!title || !lyrics || !audio) {
    alert("Please fill all fields.");
    return;
  }

  const lyricsRef = ref(storage, `lyrics/${lyrics.name}`);
  const audioRef = ref(storage, `audio/${audio.name}`);

  await uploadBytes(lyricsRef, lyrics);
  await uploadBytes(audioRef, audio);

  const lyricsUrl = await getDownloadURL(lyricsRef);
  const audioUrl = await getDownloadURL(audioRef);

  await addDoc(collection(db, "songs"), {
    title,
    lyricsUrl,
    audioUrl,
  });

  alert("Song added successfully!");
  titleInput.value = "";
  lyricsFile.value = "";
  audioFile.value = "";
};
