# Requirements and Specification

- 2020/10/17, ver 1.0

<img width="162" alt="image-20201017112613558" src="https://user-images.githubusercontent.com/35529999/96331725-9c67fa00-109a-11eb-8449-833b23963313.png">

##### Document Revision History

> ver 1.00  2020-10-17 : initial version



## Project Abstract

***Rotus*** is a web service that helps people to **create a Roadmap**. Users can organize the studying materials in clear order by creating a Roadmap of straight-forward design. This becomes important when people try to study areas that change quickly or do not have a generalized order of studying. A typical example would be web programming like this course itself. 

Rotus allows users to create and edit Roadmaps, search for Roadmaps, add comments and likes, keep track of the progress for each Roadmaps, and much more! It even recommends Roadmaps that the user might want. Our goal is to make people **create, share** and find Roadmaps that fit the level and time budget of each user. Since planning plays a crucial role in the goal achieving process, we believe that Rotus will significantly function in many domains in the future.



## Customer

Rotus is for all who want to learn and achieve their goals.

Specifically, Rotus works best for those

- *who are looking for study roadmaps that fits their level and time budget.*
- *who are having trouble finding effective ways to learn something.*
- *who wants to learn something that does not have a standard method to learn.*
- *who wants to keep up with fast-changing fields.*
- *who wants to organize the process of studying and share it with others.*



## Competitive Landscape

