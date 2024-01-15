import React,{useState} from "react";
import LikeIcon from "@assets/detailLike.svg"
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {colors} from "@styles/colorPalette";


const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    return (
        <Tooltip title={liked ? 'Unlike' : 'Like'} arrow>
            <IconButton onClick={handleLike} color={liked ? 'primary' : 'default'}>
                <FavoriteIcon style={{fontSize: 22}}/>
            </IconButton>
        </Tooltip>
    );
};

export default LikeButton;