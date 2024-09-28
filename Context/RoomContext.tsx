import React, { createContext, useContext, useState } from "react";

interface RoomContextType {
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const RoomContext = createContext<RoomContextType | undefined>(undefined);

// Create a custom hook to use the context
export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};

// Create the provider component
export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [room, setRoom] = useState("");
  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
