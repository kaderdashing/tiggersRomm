import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { io, Socket } from "socket.io-client";

// Typage correct de la socket
type SocketIOClient = Socket | null;

const SOCKET_URL = "ws://164.132.116.135:80/api/v1/ws/channels";

const RTCW = () => {
  const [socket, setSocket] = useState<SocketIOClient>(null);
  const [isConnected, setIsConnected] = useState(false); // État de connexion
  const [serverMessage, setServerMessage] = useState(""); // Message du serveur

  useEffect(() => {
    // Créer la socket sans connexion automatique
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });
    // const newSocket = io(SOCKET_URL, { autoConnect: false });
    setSocket(newSocket);

    // Événement de connexion réussie
    newSocket.on("connect", () => {
      console.log("Connexion réussie au serveur Socket.io");
      setIsConnected(true);
    });

    // Événement de déconnexion
    newSocket.on("disconnect", () => {
      console.log("Déconnecté du serveur Socket.io");
      setIsConnected(false);
    });

    // Événement en cas d'erreur de connexion
    newSocket.on("connect_error", (error) => {
      console.error("Erreur de connexion : ", error);
      setServerMessage("Erreur de connexion au serveur");
    });

    // Écouter les événements personnalisés du serveur (validation ou échec)
    newSocket.on("validation_success", (data) => {
      console.log("Validation réussie : ", data);
      setServerMessage("Connexion validée : " + data.message);
    });

    newSocket.on("validation_failure", (data) => {
      console.log("Échec de validation : ", data);
      setServerMessage("Échec de connexion : " + data.message);
    });

    return () => {
      newSocket.disconnect(); // Déconnexion lors du démontage
    };
  }, []);

  // Fonction pour se connecter explicitement
  const handleConnect = () => {
    if (socket) {
      console.log("Tentative de connexion au serveur Socket.io...");
      socket.connect(); // Se connecter explicitement
    }
  };

  // Fonction pour se déconnecter explicitement
  const handleDisconnect = () => {
    if (socket) {
      console.log("Déconnexion du serveur Socket.io...");
      socket.disconnect(); // Se déconnecter explicitement
    }
  };

  return (
    <View>
      <Text style={{ color: "white" }}>
        État de connexion : {isConnected ? "Connecté" : "Non connecté"}
      </Text>
      <Text style={{ color: "white" }}>
        Message du serveur : {serverMessage}
      </Text>
      <Button title="Se connecter au serveur" onPress={handleConnect} />
      <Button title="Se déconnecter du serveur" onPress={handleDisconnect} />
    </View>
  );
};

export default RTCW;

// const SOCKET_URL = "http://164.132.116.135:8080/api/v1/ws/channels";
