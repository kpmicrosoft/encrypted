import { Button } from "@mui/material";

interface Props {
  text: string;
  variant?: "contained" | "outlined" | "text";
  onClick?: () => void;
  route?: string;
}

export default function EncryptedButton({ text, variant, onClick, route }: Props): JSX.Element {
  return <Button variant={variant ?? "contained"} onClick={onClick} href={route}>{text}</Button>;
}