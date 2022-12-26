import { InfoLink } from '../info_link';
import s from './index.module.scss';

type InfoLinkItem<T> = {
    id: number;
    link: string;
    icon: string;
    title: string;
    desc: string;
};

interface InfoLinksProps<T> {
    data: InfoLinkItem<T>[];
}

export const InfoLinks = <T extends object>({
    data,
}: InfoLinksProps<T>): JSX.Element => {
    return (
        <div className={s.wrapper}>
            {data.map((link: any) => (
                <InfoLink {...link} key={link.id} />
            ))}
        </div>
    );
};
