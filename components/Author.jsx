const Author = ({ author }) => {
    return (
        <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20'>
            <div className='absolute left-1/2 transform -translate-x-1/2 -top-14'>
                <img 
                    alt={author?.name || 'temp'}
                    src={author?.photo.url || '/images/temp.jpg'}
                    className='align-middle rounded-full'
                    height={100}
                    width={100}
                />
            </div>
            <h3 className='text-white my-4 text-xl font-bold'>{author?.name}</h3>
            <p className='text-white text-lg'>{author?.bio}</p>
        </div>
    );
};

export default Author;