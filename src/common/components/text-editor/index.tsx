import dynamic from 'next/dynamic';
import { CustomEditorProps } from './ck-editor';

const CustomEditor = dynamic(
    () => {
        return import('./ck-editor');
    },
    { ssr: false }
);

type Props = CustomEditorProps & { className?: string };

function TextEditor({ className, onChange, value = '', disabled }: Props) {
    return (
        <div className={className}>
            <CustomEditor
                disabled={disabled}
                onChange={onChange}
                value={value}
            />
        </div>
    );
}

export default TextEditor;
