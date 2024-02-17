import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function Editor({ value, setValue }: { value: string, setValue: (newValue: string) => void }) {
    return <ReactQuill className='bg-white' theme="snow" value={value} onChange={(value) => setValue(value)} />;
}