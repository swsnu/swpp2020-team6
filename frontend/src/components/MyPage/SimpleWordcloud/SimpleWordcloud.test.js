import React from "react";
import { mount, shallow } from "enzyme";
import SimpleWordcloud from "./SimpleWordcloud";

const stubMyPageUserData = {
  user_id: 1,
  username: "test",
  email: "user@user.com",
  user_picture_url: "",
  my_roadmaps: [
    {
      id: 1,
      private: false,
      image_id: 1,
      title: "test",
      date: "2020-11-20 02:45:00",
      level: 2,
      description: "test",
      like_count: 0,
      comment_count: 1,
      pin_count: 1,
      progress: 1,
      original_author: 1,
      author_id: 1,
      author_name: "test",
      author_user_picture_url: "",
      tags: [
        {
          tag_id: 4,
          tag_name: "test",
        },
        {
          tag_id: 5,
          tag_name: "test",
        },
        {
          tag_id: 6,
          tag_name: "test",
        },
      ],
    },
    {
      id: 2,
      private: false,
      image_id: 1,
      title: "test2",
      date: "2020-11-20 02:54:29",
      level: 2,
      description: "",
      like_count: 0,
      comment_count: 0,
      pin_count: 0,
      progress: 1,
      original_author: 1,
      author_id: 1,
      author_name: "test",
      author_user_picture_url: "",
      tags: [],
    },
  ],
};

jest.mock("react-wordcloud", () => () => <mock-cloud />);

describe("wordcloud", () => {
  it("should render without errors", () => {
    const component = mount(<SimpleWordcloud myPageUser={stubMyPageUserData} />);
  });
});
