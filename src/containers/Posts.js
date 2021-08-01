import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
});

const Posts = ({posts,loading}) => {
    const classes = useStyles();

    // download function
    // const downloadDocument = () => {
    // }

    if(loading){
        return <h2 className="text-center">Loading...</h2>
    }
        return(
            <>
                <Container maxWidth="md">
                    <Grid container spacing={5} alignItems="flex-end">
                        {posts.map((post) => {
                            return(
                                <Grid item key={post.id} xs={12} md={4}>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardMedia
                                            className={classes.media}
                                            image="imgurl"
                                            title="title name"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {post.name}
                                                </Typography>   
                                                <div className="d-flex flex-row">
                                                    <label>Departments:</label>                                                                                         
                                                    {post.filedep.map(dep=>(                                                    
                                                        <div className="boxdeps">
                                                            {dep.department},
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="d-flex flex-row hashtagdisplay">
                                                    <label>Hashtags:</label>                                                                                         
                                                    {post.filecat.map(cat=>(                                                    
                                                        <div className="boxdeps">
                                                            {cat.category},
                                                        </div>
                                                    ))}
                                                </div>                                                                                            
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                View
                                            </Button>
                                            <Link to="./media/documents/2.png" target="_blank" download className="button">
                                                Download
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </>
        );
};
export default Posts;