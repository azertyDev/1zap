import { useEffect, useState } from 'react';
import { vinRequetsApi } from 'src/utils/api';
import s from './index.module.scss';

export const VinRequests = () => {
    const [data, setData] = useState();
    console.log(data);

    useEffect(() => {
        vinRequetsApi
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
