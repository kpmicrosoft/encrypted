import { Box, Modal, TextField } from "@mui/material";
import EncryptedButton from "../../common/components/Button/button";
import React from "react";
import { Level_1_Password } from "../../common/services/Copilot/copilot-service";
import TextBox from "../../common/components/TextBox/text-box";
import Help from "../../common/components/Help/help";

export default function LevelOne(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [aiMessage, setApiMessage] = React.useState("Please enter password");
  const [inputValue, setInputValue] = React.useState("");
  const [status, setStatus] = React.useState("");

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

  function handleOpen(): void {
    setOpen(true);
  }

  function handleClose(): void {
    setOpen(false);
  }

  function sendPassword(): void {
    Level_1_Password(inputValue).then((response) => {
      setApiMessage(response.data.detail);
      setStatus(response.data.status);
    });
  }

  return (
    <div>
      <EncryptedButton onClick={handleOpen} text="Enter password" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <TextField
            label="Please enter the password"
            variant="standard"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <EncryptedButton text="Submit" onClick={sendPassword} />
          {status === "Success" && <TextBox text={aiMessage} />}
          {status === "Denied" && (
            <Help>
              <TextBox text={aiMessage} />
            </Help>
          )}
        </Box>
      </Modal>
    </div>
  );
}