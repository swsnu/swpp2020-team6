/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from "react";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import { red } from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import HighlightIcon from "@material-ui/icons/Highlight";

import "./SimpleRoadmap.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const useChipStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const RecipeReviewCard = (props) => {
  const {
    roadmapId,
    roadmapTitle,
    roadmapImageId,
    roadmapLevel,
    authorName,
    likeCount,
    pinCount,
    commentCount,
    authorPictureUrl,
    isMyPage,
    tagList,
    date,
    authorId,
    history,
  } = props;

  const classes = useStyles();
  const chipClasses = useChipStyles();

  const tagDisplay = tagList.map((tag) => {
    return <Chip label={tag.tag_name} />;
  });

  const headerDisplay = isMyPage ? (
    <CardHeader title={date} />
  ) : (
    <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          {authorName.charAt(0)}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings" onClick={() => history.push(`/mypage/${authorId}`)}>
          <ArrowForwardRoundedIcon />
        </IconButton>
      }
      title={authorName}
      subheader={date}
    />
  );

  const roadmapImageSrc = require(`misc/${roadmapImageId}.png`);

  let roadmapLevelIcon;
  if (roadmapLevel === 2) {
    roadmapLevelIcon = (
      <Chip
        id="intermediate-chip"
        icon={<HighlightIcon id="intermediate-icon" />}
        label="Intermediate"
      />
    );
  } else if (roadmapLevel === 3) {
    roadmapLevelIcon = (
      <Chip id="advanced-chip" icon={<OfflineBoltIcon id="advanced-icon" />} label="Advanced" />
    );
  } else {
    roadmapLevelIcon = (
      <Chip id="basic-chip" icon={<ChildCareIcon id="basic-icon" />} label="Basic" />
    );
  }

  return (
    <Card className={classes.root} onClick={() => history.push(`/roadmap/${roadmapId}`)}>
      <CardMedia className={classes.media} image={roadmapImageSrc} title={roadmapTitle} />
      {headerDisplay}
      <CardContent>
        <div className={chipClasses.root}>
          {roadmapLevelIcon}
          {tagDisplay}
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" size="medium">
          <FavoriteBorderIcon />
          <p id="like-count">{likeCount}</p>
        </IconButton>
        <IconButton aria-label="pin" size="medium">
          <BookmarkBorderIcon />
          <p id="pin-count">{pinCount}</p>
        </IconButton>
        <IconButton aria-label="comment" size="medium">
          <ChatOutlinedIcon />
          <p id="comment-count">{commentCount}</p>
        </IconButton>
      </CardActions>
    </Card>
  );
};

RecipeReviewCard.propTypes = {
  authorId: PropTypes.number.isRequired,
  roadmapId: PropTypes.number.isRequired,
  roadmapTitle: PropTypes.string.isRequired,
  roadmapLevel: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  pinCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  authorPictureUrl: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any),
  isMyPage: PropTypes.bool.isRequired,
  roadmapImageId: PropTypes.string,
};

export default withRouter(RecipeReviewCard);
