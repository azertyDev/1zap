import s from './index.module.scss';

import Link from 'next/link';

import { IconsWrapper } from 'components/ui/icons_wrapper';
import { Icon } from 'components/ui/icon';
import { Logo } from 'components/ui/logo';
import { Button } from 'components/ui/button';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export const RequestVimHeader = (): JSX.Element => {
    const { t } = useTranslation();
    const { pathname, push } = useRouter();
    const [pathName] = useState(pathname.split('/'));

    const pushToPage = useCallback(() => {
        return pathName.includes('second_step')
            ? push('/request_vim')
            : push('/');
    }, []);

    return (
        <div>
            <header
                className={`${s.header} ${
                    pathName.includes('final_step') ? s.final : ''
                }`}
            >
                <div className={`${s.progress_line} ${s.progress_line_top}`}>
                    <div
                        className={`${s.progress_line_item}  ${
                            pathName.includes('second_step') ? s.sec_step : ''
                        }  ${
                            pathName.includes('final_step') ? s.final_step : ''
                        }`}
                    ></div>
                </div>
                {!pathName.includes('final_step') && (
                    <div onClick={pushToPage} className={s.icon}>
                        <IconsWrapper>
                            <Icon size={18} name={'chevron_left'} />
                        </IconsWrapper>
                    </div>
                )}

                <p className={s.header_title}>{t('common:searchVin')}</p>
                {!pathName.includes('final_step') && (
                    <Link href={'/'} className={s.icon}>
                        <IconsWrapper>
                            <Icon size={18} name={'close'} />
                        </IconsWrapper>
                    </Link>
                )}

                <Link href={'/'} className={s.link}>
                    <Logo />
                </Link>

                {!pathName.includes('final_step') && (
                    <Link href={'/'} className={s.link_btn_cancel}>
                        <Button variant={'disabled'}>
                            {t('common:cancel')}
                        </Button>
                    </Link>
                )}
            </header>
            <div className={s.progress_line}>
                <div
                    className={`${s.progress_line_item}  ${
                        pathName.includes('second_step') ? s.sec_step : ''
                    }  ${pathName.includes('final_step') ? s.final_step : ''}`}
                ></div>
            </div>
        </div>
    );
};
