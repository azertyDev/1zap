import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import Avatar from 'src/components/ui/avatar';
import s from './index.module.scss';

interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className={s.wrapper}>
            <h2>{t(`dashboard:${title}`)}</h2>
            <div className={s.user_info}>
                <p>ID 12345</p>
                <Avatar src="/assets/images/avatar2.jpeg" alt="avatar" />
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(Header), {
    ssr: false,
});
