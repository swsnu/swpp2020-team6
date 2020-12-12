import React from "react";
import { mount } from "enzyme";
import SimpleRoadmap from "./SimpleRoadmap";
import { history } from "../../store/store";

describe("<SimpleRoadmap />", () => {
  it("should render my basic level without errors", () => {
    const component = mount(
      <SimpleRoadmap
        roadmapDescription="roadmapDescription"
        roadmapId={1}
        roadmapTitle="roadmapTitle"
        roadmapLevel={1}
        authorName="authorName"
        date="date"
        likeCount={1}
        pinCount={1}
        commentCount={0}
        tagList={["tag1", "tag2"]}
        isMyPage
        roadmapImageId="1"
        isPrivate={false}
      />,
    );

    const cardWrapper = component.find(".MuiPaper-root");
    expect(cardWrapper.length).toBe(1);

    const roadmapTitle = component.find(".roadmap-title");
    expect(roadmapTitle.length).toBe(1);
    expect(roadmapTitle.at(0).text()).toBe("roadmapTitle");

    const avatar = component.find(".MuiAvatar-root");
    expect(avatar.length).toBe(0);

    const lockIcon = component.find("#lock-icon");
    expect(lockIcon.length).toBe(0);
  });

  it("should render my intermediate level without errors", () => {
    const component = mount(
      <SimpleRoadmap
        roadmapDescription="roadmapDescription"
        roadmapId={1}
        roadmapTitle="roadmapTitle"
        roadmapLevel={2}
        authorName="authorName"
        date="date"
        likeCount={1}
        pinCount={1}
        commentCount={0}
        tagList={["tag1", "tag2"]}
        isMyPage
        roadmapImageId="1"
        isPrivate
      />,
    );

    const cardWrapper = component.find(".MuiPaper-root");
    const lockIcon = component.find("#lock-icon");
    expect(cardWrapper.length).toBe(1);
    expect(lockIcon.length).toBeGreaterThan(0);
  });

  it("should render my advanced level without errors", () => {
    const component = mount(
      <SimpleRoadmap
        roadmapDescription="roadmapDescription"
        roadmapId={1}
        roadmapTitle="roadmapTitle"
        roadmapLevel={3}
        authorName="authorName"
        date="date"
        likeCount={1}
        pinCount={1}
        commentCount={0}
        tagList={["tag1", "tag2"]}
        isMyPage
        roadmapImageId="1"
        isPrivate={false}
      />,
    );

    const cardWrapper = component.find(".MuiPaper-root");
    expect(cardWrapper.length).toBe(1);
  });

  it("should render other's basic level without errors", () => {
    const component = mount(
      <SimpleRoadmap
        roadmapDescription="roadmapDescription"
        roadmapId={1}
        roadmapTitle="roadmapTitle"
        roadmapLevel={1}
        authorName="authorName"
        date="date"
        likeCount={1}
        pinCount={1}
        commentCount={0}
        tagList={["tag1", "tag2"]}
        isMyPage={false}
        roadmapImageId="1"
        isPrivate={false}
      />,
    );

    const cardWrapper = component.find(".MuiPaper-root");
    expect(cardWrapper.length).toBe(1);

    const roadmapTitle = component.find(".roadmap-title");
    expect(roadmapTitle.length).toBe(1);
    expect(roadmapTitle.at(0).text()).toBe("roadmapTitle");

    const avatar = component.find(".MuiAvatar-root");
    expect(avatar.length).toBe(1);
  });

  it("should render other's intermediate level without errors", () => {
    const component = mount(
      <SimpleRoadmap
        roadmapDescription="roadmapDescription"
        roadmapId={1}
        roadmapTitle="roadmapTitle"
        roadmapLevel={2}
        authorName="authorName"
        date="date"
        likeCount={1}
        pinCount={1}
        commentCount={0}
        tagList={["tag1", "tag2"]}
        isMyPage={false}
        roadmapImageId="1"
        isPrivate={false}
      />,
    );

    const cardWrapper = component.find(".MuiPaper-root");
    expect(cardWrapper.length).toBe(1);
  });

  it("should render other's advanced level without errors", () => {
    const component = mount(
      <SimpleRoadmap
        roadmapDescription="roadmapDescription"
        roadmapId={1}
        roadmapTitle="roadmapTitle"
        roadmapLevel={3}
        authorName="authorName"
        date="date"
        likeCount={1}
        pinCount={1}
        commentCount={0}
        tagList={["tag1", "tag2"]}
        isMyPage={false}
        roadmapImageId="1"
        isPrivate={false}
      />,
    );

    const cardWrapper = component.find(".MuiPaper-root");
    expect(cardWrapper.length).toBe(1);
  });

  /* --------- Test page redirection --------- */
  it("should redirect to detail page without error", () => {
    const component = mount(
      <SimpleRoadmap
        onClick={() => history.push(`/roadmap/1`)}
        roadmapDescription="roadmapDescription"
        roadmapId={1}
        roadmapTitle="roadmapTitle"
        roadmapLevel={2}
        authorName="authorName"
        date="date"
        likeCount={1}
        pinCount={1}
        commentCount={0}
        tagList={["tag1", "tag2"]}
        isMyPage
        roadmapImageId="1"
        isPrivate={false}
      />,
    );

    const spyPush = jest.spyOn(history, "push").mockImplementation(() => {});

    const cardWrapper = component.find(".MuiPaper-root.MuiPaper-rounded.MuiPaper-elevation1");
    expect(cardWrapper.length).toBe(1);
    cardWrapper.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
  });

  /* --------- Test tag generation --------- */
  it("should only generate 3 tags", () => {
    const component = mount(
      <SimpleRoadmap
        onClick={() => history.push(`/roadmap/1`)}
        roadmapDescription="roadmapDescription"
        roadmapId={1}
        roadmapTitle="roadmapTitle"
        roadmapLevel={2}
        authorName="authorName"
        date="date"
        likeCount={1}
        pinCount={1}
        commentCount={0}
        tagList={["tag1", "tag2", "tag3", "tag4"]}
        isMyPage
        roadmapImageId="1"
        isPrivate={false}
      />,
    );

    const chipWrapper = component.find(".MuiChip-root.tag-chip");
    expect(chipWrapper.length).toBe(3);
  });
});
