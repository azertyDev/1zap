import { FC } from 'react';

import { FirstFormVim } from 'components/pages/request_vim/first_form';
import { RequestVimHeader } from 'components/pages/request_vim/header';
import { IStaticParams } from 'types';

export const RequestVimComp: FC<{ dataCatalog: string; dataModel: string; staticPar: IStaticParams }> = ({
    dataCatalog,
    dataModel,
    staticPar,
}): JSX.Element => {
    return (
        <div style={{ position: 'relative' }}>
            <RequestVimHeader />
            <FirstFormVim dataCatalog={dataCatalog} dataModel={dataModel} staticPar={staticPar} />
        </div>
    );
};
