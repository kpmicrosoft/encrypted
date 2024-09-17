import { HelpOutlineRounded } from "@mui/icons-material";

interface Props {
    children?: React.ReactNode;
}
export default function Help({children}: Props): JSX.Element {
    return (
      <div>
        {children}
        <HelpOutlineRounded color="primary"/>
      </div>
    );
}