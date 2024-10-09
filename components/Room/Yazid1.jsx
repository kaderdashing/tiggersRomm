import React, { useEffect, useRef, useState } from "react";
import { View, Button, Text } from "react-native";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
  MediaStream,
} from "react-native-webrtc";
import { Audio } from "expo-av";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

export default function Yazid() {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const localStream = useRef(null);
  const remoteStream = useRef(new MediaStream());
  const peerConnection = useRef(new RTCPeerConnection(servers));
  const [log, setLog] = useState("");

  // Log messages to track behavior
  const appendLog = (message) => {
    setLog((prevLog) => `${prevLog}\n${message}`);
    console.log(message);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://164.132.116.135:80/api/v1/ws/channels");

    ws.onopen = () => {
      appendLog("WebSocket connection opened");
      setIsConnected(true);
      ws.send(
        JSON.stringify({
          channel: "join",
          data: "room-id",
        })
      );
    };

    ws.onmessage = async (message) => {
      appendLog("WebSocket message received");
      const parsedMessage = JSON.parse(message.data);

      if (parsedMessage.channel === "offer") {
        appendLog("Handling offer...");
        await handleOffer(parsedMessage.data);
      } else if (parsedMessage.channel === "answer") {
        appendLog("Handling answer...");
        await handleAnswer(parsedMessage.data);
      } else if (parsedMessage.channel === "ice-candidate") {
        appendLog("Handling ICE candidate...");
        await handleICECandidate(parsedMessage.data);
      }
    };

    ws.onerror = (error) => {
      appendLog(`WebSocket error: ${error.message}`);
    };

    ws.onclose = () => {
      setIsConnected(false);
      appendLog("WebSocket connection closed");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const startLocalStream = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();

      if (status !== "granted") {
        appendLog("Permission denied for audio");
        return;
      }

      const stream = await mediaDevices.getUserMedia({ audio: true });
      localStream.current = stream;

      appendLog("Local stream started");

      localStream.current.getTracks().forEach((track) => {
        appendLog("Adding local track to peer connection");
        peerConnection.current.addTrack(track, localStream.current);
      });

      peerConnection.current.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.current.addTrack(track);
        });
        appendLog("Remote stream track added");
      };
    } catch (error) {
      appendLog(`Error starting local stream: ${error.message}`);
    }
  };

  const createOffer = async () => {
    try {
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate && socket) {
          appendLog("Sending ICE candidate");
          socket.send(
            JSON.stringify({
              channel: "ice-candidate",
              data: event.candidate,
            })
          );
        }
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      appendLog("Created offer, sending via WebSocket");

      socket.send(
        JSON.stringify({
          channel: "offer",
          data: offer,
        })
      );
    } catch (error) {
      appendLog(`Error creating offer: ${error.message}`);
    }
  };

  const handleOffer = async (offer) => {
    try {
      appendLog("Setting remote description for offer...");
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );

      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      appendLog("Created answer, sending via WebSocket");

      socket.send(
        JSON.stringify({
          channel: "answer",
          data: answer,
        })
      );
    } catch (error) {
      appendLog(`Error handling offer: ${error.message}`);
    }
  };

  const handleAnswer = async (answer) => {
    try {
      appendLog("Setting remote description for answer...");
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    } catch (error) {
      appendLog(`Error handling answer: ${error.message}`);
    }
  };

  const handleICECandidate = async (candidate) => {
    try {
      appendLog("Adding ICE candidate...");
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    } catch (error) {
      appendLog(`Error handling ICE candidate: ${error.message}`);
    }
  };

  return (
    <View>
      <Text>{isConnected ? "Connected" : "Not Connected"}</Text>
      <Button title="Start Local Stream" onPress={startLocalStream} />
      <Button title="Create Offer" onPress={createOffer} />
      <Text>{log}</Text>
    </View>
  );
}
