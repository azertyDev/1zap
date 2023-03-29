import { FilterSelections } from 'components/ui/filter/filter_selections';
import { FilterSelect } from 'components/ui/filter/filter_selections/filter_select';
import { FC, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';
import { useGetFitCatalog } from 'src/hooks/laximoData/useGetFitCar';
import { useFilterDetails } from 'src/hooks/common/useFilterDetails';
import { useFilterSelectFitByCar } from 'src/hooks/laximoData/useFilterSelectFitByCar';
import { getModelSwitchCondition } from 'src/function/getModelSwitchCondition';

export const FitCars: FC<{ dataCatalog: string; dataFilterFirstLevel: string; dataYear: string }> = ({
    dataCatalog,
    dataFilterFirstLevel,
    dataYear,
}) => {
    const { t } = useTranslation();
    const { catalog } = useGetFitCatalog(dataCatalog);

    const {
        query: { brandLabel, modelLabel, yearLabel, regionLabel },
    } = useRouter();

    const { handleFilterFirstLevel, handleFilterBrand, handleFilterYear } = useFilterDetails();

    const [modelSel, setModelSel] = useState(null);
    const [yearSel, setYearSel] = useState(null);
    const [regionSel, setRegionSel] = useState(null);

    useFilterSelectFitByCar(dataFilterFirstLevel, setModelSel, getModelSwitchCondition, [brandLabel] as string[]);

    useFilterSelectFitByCar(
        dataFilterFirstLevel,
        setRegionSel,
        (val: any) => {
            return val.$.name === 'Регион';
        },
        [brandLabel] as string[]
    );

    useFilterSelectFitByCar(
        dataYear,
        setYearSel,
        (val: any) => {
            return val.$.name === 'Модельный год' || val.$.name === 'Год выпуска' || val.$.name === 'Год';
        },
        [modelLabel, brandLabel, regionLabel] as string[]
    );

    return (
        <FilterSelections>
            {catalog && (
                <FilterSelect
                    id={'brand'}
                    title={t('common:selects.brand')}
                    value={(brandLabel ?? '') as string}
                    fun={handleFilterBrand}
                    labelAlt={t('common:choose')}
                    isTranslated
                    options={catalog}
                />
            )}

            <FilterSelect
                id={'model'}
                title={t('common:selects.model')}
                value={(modelLabel ?? '') as string}
                fun={handleFilterFirstLevel('model', 'modelLabel')}
                labelAlt={t('common:choose')}
                isTranslated
                options={modelSel ? modelSel : [{ value: '', label: '' }]}
            />

            <FilterSelect
                id={'year'}
                title={t('common:selects.year')}
                value={(yearLabel ?? '') as string}
                fun={handleFilterYear}
                labelAlt={t('common:choose')}
                options={yearSel ? yearSel : [{ value: '', label: '' }]}
            />

            <FilterSelect
                id={'region'}
                title={t('common:selects.region')}
                value={(regionLabel ?? '') as string}
                fun={handleFilterFirstLevel('region', 'regionLabel')}
                labelAlt={t('common:choose')}
                isTranslated
                options={regionSel ? regionSel : [{ value: '', label: '' }]}
            />
        </FilterSelections>
    );
};
