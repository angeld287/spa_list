import { EditOutlined } from '@ant-design/icons';
import { FC, useEffect, useMemo, useState } from 'react'
import CustomTable from '../../Components/CustomTable';
import IPost from '../../Interfaces/IPosts'

const PostsList: FC = () => {
    const [loading, setLoading] = useState(false)

    let _headers: string[] = []
    let _items: IPost[];

    _headers = ['id', 'Title', 'Body', 'Actions'];
    const post: IPost = {
        id: 1,
        userId: 1,
        body: 'This is the body of the post',
        title: 'this is the title of the post',
        actions: [
            { id: '1', color: 'blue', onClick: () => { console.log(1) }, children: "Remove", loading: false, _key: '2' },
        ],
    }
    _items = [post]

    return <CustomTable headers={_headers} items={_items} itemsLoading={loading} />

}

export default PostsList