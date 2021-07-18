import React, {useState, FunctionComponent, ChangeEvent} from 'react';

import css from './style.css';

const Uploader: FunctionComponent = () => {
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isPreviewPending, setPending] = useState<boolean>(false);

    const onChange = (e: ChangeEvent) => {
        const file = (e.target as HTMLInputElement)?.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();
        setPending(true);

        reader.onerror = () => setPending(false);
        reader.onabort = () => setPending(false);
        reader.onloadend = () => setPending(false);
        reader.onload = () => setPreviewUrl(reader.result as string);

        reader.readAsDataURL(file);
    };
    return (
        <div className={css.uploader}>
            <div className={css.uploader__file}>
                <input type="file" id="upload" hidden onChange={onChange} accept=".jpg,.jpeg,.png" />
                <label htmlFor="upload" className={css.uploader__button}>
                    Upload the image
                </label>
                <span className={css.uploader__drag}>Or drag it</span>
            </div>
            {console.log(isPreviewPending)}
            <div className={css.uploader__preview}>
                {previewUrl && (
                    <img className={css.uploader__image} src={previewUrl} alt="preview" width="200" height="300" />
                )}
            </div>
        </div>
    );
};

export default Uploader;
