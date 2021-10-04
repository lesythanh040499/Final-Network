import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import ImageGrid from 'react-fb-image-grid';
import Photogrid from 'react-facebook-photo-grid';
import Box from '@material-ui/core/Box';
import { useState } from 'react';


function PostBodyHome({ post }) {
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <CardContent style={{ padding: '0 16px' }}>
        {post.content.length > 60 && (
          <Typography color="textSecondary" variant="subtitle1" onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Hide content' : 'Read more'}
          </Typography>
        )}
        <Box>
          <Photogrid
            images={post.images.map((img) => img.url)} //required
          ></Photogrid>
        </Box>
      </CardContent>
    </>
  );
}

export default PostBodyHome;