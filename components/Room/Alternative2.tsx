import { Audio } from "expo-av";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button } from "react-native";
import {
  RTCPeerConnection,
  RTCSessionDescription,
  mediaDevices,
  MediaStream,
  RTCIceCandidate,
} from "react-native-webrtc";
const servers: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }, // Serveur STUN public
  ],
};

type PeerConnections = {
  [socketId: string]: RTCPeerConnection;
};

export default function WebRtcChat() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const peerConnections = useRef<PeerConnections>({});
  const localStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    // WebSocket pour le serveur de signalisation
    const ws = new WebSocket("ws://164.132.116.135:80/api/v1/ws/channels");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      setIsConnected(true);

      // Rejoindre la room
      ws.send(
        JSON.stringify({
          channel: "join",
          data: "room-id",
        })
      );
    };

    ws.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);

      if (parsedMessage.channel === "offer") {
        handleOffer(parsedMessage.data);
      } else if (parsedMessage.channel === "answer") {
        handleAnswer(parsedMessage.data);
      } else if (parsedMessage.channel === "ice-candidate") {
        handleICECandidate(parsedMessage.data);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    // Fermer le WebSocket à la désactivation du composant
    return () => {
      ws.close();
    };
  }, []);

  // Créer une connexion peer WebRTC
  const createPeerConnection = async (
    socketId: string
  ): Promise<RTCPeerConnection> => {
    const pc = new RTCPeerConnection(servers);
    peerConnections.current[socketId] = pc;

    // Utiliser des assertions de type pour éviter les erreurs TypeScript
    (pc as any).onicecandidate = (event: any) => {
      if (event.candidate && socket) {
        socket.send(
          JSON.stringify({
            channel: "ice-candidate",
            data: event.candidate,
          })
        );
      }
    };

    (pc as any).ontrack = (event: any) => {
      console.log("Incoming track:", event.streams[0]);
      // Vous pouvez manipuler le stream ici (ajouter le flux audio à l'interface utilisateur)
    };

    // Ajouter le flux audio local à la connexion peer
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStream.current as MediaStream);
      });
    }

    return pc;
  };

  // Gérer l'offre WebRTC
  const handleOffer = async (
    offer: RTCSessionDescriptionInit & { sender: string }
  ) => {
    if (!offer.sdp) {
      console.error("L'offre ne contient pas de SDP valide");
      return;
    }

    const pc = await createPeerConnection(offer.sender);

    // @ts-ignore: Désactivation de la vérification TypeScript pour cette ligne
    const remoteOffer: RTCSessionDescriptionInit = {
      sdp: offer.sdp,
      type: offer.type,
    };

    // @ts-ignore: Désactivation de la vérification TypeScript pour cette ligne
    await pc.setRemoteDescription(new RTCSessionDescription(remoteOffer));

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket?.send(
      JSON.stringify({
        channel: "answer",
        data: answer,
      })
    );
  };

  // Gérer la réponse WebRTC
  const handleAnswer = async (
    answer: RTCSessionDescriptionInit & { sender: string }
  ) => {
    if (!answer.sdp) {
      console.error("La réponse ne contient pas de SDP valide");
      return;
    }

    const pc = peerConnections.current[answer.sender];

    if (pc) {
      // @ts-ignore: Désactivation de la vérification TypeScript pour cette ligne
      const remoteAnswer: RTCSessionDescriptionInit = {
        sdp: answer.sdp,
        type: answer.type,
      };

      // @ts-ignore: Désactivation de la vérification TypeScript pour cette ligne
      await pc.setRemoteDescription(new RTCSessionDescription(remoteAnswer));
    }
  };

  // Gérer le candidat ICE
  const handleICECandidate = async (
    candidate: RTCIceCandidateInit & { sender: string }
  ) => {
    const pc = peerConnections.current[candidate.sender];
    if (pc) {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  // Démarrer l'appel (obtenir un flux local et envoyer une offre)
  const startCall = async () => {
    try {
      // Demander la permission pour le microphone
      const { status } = await Audio.requestPermissionsAsync();

      if (status !== "granted") {
        console.error("Permission refusée pour le microphone");
        return;
      }

      console.log("111");
      const stream = await mediaDevices.getUserMedia({ audio: true });
      console.log("2");

      localStream.current = stream;
      console.log("3");

      const pc = await createPeerConnection("peer-id");
      console.log("4");

      const offer = await pc.createOffer({});
      console.log("5");

      await pc.setLocalDescription(offer);
      console.log("6");

      socket?.send(
        JSON.stringify({
          channel: "offer",
          data: offer,
        })
      );
    } catch (error) {
      console.error("Error starting call: kader", error);
    }
  };
  return (
    <View>
      <Text>{isConnected ? "Connected" : "Not Connected"}</Text>
      <Button title="Start Call" onPress={startCall} />
    </View>
  );
}
