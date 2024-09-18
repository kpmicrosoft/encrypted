import { Box, Modal, TextField } from "@mui/material";
import EncryptedButton from "../../common/components/Button/button";
import React from "react";
import { Level_1_Password } from "../../common/services/Copilot/copilot-service";
import TextBox from "../../common/components/TextBox/text-box";
import { useNavigate } from 'react-router-dom';
import Help from "../../common/components/Help/help";

export default function LevelOne(): JSX.Element {
  const [open, setOpen] = React.useState(true);
  const [aiMessage, setApiMessage] = React.useState("Please enter password");
  const [inputValue, setInputValue] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [attempts, setAttempts] = React.useState(0);
  const navigate = useNavigate();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  function handleClose(event?: {}, reason?: string): void {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setOpen(false);
    navigate('/level2')
  }

  function sendPassword(): void {
    Level_1_Password(inputValue).then((response) => {
      setApiMessage(response.data.detail);
      setStatus(response.data.status);
      if(status !== "Success") {
        setAttempts(attempts + 1);
      }
    });
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        slotProps={{
          backdrop:
          {
            style: {
              backdropFilter: 'blur(10px)', // Increase the blur value here
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Adjust the background color and opacity
            },
          }
        }}
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className="">
            <h2>Please enter {attempts < 3 ? "the password" : <u><b>the password</b></u>}</h2>
            <input
              type="text"
              placeholder="********"
              onChange={(e) => setInputValue(e.target.value)}
            />
            {status === "Success" ? 
              <EncryptedButton text="Start your journey!" onClick={handleClose} /> : 
              <EncryptedButton text="Submit" onClick={sendPassword} />}
            {status === "Success" && <TextBox text={aiMessage} />}
            {status === "Denied" && (
              <Help>
                <TextBox text={attempts < 3 ? "Try again" : "Here's a hint"} />
              </Help>
            )}
          </div>
        </Box>
      </Modal>
    </div >
  );
}