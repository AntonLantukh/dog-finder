import React, {FunctionComponent} from 'react';

import css from './style.css';

import template from './image.svg';

import Spinner from '../../Spinner';

const Template: FunctionComponent = () => <img src={template} alt="preview" width="50" height="50" />;

type ImageProps = {
    previewUrl: string;
};

const Image: FunctionComponent<ImageProps> = ({previewUrl}) => (
    <img src={previewUrl} className={css.preview__image} alt="preview" width="190" height="190" />
);

type PreviewProps = {
    previewUrl: string;
    isPreviewPending: boolean;
};

const Preview: FunctionComponent<PreviewProps> = ({isPreviewPending, previewUrl}) => (
    <div className={css.preview}>
        {isPreviewPending ? <Spinner /> : previewUrl ? <Image {...{previewUrl}} /> : <Template />}
    </div>
);

export default Preview;
