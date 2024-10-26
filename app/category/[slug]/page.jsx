"use client";

import { useEffect, useState } from 'react';

import { getCategoryPost } from '@/services';
import { Categories, PostCard } from '@/components';

const CategoryPost = ({ params }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getCategoryPost(params.slug).then((result) => {
            setPosts(result);
        })
    }, []);

    if(!posts.length) {
        return <h1 className='flex justify-center items-center text-yellow-400 font-bold text-4xl'>No Posts Available Under This Category</h1>
    }    

    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                <div className='col-span-1 lg:col-span-8'>
                    {posts.map((post,index) => (
                        <PostCard key={index} post={post.node} />
                    ))}
                </div>
                <div className='col-span-1 lg:col-span-4'>
                    <div className='relative lg:sticky top-8'>
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPost;