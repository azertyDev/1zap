import { useRef } from 'react';

import JoditEditor from 'jodit-react';

export default function Editor({ val, fun }: { val: string; fun: (ev: string) => string }) {
    const editor = useRef(null);

    return (
        <JoditEditor
            ref={editor}
            value={val}
            onBlur={fun}
            config={{
                uploader: {
                    insertImageAsBase64URI: true,
                },
            }}
        />
    );
}
