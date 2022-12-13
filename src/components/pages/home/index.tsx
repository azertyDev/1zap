import s from './index.module.scss';
import { Button } from 'components/ui/button';

export const Home = () => {
    return (
        <div className={s.home}>
            <Button className={'main'}>hello</Button>
        </div>
    );
};
