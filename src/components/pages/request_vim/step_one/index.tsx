import { FC } from 'react';

import { FirstFormVim } from 'components/pages/request_vim/form_items/first_form';
import { RequestVimHeader } from 'components/pages/request_vim/header';

export const RequestVimComp: FC = (): JSX.Element => {
    return (
        <div style={{ position: 'relative' }}>
            <RequestVimHeader />
            <FirstFormVim />
        </div>
    );
};