![competitive landscape](https://user-images.githubusercontent.com/35529999/96331726-a38f0800-109a-11eb-8444-22ace93aac0e.JPG)



## User Stories

#### Case 1. Sign up

- Scenario
  1. The user is on the *Home* page.

  2. The user clicks the “Sign Up” button.
     - The user is redirected to the *Sign Up* page.

  3. The user fills out all required fields and clicks the “Sign Up” button.
     - Required fields: Email, Username, Password, Password confirm.
     - The user account is created, and an alert shows “Your account is successfully created!”.

  4. The user clicks the “OK” button on the alert.
     - The user is redirected to the *Home* page, signed in as their new account.

```python
Acceptance Test
		GIVEN the user filled up all the required fields (Email: ‘swpp@snu.ac.kr’, Username: ‘swpp’, Password: ‘iluvswpp’, Password confirm: ‘iluvswpp’)
confirm)
    WHEN the user clicks the “Sign Up” button
		THEN the alert “Your account is successfully created!” is shown

Exceptions
    The user does not fill out all required fields to sign up.
		The user types the input in the wrong format.
		The user types Email or Username that already exists.
```



#### Case 2. Sign in

- Scenario

  1. The user is on the *Home* page.

  2. The user clicks the “Sign In” button.
     - The user is redirected to the *Sign In* page.

  3. The user fills out Email and password and clicks the “Sign In” button.
     - The user is signed in.
     - The user is redirected to the *Home* page, signed in as their account.

  4. The user clicks the “OK” button on the alert.
     - The user is redirected to the *Home* page, signed in as their new account.

```python
Acceptance Test
    GIVEN the user filled up the Email ‘swpp@snu.ac.kr’ and password ‘iluvswpp’
		WHEN the user clicks the “Sign In” button
		THEN the user is signed in and redirected to the Home page.

Exceptions
    The user does not fill out all required fields to sign in.
    The user types the wrong Email or password.
```



#### Case 3. Edit profile

- Scenario

  1. The user is on the *MyPage* page.

  2. The user clicks the “Edit Profile” tab on the *MyPage* page.
     - The user can see the profile section to edit.

  3. The user edits profile image and password and clicks the “Confirm” button.
     - The user profile is updated.
     - The user is redirected to *MyPage* page.

```python
Acceptance Test
    GIVEN the user edited profile image to ‘default_image1.png’ and password to ‘ihatebugs’
    WHEN the user clicks the “Confirm” button
    THEN the profile is updated and the user is redirected to MyPage page.

Exceptions
		The Image file is in the wrong format.
```



#### Case 4. Create roadmap  (sprint 2)

- Scenario

  1. The user is on the *Home* page.

  2. The user clicks the “Create Roadmap” button.
     - The user is redirected to the *RoadmapCreate* page.

  3. The user can set a title and tags for the new Roadmap by typing inputs, and also set difficulty by clicking checkboxes.
  4. The user can create sections and nodes for the Roadmap.
     - When the user clicks the “New Section” button, the user can create a separate section for the Roadmap that can contain multiple nodes.
     - When the user clicks the “New Node” button, the user can create a single node that contains the type(i.e. books, websites, Rotus Roadmap, etc.), URL, and description of the study material.

  5. The user clicks the “Confirm Node” button.
     - A new node is created and saved for the Roadmap.
  6. The user fills out all the required inputs and clicks the “Create Roadmap” button.
     - A new Roadmap is created.
     - The user is redirected to the *RoadmapDetail* page of the new Roadmap.

```python
Acceptance Test
    WHEN the user clicks the “New Section” button
    THEN the user can create a separate section for the Roadmap

    WHEN the user clicks the “New Node” button
    THEN the user can create a single node for the section

    GIVEN the user has filled out the information for the node (Title: ‘Python tutorial’, Type: ‘Video’, Link: ‘https://www.youtube.com/watch?v=rfscVS0vtbw’, Tag: ‘Python’, Description: ‘Basic Python tutorial for beginners’)
    WHEN the user clicks “Confirm Node” button
    THEN a new node is created and saved for the Roadmap 

    GIVEN the user has filled out the Roadmap information (Title: “Basic programming skills”, Level: “Basic”, Tags: “Python”) and created sections with proper nodes
    WHEN the user clicks “Create Roadmap” button
    THEN a new Roadmap is created

Exceptions
    The user is not signed in.
    The user does not set a title, tag, difficulty for the Roadmap.
    The user does not fill out essential fields for creating a node.
    The user tries to create a Roadmap with an empty section.
```



#### Case 5. Delete roadmap

- Scenario

  1. The user on the *RoadmapDetail* page.

  2. The user is the author of the Roadmap.
  3. The user clicks the “Delete Roadmap” button.
     - The “Delete Roadmap” button only appears to the author of the Roadmap.
     - The user sees an alert “Do you want to delete this Roadmap?”.

  4. The user clicks the “OK” button on the alert.
     - The Roadmap is deleted from the Roadmap List in the *MyPage* page and the database.
     - The user is redirected to the *MyPage* page.

```python
Acceptance Test
    GIVEN the user is the author of the Roadmap
    WHEN the user clicks the “Delete Roadmap” button
    THEN the Roadmap is deleted from the Roadmap list and the database.
    
Exceptions
    None.
```



#### Case 6. Edit roadmap

- Scenario

  1. The user is on the *RoadmapDetail* page.

  2. The user is the author of the roadmap.
  3. The user clicks the “Edit Roadmap” button.
     - The “Edit Roadmap” button only appears to the author of the Roadmap.
     - The user is redirected to the *RoadmapEdit* page.
       - On the *RoadmapEdit* page, the user can see a similar view as the *RoadmapCreate* page, but all the contents from the original Roadmap are already filled in.

  4. The user edits the Roadmap.
  5. The user clicks the “Confirm Edit” button.
     - The Roadmap is updated to the edited version.
     - The user is redirected to the *RoadmapDetail* page of the edited Roadmap.

```python
Acceptance Test
    GIVEN the user has edited the Roadmap without any empty contents or input fields
    WHEN the user clicks “Confirm Edit” button
    THEN the Roadmap is updated to the edited version
    
Exceptions
    The user is not signed in.
    The user does not set a title, tag, difficulty for the Roadmap.
    The user does not fill out essential fields for a node.
    The user tries to confirm a Roadmap with an empty section.
```



#### Case 7. Duplicate roadmap

- Feature: Duplicate roadmap

- Scenario

  1. The user is on the *RoadmapDetail* page.

  2. The user could be either the author of the Roadmap or not.
  3. The user clicks the “Duplicate” button.
     - The user sees an alert “Do you want to duplicate this Roadmap to My Roadmap?”.

  4. The user clicks the “OK” button on the alert.
     - The Roadmap is copied to the list in MyRoadmap.
     - The user sees an alert “Duplicated Successfully!”.
  5. The user can see the duplicated Roadmap in the MyRoadmap tab in the *MyPage* page.

```python
Acceptance Test
    WHEN the user clicks the “Duplicate” button
    THEN the user sees an alert “Do you want to duplicate this Roadmap to My Roadmap?”.
    
Exceptions
    The user is not signed in.
```



#### Case 8. Advanced Search from *Home* page

- Scenario

  1. The user is on the *Home* page.

  2. The user clicks the “Advanced Search” button in the “Search” bar.

     - It displays the “Advanced Search Option” box under the “Search” bar. In the “Advanced Search Option” box are:

         - Keyword Matching option: Title, Tag, Title & Tag 

       - Filtering option: Beginner, Intermediate, Advanced
       - Sorting option: New, Duplicates, Pins, Likes

  3. The user checks the search option checkboxes.

  4. The user fills out the input field of the “Search” bar with some keywords.
  5. The user clicks the “Search” button.
     - The user is redirected to the *SearchResult* page, and it displays the matching Roadmap list and the “Advanced Search Option” box on the left side.

```python
Acceptance Test
    GIVEN the user is on the Home page,
    WHEN the user clicks the “Advanced Search” button in the “Search” bar,
    THEN it displays the “Advanced Search Option” box under the “Search” bar.

		GIVEN the user has selected the “Title” checkbox in the “Keyword Matching” option, the “Beginner” checkbox in the “Filtering” option, and “New” checkbox in “Sorting” option, and filled out the input field of “Search” bar with ‘Python’,
		WHEN the user clicks “Search” button,
		THEN the user is redirected to the SearchResult page, and it displays the matching Roadmap list in the middle and “Advanced Search Option” box on the left side.    

Exceptions
    The user leaves the input field of “Search” bar empty
```



#### Case 9. Search from the top bar

- Scenario

  1. The user is on any page except *Sign Up* or *Sign In* page.

  2. The user has filled out the input field of the “Search” bar in the top bar of the page.
  3. The user clicks the “Search” button.
     - The user is redirected to the *SearchResult* page, and it displays the matching Roadmap list and “Advanced Search Option” box. The search options are set by default to “Title & Tag”, “Beginner”, and “New”.
  4. The user changes the search options in the “Advanced Search Option” box on the left side.

  5. The user clicks the “Search” button.
     - The advanced search on the former input keywords is done according to the changed options.

```python
Acceptance Test
    GIVEN the user on any page except Sign Up or Sign In page has put ‘JavaScript’ in the input field of the “Search” bar in the top bar of the page,
    WHEN the user clicks the “Search” button,
    THEN the user is redirected to the SearchResult page, and it displays the matching Roadmap list and the “Advanced Search Option” box with the search options set by default to “Title & Tag”, “Beginner”, and “New”.

    GIVEN the user has changed the search options in the“Advanced Search Option” box to “Title”, “Advanced”, and “Pins”,
    WHEN the user clicks the “Search” button,
    THEN the advanced search on the former input keywords is done according to the changed options.
    
Exceptions
    The user leaves the input field of the “Search” bar empty.
```



#### Case 10. Display Roadmap lists on *Home* page

- Scenario
  1. The user clicks “Rotus” image in the top bar.
     - The user is redirected to the *Home* page, and three lists of Roadmaps are displayed on *Home* Page:
       - Best Roadmaps
       - New Roadmaps
       - Recommended (only for signed-in users)
     - The user clicks the thumbnail image of a Roadmap.
       - The user is redirected to the *RoadmapDetail* page of the selected Roadmap.

```python
Acceptance Test
    GIVEN the user is signed in,
    WHEN the user clicks “Rotus” image in the top bar, 
    THEN the user is redirected to the Home page and it displays Best, New, and Recommended Roadmaps.

    GIVEN the user is not signed in,
    WHEN the user clicks “Rotus” image in the top bar, 
    THEN the user is redirected to the Home page and it displays Best and New Roadmaps.
    
Exceptions
		No Roadmap data in database.
```



#### Case 11. Pin & Unpin a Roadmap

- Scenario

  1. The signed-in user is on the *RoadmapDetail* page of an unpinned Roadmap.
  2. The user clicks the “Pin” button.
     - An alert “Pinned successfully!” pops up.
     - The color of the “Pin” button changes and the number on the button increases by 1.

  3. The user clicks the “MyPage” button on the top bar.
     - The user is redirected to the *MyPage* page and the newly pinned Roadmap is added in the “Pinned Roadmaps” tab.

  4. The user clicks the thumbnail image of a pinned Roadmap.
     - The user is redirected to its *RoadmapDetail* page.
  5. The user clicks the “Pin” button on the *RoadmapDetail* page of a pinned Roadmap.
     - The color of the button returns and the number on the button decreases by 1.
  6. The user clicks the *MyPage* button on the top bar.
     - The user is redirected to the *MyPage* page and the unpinned Roadmap is removed from the “Pinned Roadmaps” tab.

```python
Acceptance Test
    GIVEN the user has signed in and on the RoadmapDetail page of an unpinned Roadmap,
    WHEN the user clicks the “Pin” button,
    THEN the color of the “Pin” button changes, the number on the button increases by 1, and the Roadmap is added in the “Pinned Roadmaps” tab in the MyPage page.

    GIVEN the Roadmap has been pinned,
    WHEN the user clicks the “Pin” button,
    THEN the color of the “Pin” button returns, the number on the button decreases by 1, and the Roadmap is removed from the “Pinned Roadmaps” tab on the MyPage page.
    
Exceptions
		The user has not signed in.
```



#### Case 12. Like & Unlike a Roadmap

- Scenario

  1. The signed-in user is on the *RoadmapDetail* page of an unliked Roadmap.
  2. The user clicks the “Like” button.
     - The color of the “Like” button changes and the number on the button increases by 1.

  3. The user clicks the “Like” button.
     - The color of the “Like” button returns and the number on the button decreases by 1.

```python
Acceptance Test
    GIVEN the user has signed in and is on the RoadmapDetail page of an unliked Roadmap,
    WHEN the user clicks the “Like” button,
    THEN the color of the “Like” button changes, and the number on the button increases by 1.
    GIVEN the Roadmap has been liked,
    WHEN the user clicks the “Like” button,
    THEN the color of the “Like” button returns, and the number on the button decreases by 1.
    
Exceptions
		The user has not signed in.
```



#### Case 13. Start & Quit studying progress on My Roadmap

- Scenario

  1. The signed-in user is on the *RoadmapDetail* page of one of “My Roadmaps” that has not been started.
  2. The user clicks the “Start” button.
     - The “Finished” checkbox in each Node is displayed and the “Start” button changes to “Quit” button.
     - The “Progress Status” bar appears and shows how much work has been done according to the number of checked the “Finished” checkboxes. 
     - Next to the bar appears a text ‘In-progress’.

  3. The user clicks the “Quit” button.
  4. The “Progress Status” bar and the “Finished” checkboxes are removed, and the “Quit” button returns to the “Start” button.

```python
Acceptance Test
    GIVEN the user has signed in and is on the RoadmapDetail page of one of “My Roadmaps” that has not been started,
    WHEN the user clicks the “Start” button,
    THEN the “Progress Status” bar on top of the page and “Finished” checkbox in each Node are displayed, and the “Start” button changes to the “Quit” button.

    GIVEN the Roadmap has been started,
    WHEN the user clicks “Quit” button,
    THEN the “Progress Status” bar and “Finished” checkboxes are removed, and the “Quit” button changes to the “Start” button.
    
Exceptions
		The user has not signed in.
```



#### Case 14. Update studying progress on My Roadmap

- Scenario

  1. The signed-in user is on the *RoadmapDetail* page of one of “My Roadmaps” that has been started.
  2. The user clicks one of the “Finished” checkboxes.
     - The “Progress Status” bar is filled up.

  3. The user clicks all “Finished” checkboxes.
     - The“Progress Status” bar is full and a text ‘Finished’ appears next to it.
     - The “Quit” button changes to the “Clear” button.
  4. The user clicks the “Clear” button.
     - The “Progress Status” bar and the “Finished” checkboxes are removed.
     - The “Clear” button changes to the “Start” button.

```python
Acceptance Test
    GIVEN the user has signed in and on RoadmapDetail page of one of “My Roadmaps” that has been started,
    WHEN the user clicks the “Finished” checkbox of the first Node,
    THEN the “Progress Status” bar is filled up.

    WHEN the user clicks all “Finished” checkboxes,
    THEN the “Progress Status” bar is full, a text ‘Finished’ appears, and the “Quit” button changes to the “Clear” button.

    GIVEN the Roadmap has been finished,
    WHEN the user clicks “Clear” button,
    THEN the “Progress Status” bar and the “Finished” checkboxes are removed, and the “Clear” button changes to the “Start” button.
    
Exceptions
    The user has not signed in.
    The user has no My Roadmap.
```



#### Case 15. New comments on *RoadmapDetail* page

- Scenario
  1. The signed-in user is on the *RoadmapDetail* page.
  2. The user fills out the input field of the “New Comment” box and clicks the “Confirm” button
     - The new comment is added at the bottom of the comment list.

```python
Acceptance Test
    GIVEN the user has signed in and is on the RoadmapDetail page,
    WHEN the user fills out the input field of the “New Comment” box with ‘I like your Roadmap!’ and clicks the “Confirm” button,
    THEN the new comment is added.
    
Exceptions
    The user has not signed in.
    The user leaves the input field of the “New Comment” box empty.
```



#### Case 15. Edit comments on *RoadmapDetail* page

- Scenario

  1. The signed-in user is on the *RoadmapDetail* page.
  2. The user clicks the “Edit” button next to the comment that the user wrote.
     - It displays the input field of the “Edit Comment” box and the “Confirm” button.

  3. The user fills out the input field and clicks the “Confirm” button.
     - The comment is updated.

```python
Acceptance Test
    GIVEN the user has signed in and is on the RoadmapDetail page,
    WHEN the user clicks the “Edit” button next to the comment that the user wrote,
    THEN  it displays the input field of the “Edit Comment” box and the “Confirm” button.

    GIVEN the user has filled out the input field with ‘Awesome Roadmap!’,
    WHEN the user clicks the “Confirm” button,
    THEN the comment is updated.
    
Exceptions
    The user has not signed in.
    The user has not commented on the RoadmapDetail page.
    The user leaves the input field of the “Edit Comment” box empty.
```





## User Interface Requirements

### Overall UI

<img width="938" alt="그림1" src="https://user-images.githubusercontent.com/35529999/96331731-ae499d00-109a-11eb-85cf-e09721f54eec.png">



### Major Flow

#### 1. Create Roadmap

![major flow  create](https://user-images.githubusercontent.com/35529999/96331736-b86b9b80-109a-11eb-90aa-94adc167c6bf.png)

![major flow  create-2917175](https://user-images.githubusercontent.com/35529999/96331739-bbff2280-109a-11eb-86d5-f5ffde37839b.png)




#### 2. Roadmap Detail

![major view  detail](https://user-images.githubusercontent.com/35529999/96331752-dc2ee180-109a-11eb-9649-64a6b8856089.png)

![major flow  detail](https://user-images.githubusercontent.com/35529999/96331754-df29d200-109a-11eb-8300-1aee3a315073.png)



#### 3. Edit Roadmap

![major flow  edit](https://user-images.githubusercontent.com/35529999/96331756-e5b84980-109a-11eb-96fe-4accc4a8972b.png)




