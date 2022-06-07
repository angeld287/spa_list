import { Space, Table } from 'antd';
import { FC, useEffect, useMemo, useState } from 'react'
import type { ColumnsType } from 'antd/lib/table';
import CustomButton from '../CustomButton';
import { ICustomButton } from '../CustomButton'
import IPost from '../../Interfaces/IPosts'


interface table {
    headers: string[];
    itemsLoading: boolean;
    items: IPost[];
}

const CustomTable: FC<table> = ({ headers, itemsLoading, items }) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(itemsLoading)
    }, [itemsLoading]);

    const _headers: ColumnsType<IPost> = useMemo(() => headers.map(_ => {
        if (_ !== 'Actions') {
            return ({ title: _, dataIndex: _.toLowerCase(), key: _.toLowerCase() })
        } else {
            return ({
                title: _,
                key: _.toLowerCase(),
                dataIndex: _.toLowerCase(),
                render: (btns) => (<Space size="middle">
                    {
                        btns.map((_: ICustomButton) => <CustomButton color={_.color} _key={_.id + _.color} onClick={_.onClick} loading={_.loading === undefined ? false : _.loading} >{_.children}</CustomButton>)
                    }
                </Space>),
            })
        }
    }), [headers]);

    const _items = useMemo(
        () => {
            console.log('actualizo')
            return items.map(_ => ({ ..._, key: _.id }))
        },
        [items]
    );



    return <Table
        columns={_headers}
        dataSource={_items}
        loading={loading}
    />

}

export default CustomTable