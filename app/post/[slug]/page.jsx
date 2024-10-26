"use client";

import { useEffect, useState } from 'react';

import { Author, Categories, Comments, CommentsForm, Loader, PostDetail, PostWidget } from '@/components';
import { getPostDetails } from '@/services';
import { AdjacentPosts } from '@/sections';

const PostDetails = ({ params }) => {  
    const [post, setPost] = useState(null);
    
    useEffect(() => {
        getPostDetails(params.slug).then((result) => {
            setPost(result);
        });
    }, [params.slug]);
    
    return (
        <>
            <div className='container mx-auto px-10 mb-8'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                    <div className='col-span-1 lg:col-span-8'>
                        <PostDetail post={post} />
                        <Author author={post?.author} />
                        <AdjacentPosts slug={post?.slug} createdAt={post?.createdAt} />
                        <CommentsForm slug={post?.slug} />
                        <Comments slug={post?.slug}/>
                    </div>
                    <div className='col-span-1 lg:col-span-4'>
                        <div className='relative lg:sticky top-8'>
                            <PostWidget slug={post?.slug} category={post?.category?.map((category) => category.slug)} />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetails;