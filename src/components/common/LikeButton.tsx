import React, { useEffect, useState } from 'react'
import LikeIcon from "@assets/detailLike.svg"
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {colors} from "@styles/colorPalette";
import { getLiked, joinDislikes, joinLikes } from '@remote/like'


const LikeButton = ({homeSer}:({homeSer:string})) => {
    const [liked, setLiked] = useState(false);
    const [cifNo, setCifNo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
        let uid = localStorage.getItem("uid") || ""
        console.log("LikeButton", homeSer+", "+uid)
        if(uid!==undefined&&uid!==""){
          setCifNo(uid)
          const isLiked = async () => {
            const liked = await getLiked(homeSer, uid)
            console.log(JSON.stringify(liked))
            if(liked!==undefined) setLiked(true)
            else setLiked(false)
          }
          isLiked()
        }
    }
    }, [homeSer])


    const handleLike = async () => {
        if(!liked){
          const data = await joinLikes({
            "cifNo": cifNo,
            "homeSer": homeSer
          })
          console.log(cifNo+", "+homeSer+": "+JSON.stringify(data))
        }else {
          const data2 = await joinDislikes({
            "cifNo": cifNo,
            "homeSer": homeSer
          })
          console.log(cifNo+", "+homeSer+": "+JSON.stringify(data2))
        }
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