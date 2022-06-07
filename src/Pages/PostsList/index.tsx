import { EditOutlined } from '@ant-design/icons';
import { FC, useContext, useEffect, useMemo, useState } from 'react'
import CustomTable from '../../Components/CustomTable';
import IPost from '../../Interfaces/IPosts';
import { InitialStates, PostContext } from '../../Providers/Posts/posts.provider';

const PostsList: FC = () => {
    const [loading, setLoading] = useState(false)

    const { items } = useContext(PostContext);

    let _headers: string[] = []

    _headers = ['id', 'Title', 'Body', 'Actions'];

    return <CustomTable headers={_headers} items={items} itemsLoading={loading} />

}

export default PostsList