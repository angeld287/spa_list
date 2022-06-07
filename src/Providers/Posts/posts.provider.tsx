import React, { createContext, useState, ReactNode, FC, useEffect } from "react";
import IPost from "../../Interfaces/IPosts";

interface IPostContext {
    items: IPost[]
    removeItem: Function;
}

interface IPostProvider {
    children: ReactNode
}

const PostContext = createContext<IPostContext | null>(null);


const PostProvider: FC<IPostProvider> = ({ children }) => {
    const [_items, setItems] = useState<IPost[]>([]);

    useEffect(() => {
        let post: IPost = {
            id: 1,
            userId: 1,
            body: 'This is the body of the post',
            title: 'this is the title of the post',
            actions: [
                { id: '1', color: 'blue', onClick: () => { console.log(1) }, children: "Remove", loading: false, _key: '2' },
            ],
        }

        let posts: IPost[] = [];
        posts.push(post)
        setItems(posts)
    }, [])

    const _removeItem = (id: number) => {
        let result: boolean = false, bedit: IPost;

        try {
            bedit = _items.find((_: IPost) => _.id === id)!;
            let new_items: IPost[] = utilRemoveItem(_items, bedit)!
            setItems(new_items);
            result = true
        } catch (e) {
            console.log(e);
            result = false;
        }

        return result;
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
        removeItem: _removeItem
    }} >{children}</PostContext.Provider>)
};

export default PostProvider;