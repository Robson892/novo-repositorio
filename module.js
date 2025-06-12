import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyANYfExlHzN-R8HOWjBmY7AjTpZqbZSpTs",
  authDomain: "portifolio-1c98c.firebaseapp.com",
  projectId: "portifolio-1c98c",
  storageBucket: "portifolio-1c98c.firebasestorage.app",
  messagingSenderId: "341320695476",
  appId: "1:341320695476:web:4946e4e692e068e70c21e1",
  measurementId: "G-VLTSP9FWZT"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Exemplo: função para adicionar documento
async function enviarMensagem() {
  try {
    const docRef = await addDoc(collection(db, "contatos"), {
      nome: "Robson",
      email: "robson@email.com",
      mensagem: "Olá, essa é uma mensagem."
    });
    console.log("Documento escrito com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
  }
}

enviarMensagem();
