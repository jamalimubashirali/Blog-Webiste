import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import databaseService from '../appwrite/post.service';
import { Container } from '../components';

const PostPage = () => {
    const slug = useParams();
    const [post , setPost] = useState({});
    const [error, setError] = useState(true);

    useEffect(() => {
        ;(
            async () => {
                const postData = await databaseService.getPost({slug});
                if(postData) {
                    setPost(postData);
                    setError(false);
                }
            }
        )();
    } , []);

  return error ? (
    <div>
        <Container>
            <div>
                <h1>An Occured While fetching the post</h1>
            </div>
        </Container>
    </div>
  ) : (
    <div>
     <div>

     </div>
     <div>
        <Container>
            <div>
                <h1>
                    {post.title}
                </h1>
                <p>
                    {post.content}
                </p>
            </div>
        </Container>
     </div>
    </div>
  )
}

export default PostPage
