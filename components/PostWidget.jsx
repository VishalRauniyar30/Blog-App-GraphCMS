"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";

import { getRecentPosts, getSimilarPosts } from "@/services";
import { Loader } from ".";

const PostWidget = ({ category, slug }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if(slug) {
            getSimilarPosts(category, slug).then((result) => {
                setRelatedPosts(result);
                setDataLoaded(true);
            });
        } else {
            getRecentPosts().then((result) => {
                setRelatedPosts(result);
                setDataLoaded(true);
            });
        }
        
    }, [slug]);

    if(!dataLoaded) {
        return <Loader />;
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPosts.map((post, index) => (
                <div key={index} className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none">
                        <img
                            alt={post.title || 'temp'}
                            className="align-middle rounded-full"
                            src={post.featuredImage.url || '/images/temp.jpg'}
                            height={60}
                            width={60}
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-extralight">
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link href={`/post/${post.slug}`} className="text-base" key={index}>{post.title}</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostWidget;