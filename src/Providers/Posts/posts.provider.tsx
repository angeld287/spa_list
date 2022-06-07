import React, { createContext, useState, ReactNode, FC, useEffect } from "react";
import IPost from "../../Interfaces/IPosts";
import swal from 'sweetalert';

interface IPostContext {
    items: IPost[];
    removeItem: Function;
    itemsLoading: boolean;
}

interface IPostProvider {
    children: ReactNode
}

export const PostContext = createContext<IPostContext>({
    items: [],
    removeItem: () => { },
    itemsLoading: false,
});

export const InitialStates = {
    id: 10000,
    userId: 1,
    body: 'This is the body of the post',
    title: 'this is the title of the post',
    actions: [
        { id: '1', color: 'blue', onClick: () => { console.log(1) }, children: "Remove", loading: false, _key: '2' },
    ],
}


const PostProvider: FC<IPostProvider> = ({ children }) => {
    const [_items, setItems] = useState<IPost[]>([]);
    const [itemsLoading, setItemsLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState("");


    useEffect(() => {
        let didCancel = false;
        setItemsLoading(true);
        const fetch = async () => {
            var result: any[] = [];
            var posts: IPost[] = [];

            try {
                result = await api('https://jsonplaceholder.typicode.com/posts')
                result.forEach((_: IPost) => {
                    posts.push({
                        id: _.id,
                        userId: _.userId,
                        body: _.body,
                        title: _.title,
                        actions: [
                            { id: _.id.toString(), color: 'blue', onClick: () => { _removeItem(_.id) }, children: "Remove", loading: (_.id.toString() === buttonLoading), _key: _.id.toString() },
                        ],
                    })
                })
            } catch (e) {
                console.log(e)
            }
            if (!didCancel) {
                setItems(posts.sort((a, b) => {
                    return a.id - b.id;
                }))
                setItemsLoading(false);
            }
        };
        fetch();
        return () => {
            didCancel = true;
            setItemsLoading(false);
        };

    }, [])

    const _removeItem = (id: number) => {
        swal({ title: "Are you sure you want to delete the post?", icon: "warning", dangerMode: true })
            .then(async (willDelete) => {
                if (willDelete) {

                    let itms: IPost[] = [..._items];

                    let itm: IPost = itms.find((_: IPost) => _.id === id)!;
                    itms = utilRemoveItem(itms, itm)!

                    setItems([...itms]);

                    swal({ title: "Delete Post", text: "Post Deleted.", icon: "success", timer: 2000 });

                } else {
                    swal({ title: "Delete Post", text: "Delete Post Canceled.", icon: "error", timer: 2000 });
                }
            });
    }

    function api(url: string) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
    }

    const utilRemoveItem = (items: IPost[], itemToRemove: IPost) => {
        const existingItem = items.findIndex(
            _item => _item.id === itemToRemove.id
        );
        if (existingItem !== -1) {
            return items.filter(_item => _item.id !== itemToRemove.id);
        }
    };

    return (<PostContext.Provider value={{
        items: _items,
        removeItem: _removeItem,
        itemsLoading
    }} >{children}</PostContext.Provider>)
};

export default PostProvider;