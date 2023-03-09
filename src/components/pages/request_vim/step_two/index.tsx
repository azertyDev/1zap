import { FC } from 'react';

import { RequestVimHeader } from 'components/pages/request_vim/header';
import { SecondFormVim } from 'components/pages/request_vim/form_items/second_form';

export const RequestVimCompSec: FC = (): JSX.Element => {
    return (
        <div style={{ position: 'relative' }}>
            <RequestVimHeader />
            <SecondFormVim />
        </div>
    );
};
