import {NextRouter, useRouter} from "next/router";

export const useFilter = () => {
    const {push, pathname, query} = useRouter();
    const handleFilter = (key: string) => {
        return (ev: any) => {
            push({
                pathname: pathname,
                query: {
                    ...query,
                    page: 1,
                    [key]: ev.value,
                },
            });
        };
    };
    return {handleFilter}
}