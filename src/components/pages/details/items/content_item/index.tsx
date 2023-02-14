import React, {FC} from "react";

import s from "./index.module.scss";

import Link from "next/link";

import Image from "next/image";

export const DetailCategoryItem: FC<{ listOrImg: "list" | "image"; title: string }> = ({listOrImg, title}) => {
    return <div className={`${s.content_item} ${listOrImg === 'image' ? s.image_item : ""}`}>
        <h6 className={`${listOrImg === "list" ? s.content_item_title : s.content_item_title_small} `}>{title}</h6>
        {listOrImg === "list" && <ul>
            <li className={s.content_item_link}>
                <Link href={"/details/categories/chosen_category"}>
                    Внутреннее оборудование
                </Link>
            </li>
            <li className={s.content_item_link}>
                <Link href={"#"}>
                    Headlining (7310)
                </Link>
            </li>
        </ul>
        }

        {
            listOrImg === "image" && <div>
                <div className={s.img_wr}>
                    <Image fill={true}
                           src={"https://images.unsplash.com/photo-1675788555185-ea15a09691cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
                           alt={"detail"}/>
                </div>
                <Link className={s.full_link} href={"/details/categories/chosen_category/chosen_detail"}></Link>
            </div>
        }

    </div>
}