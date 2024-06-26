import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div>
      {!isChatOpen && (
        <Button
          variant="contained"
          startIcon={<ChatIcon />}
          size="small"
          onClick={toggleChat}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            padding: "10px 10px",
            backgroundColor: "#0078d4",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          AI Chatbot
        </Button>
      )}
      {isChatOpen && (
        <div
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
            width: isFullScreen ? "95%" : "90%",
            maxWidth: isFullScreen ? "100%" : "350px",
            height: isFullScreen ? "80%" : "70%",
            maxHeight: isFullScreen ? "100%" : "500px",
            border: "1px solid #ccc",
            borderRadius: isFullScreen ? "8px" : "8px",
            backgroundColor: "#fff",
            zIndex: 999,
            boxShadow: isFullScreen ? "none" : "0 0 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IconButton
            onClick={toggleFullScreen}
            style={{
              position: "absolute",
              top: "4px",
              right: "40px",
              zIndex: 1000,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
          <IconButton
            onClick={toggleChat}
            style={{
              position: "absolute",
              top: "4px",
              right: "10px",
              zIndex: 1000,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </IconButton>
          <iframe
            src="https://copilotstudio.microsoft.com/environments/Default-3c678821-7750-47a3-937f-2661439abb7a/bots/cr971_copilotTest/webchat?__version__=2"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "8px",
              flex: "1",
            }}
            title="Chat with a virtual assistant"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
