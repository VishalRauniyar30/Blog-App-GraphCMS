"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

import { Categories, PostCard, PostWidget } from "@/components";
import { getPosts } from "@/services";
import { FeaturedPosts } from "@/sections";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then((post) => {
            setPosts(post);
        });
    }, []);

    return (
        <div className="container mx-auto px-10 mb-8">
            <Head>
                <title>CMS Blog</title>
                <link rel="icon" href="/images/temp.jpg" />
            </Head>
            <FeaturedPosts />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    {posts.map((post, index) => (
                        <PostCard post={post.node} key={index} />
                    ))}
                </div>
                <div className="lg:col-span-4 col-span-1">
                    <div className="lg:sticky relative top-8">
                        <PostWidget />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};
