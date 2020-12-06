/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
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

const useTagChipStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    "& > *": {
      margin: theme.spacing(0.5),
      width: "80px",
    },
  },
}));

const useLevelChipStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const SimpleRoadmap = (props) => {
  const {
    roadmapTitle,
    roadmapImageId,
    roadmapLevel,
    authorName,
    likeCount,
    pinCount,
    commentCount,
    roadmapDescription,
    isMyPage,
    tagList,
    date,
    onClick,
  } = props;

  const classes = useStyles();
  const tagChipClasses = useTagChipStyles();
  const levelChipClasses = useLevelChipStyles();

  const tagDisplay = tagList.map((tag, tagIndex) => {
    if (tagIndex < 3) {
      return <Chip className="tag-chip" key={tag.tag_id} label={tag.tag_name} />;
    }
    return null;
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
      title={authorName}
      subheader={date}
    />
  );

  const roadmapImageSrc = require(`../../misc/roadmap/${roadmapImageId}.png`);
  debugger;

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
    <div className="SimpleRoadmap">
      <Card className={classes.root} onClick={onClick}>
        <div className="card-wrapper">
          <div className="image-wrapper">
            <CardMedia className={classes.media} image={roadmapImageSrc} title={roadmapTitle} />
            <div className="overlay-title">
              <div className="roadmap-title">{roadmapTitle}</div>
            </div>
          </div>
          {headerDisplay}
          <CardContent>
            <div className={levelChipClasses.root}>{roadmapLevelIcon}</div>
          </CardContent>
          <CardContent>
            <div className={tagChipClasses.root}>{tagDisplay}</div>
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
          <div className="overlay-description">
            <div className="roadmap-description">{roadmapDescription}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

SimpleRoadmap.propTypes = {
  onClick: PropTypes.func.isRequired,
  roadmapTitle: PropTypes.string.isRequired,
  roadmapDescription: PropTypes.string.isRequired,
  roadmapLevel: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  pinCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.any).isRequired,
  isMyPage: PropTypes.bool.isRequired,
  roadmapImageId: PropTypes.number,
};

export default SimpleRoadmap;
