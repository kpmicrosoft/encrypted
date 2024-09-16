interface Props {
    text: string;
}  

export default function TextBox({text}: Props): JSX.Element {
    return <div className="mt-6 text-lg leading-8 text-gray-600">{text}</div>;
    }