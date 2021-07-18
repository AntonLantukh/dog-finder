import React, {FunctionComponent} from 'react';

import css from './style.scss';

type Props = {
    numFound: number | null;
};

const Announcement: FunctionComponent<Props> = ({numFound}: Props) => (
    <div id="announce" className={css.visuallyHidden} aria-live="assertive">
        {numFound !== null
            ? `${numFound} suggestions found, to navigate use up and down arrows`
            : 'Start typings to find a location'}
    </div>
);

export default Announcement;
