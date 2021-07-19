import React, {FunctionComponent} from 'react';

import css from './style.scss';

import template from './image.svg';

import Spinner from '../../Spinner';

type ImageProps = {
    previewUrl: string;
};

const Image: FunctionComponent<ImageProps> = ({previewUrl}) =>
    previewUrl ? (
        <img src={previewUrl} className={css.preview__image} alt="image" width="190" height="190" />
    ) : (
        <img src={template} alt="template" width="50" height="50" />
    );

type PreviewProps = {
    previewUrl: string;
    isPreviewPending: boolean;
};

const Preview: FunctionComponent<PreviewProps> = ({isPreviewPending, previewUrl}) => (
    <div className={css.preview}>{isPreviewPending ? <Spinner /> : <Image {...{previewUrl}} />}</div>
);

export default Preview;
