import { useEffect, useState } from 'react';
import { vinOrderApi } from 'src/utils/api';
import s from './index.module.scss';

export const VinRequests = () => {
    const [data, setData] = useState();
    console.log(data);

    useEffect(() => {
        vinOrderApi
            .fetchVinRequests()
            .then((response) => {
                setData(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return <div className={s.root}>VIN запросы</div>;
};
