import React, { useEffect, useRef, useState } from "react";
import { Button, SafeAreaView, View } from "react-native";
import { mediaDevices, RTCPeerConnection, RTCView } from "react-native-webrtc";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
const iceServers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};
export default function KaderRtc() {
  const [stream, setStream] = useState(null);
  const localVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const wsRef = useRef(null);
  useEffect(() => {
    wsRef.current = new WebSocket("ws://164.132.116.135:80/api/v1/ws/channels");
    peerConnectionRef.current = new RTCPeerConnection(iceServers);
    console.log({ kader: new RTCPeerConnection(iceServers) });
    wsRef.current.onopen = () => {
      console.log("WebSocket connection opened");
      setIsConnected(true); // Update state to reflect successful connection

      // Send the "join" message to the server
      const joinMessage = JSON.stringify({
        channel: "join",
        data: "anything",
      });
      wsRef.current.send(joinMessage);
    };

    wsRef.current.onmessage = (e) => {
      console.log("Message from server:", e.data);
      setServerMessage(e?.data); // Store the server message
    };

    wsRef.current.onerror = (e) => {
      console.log("WebSocket error:", e);
      setIsConnected(false); // Update state if there is an error
    };

    wsRef.current.onclose = (e) => {
      console.log("WebSocket connection closed:", e.code, e.reason);
      setIsConnected(false); // Update state if the connection closes
    };

    // Clean up WebSocket connection when the component unmounts
    return () => {
      wsRef.current.close();
    };
    wsRef.current.onmessage = handleSignalingMessages;
  }, []);
  const requestPermissions = async () => {
    const { status: audioStatus } = await Audio.requestPermissionsAsync();
    // const { status: cameraStatus } = await Camera.requestPermissionsAsync();

    if (audioStatus !== "granted") {
      alert(
        "Permissions for camera and audio are required to use this feature"
      );
      return false;
    }
    return true;
  };
  const handleCall = async () => {
    try {
      const pc = peerConnectionRef.current;
      const ws = wsRef.current;

      if (pc && ws) {
        console.log("1");

        // ICE candidate handling
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("2");
            ws.send(
              JSON.stringify({
                type: "ice",
                callId: 1,
                candidate: event.candidate,
              })
            );
          }
        };

        // Create and send offer
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        console.log({ sdp: offer.sdp, type: offer.type });
        console.log("kaderkaderkaderkaderkaderkaderkaderkader");
        wsRef.current.send(
          JSON.stringify({
            type: "offer",
            callId: 1,
            offer: { sdp: offer.sdp, type: offer.type },
          })
        );
      }
    } catch (e) {
      console.log("error when you call", e);
    }
  };
  const start = async () => {
    console.log("erst");
    const hasPermissions = await requestPermissions();
    if (!stream && hasPermissions) {
      try {
        console.log("zwei");

        const s = await mediaDevices.getUserMedia({ video: true, audio: true });
        await setStream(s);
        console.log({ s: s });
        console.log({ localVideoRef: localVideoRef });
        if (localVideoRef.current) {
          console.log("drei");

          localVideoRef.current.srcObject = stream;
        }
        const pc = peerConnectionRef.current;
        console.log({ pc: pc });
        if (pc && s) {
          console.log("PC and S are defined:", pc, s);

          s.getTracks().forEach((track) => {
            console.log("Adding track:", track);
            pc.addTrack(track, s); // Ajouter les pistes
          });

          pc.ontrack = (event) => {
            console.log("Track received:", event); // Cet événement doit se déclencher après l'échange des offres et des réponses
            const remoteStream = event.streams[0];
            console.log("Remote stream received:", remoteStream); // Vérifier le flux distant
            setRemoteStream(remoteStream);

            if (remoteVideoRef.current) {
              console.log("Setting remote video stream");
              remoteVideoRef.current.srcObject = remoteStream;
            } else {
              console.log("Remote video ref is not defined");
            }
          };
        } else {
          console.log("PC or S is not defined");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  const getOffer = async (callId) => {
    try {
      const response = await fetch(
        `http://164.132.116.135:3000//offer/call_id=${callId}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const { offer } = await response.json();
      return offer;
    } catch (error) {
      console.error("Error fetching offer:", error);
    }
  };
  const handleAnswer = async () => {
    try {
      const offer = await getOffer(1);

      const pc = peerConnectionRef.current;
      const ws = wsRef.current;

      if (pc && ws) {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        ws.send(
          JSON.stringify({
            type: "answer",
            callId: 1,
            answer: { sdp: answer.sdp, type: answer.type },
          })
        );
      }
    } catch (error) {
      console.error("Error answering call", error);
    }
  };
  // Handle messages from the WebSocket server
  const handleSignalingMessages = async (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case "answer":
        await handleRemoteDescription(message.answer);
        break;
      case "ice":
        await handleICECandidate(message.candidate);
        break;
      default:
        console.warn("Unknown message type", message.type);
    }
  };

  // Function to handle receiving the remote description (answer)
  const handleRemoteDescription = async (answer) => {
    try {
      const pc = peerConnectionRef.current;
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        console.log("Remote description set successfully");
      }
    } catch (err) {
      console.error("Error setting remote description", err);
    }
  };

  // Function to handle receiving ICE candidates from the remote peer
  const handleICECandidate = async (candidate) => {
    try {
      const pc = peerConnectionRef.current;
      if (pc && pc.remoteDescription) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
        console.log("ICE candidate added");
      }
    } catch (err) {
      console.error("Error adding ICE candidate", err);
    }
  };
  return (
    <SafeAreaView>
      {/* Si le flux vidéo est disponible, on l'affiche */}
      {stream && (
        <RTCView
          streamURL={stream.toURL()}
          style={{ width: "100%", height: 400 }}
        />
      )}
      <View>
        <Button title="Start Camera" onPress={start} />
        <Button title="call" onPress={handleCall} />
        <Button title="repondre a l'appel" onPress={handleAnswer} />
      </View>
    </SafeAreaView>
  );
}
