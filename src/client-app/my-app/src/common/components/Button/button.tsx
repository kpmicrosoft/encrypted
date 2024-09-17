import { Button } from "@mui/material";

import "./button.scss";

interface Props {
  text: string;
  variant?: "contained" | "outlined" | "text";
  onClick?: () => void;
  route?: string;
}

export default function EncryptedButton({ text, variant, onClick, route }: Props): JSX.Element {
  return (
    <Button className="button" variant={variant ?? "contained"} onClick={onClick} href={route}>
      {text}
    </Button>
  )
}