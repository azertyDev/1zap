import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { ISubTopic, ITopic } from 'types';
import { centerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { Button } from 'components/ui/button';
import s from './index.module.scss';
import Link from 'next/link';

export const CenterSubPage: FC<{ query: string }> = ({ query }) => {
    const {
        push,
        locale,
        query: { id },
    } = useRouter();
    const { t } = useTranslation();

    const [data, setData] = useState<ISubTopic | null>(null);

    useEffect(() => {
        (async () => {
            await centerApi
                .getSubtopicsByTopic(id as string)
                .then((res) => setData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, []);

    return (
        <div>
            {data && (
                <>
                    <div className={s.themes_top_wr}>
                        <h1>{locale === 'ru' ? data.titleRu : data.titleUz}</h1>
                        <Link href={`/dashboard/center/form?idC=${data.id}`}>
                            <Button variant={'primary'}>Создать под тему</Button>
                        </Link>
                    </div>

                    <div className={s.line}></div>

                    <div className={s.themes_wr}>
                        {data.subTopic.length > 0 &&
                            data.subTopic.map((item) => {
                                return (
                                    <div className={s.theme} key={item.id}>
                                        <Link href={`/dashboard/center/form?idE=${item.id}`}>
                                            {locale === 'ru' ? item.titleRu : item.titleUz}
                                        </Link>
                                    </div>
                                );
                            })}
                    </div>
                </>
            )}
        </div>
    );
};
