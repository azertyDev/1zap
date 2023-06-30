import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { Avatar } from 'src/components/ui/avatar';
import s from './index.module.scss';
import { Language } from 'components/ui/language';

interface HeaderProps {
    title: string;
    id: number;
    logo: string;
}

const Header = ({ title, id, logo }: HeaderProps): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className={s.wrapper}>
            <h2>{t(`dashboard:${title}`)}</h2>

            <div className={s.user_info}>
                <Language />
                {id && <p>ID {id}</p>}
                <Avatar src={logo} alt="avatar" />
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(Header), {
    ssr: false,
});
