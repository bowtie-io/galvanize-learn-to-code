---
layout: default
title:  Learn-To-Code-Week-3
subtitle:  Use BowTie to host and extend your Rock, Paper, Scissors app.
permalink: /readme/
exclude_from_nav: true
---

# learn-to-code-week-3
During this workshop, we'll take the Rock Paper Scissors app you made in week 2 and turn it into a hosted MVP that your friends can play!

We'll use frameworks to extend the application, and use BowTie for git version control, hosting, and Javascript storage.

To get started you'll need to complete these steps:

1. Sign up for a free account on BowTie
2. Set up your dev environment and install the BowTie client using our [Getting Started instructions](https://bowtie.io/docs/#quick-start). We've also got some tips and tricks for you [here](https://dev.bowtie.io/galvanizeopensource/).
3. Have completed the Learn To Code curriculum from Week 2. If you haven't, [go take a look](https://github.com/GalvanizeOpenSource/Learn-To-Code-Week-2)!

If you are doing this work at home and have any questions, please contact [Chad Person](chad@bowtie.io).


### What we'll cover

- What's an MVP?
- Putting it Online
- Extending/Improving with frameworks


### What's an MVP

Your rockPaperScissors.js is very a basic, but functional game. With a few more steps that game can become a true MVP (minimum viable product). What does that mean? Using our example: Games need players or they just sit on the shelf. So, we're going to put a little polish on your game and put it in the world to see how _actual_ players will respond to it. We can then take that feedback to further improve the game and make it more fun (useful) for even more players.

This 'validation' process is essential for any game, or product. The sooner we can validate our ideas, the sooner we can stabilize development and sit back and witness the value we have created for all the happy players. The most basic functional version of the game that will inspire our players to see the 'value' is our MVP.

For our MVP we'll focus on building a couple new features in our rockPaperScissors.js, then polish up the design and host the application with _the least amount of work possible_. This is the 'M' in MVP. Be minimal, work smart, and use frameworks to save time.

We'll use [jquery](http://jquery.com/) and [Bootstrap](http://getbootstrap.com/) to extend our application. And, since we are building a static application, we'll host it on [BowTie](https://bowtie.io) and use some of the pre-baked components and templates to improve our design. We'll also use the included [Jekyll](http://jekyllrb.com/) framework to generate HTML pages, so we can focus on our core app.

_Note: I'd originally wanted to present Angular, but we won't be doing so in the interest of time_

###1. Set up your Repo

We're going to use BowTie to host and deploy our files. They provide zero-config push-to-deploy git repos with some added features that will extend the application.

1. After setting up an account, we can build a project. Click the 'Add Project' button and give your repo a name. I'm calling mine 'Roshambo'. Now choose a template. I'm using the 'Pitch Page' template bc I know it will work well for this example. Hit 'Build Project' and your repo will be created.

2. Clone your project using the `git clone` url on the dashboard.

3. Install the BowTie client (if you want to work locally), and run `bowtie serve` to prewie your files OR just open your files and get to work! Your site is already live, so you can `git push` to update it see your changes.

###1. Add your application!

If you started with the Pitch Page template, let's drop in your application. We'll use 'index.html' for the homepage/intro, and paste the complete code from Week 2 on the 'app.html' page.


#### Question:
How can we clean up our app structure?

_Answer:_
Let's move the javascript to a `js/rockPaperScissors.js` and include a reference on the app page using `<script type="text/javascript" src="/js/rockPaperScissors.js"></script>!

This let's us separate functions in the js from the display on app.html

###1. Clean up and extend the App

#### Reduce Complexity

At the end of lesson two we were given a number of feature requests including addressing the player by name, and removing the compare function so that the game will play as soon as a choice is entered.

I'd like to simplify the MVP further. We're going to remove the play prompt on load, remove the manual compare function, and eliminate the prompt to capture a users name each time. Instead, we'll stor the name as a universal value, and pass it to BowTie so are user can return again and again.

##### Create a Play Function

First, let's set the game to play based on a button click. First, create a 'play' function that wraps the entire game just before the creation of 'var userChoice' and close it after the outcomes:

`function play(){`

Now, grab a button from the template or make one that we can use to execute our play function. My button uses bootstrap classes because they are native to BowTie. I'm also adding '#play' and '.play' for future targeting.

`<button id="play" class="btn btn-success btn-lg play" onclick="play()">Start!</button>`

##### Remove Compare

Now, we can remove the compare function so the outcome is shown immediately. Remove:

`var compare = function(userChoice, computerChoice) {`

 and the closing tag for the function. Then, reverse indent the code for readability. We can aslo remove the compare button.

##### Store the Name

In week 2 we created a prompt to grab the users name `var name = prompt("What's your name?");` and passed the name into the outcome alerts `window.alert("scissors wins" + name + "!");`

Let's simplify game play by asking the user to add their name just once. We're going to do this in two parts: 1. Set a universal variable, 2. Store that value in a bowtie.user.profile object so our user can access or update it indefinitely.

Set a variable outside the play function:

`var profileName`

Now, we'll want to store the value given with BowTie. We do that with simple function outside the play function:

    $(function(){
      bowtie.user.profile(function(profile){
        profileName = profile.name || "";
        // update the elements on the page
        updateUI();
      });

I'm also adding an 'updateUI' function that we can use to update elements on the page, and including a binding to it:

    function updateUI(){
      $("#profile_name").val(profileName);
    }

Now, we can create a fixed input to grab the name. Long term, this could be captured in a registration step or as part of a user profile page. In this MVP, we will locate the input on the page with the play button.

```
$("#profile_name").on("change", function(){
  profileName = $('#profile_name').val();
  // Store the name in the Bowtie User Profile - separate function
  bowtie.user.profile({
    name: profileName,
  }, function(){
    alert("saved");
  })
});
```

Notice I'm targeting the #profile_name ID. I'm going to grab a simple input form from a component (inlcudes/profil-form.html) and hook it to my event. I'm also using Bootstrap for the layout classes:

```
<div class='form-group'>
  <div id="profile" class="user-profile text-left">
    <div class='form-group'>
      <div class="input">
        <label class="text">
          <i class="fa fa-user"></i>Your Name
        </label>
        <input aria-required="true" class="string text form-control" id="profile_name" maxlength="255" name="profile[name]" placeholder="Jane Smith"  size="255" type="text" />
      </div>
    </div>
    </form>
    <br />
  </div>
</div>
```

Finally, let's use our new `profileName` variable in the gameplay, included as we had before:

```window.alert("The result is a tie " + profileName + "!");```


Now, when a visitor adds their name, we will save it to a profile, display it on the page, and can access it in the game! Cool!


###1. Add A Scoreboard!

The next thing I'd like to add is a basic score board. We need to define a few new variables, count the plays and outcomes, and can use the same storage option to make the scores accessible after today's gameplay. We'll also need an easy way to present the scores.


##### Step 1
Since we've included bootstrap with BowTie, we can go out and find a component that will work as a scoreboard. I like the [list group badge](http://getbootstrap.com/components/#list-group-badges). Paste is on the page and add a few classes to target with our javascript. I'm going to set the ID to scoreboard and create a badge for Wins, and a second badge for Plays.

{% highlight html %}
```
<ul id="scoreboard" class="list-group">
  <li class="list-group-item text-info active text-center">
    Scoreboard</li>
  <li class="list-group-item">
    <span class="plays badge"></span>
    Plays
  </li>
  <li class="list-group-item">
    <span class="wins badge"></span>
    Wins!
  </li>
</ul>
```
{% endhighlight %}

##### Step 2 - Setup up the variables

Let's setup some variables within our loop to grab the play count and win count, then pass them to the scoreboard. Bonus: we can store your play count and win count with Bowtie js and add it to your user profile.

Add them as universal variables like we did with the name. 'playCount' is my total plays, 'userWinCount' will count my successful outcomes:

    var profileName,
        playCount = 0,
        userWinCount = 0;

##### Step 3 - count the things

We'll count the total plays ~line 18 after

`playCount += 1;`

Now, we need to count the outcomes by adding `userWinCount += 1;` after each _winning_ outcome:

```
if (userChoice  === computerChoice) {
      window.alert("The result is a tie " + profileName + "!");
  } else if(userChoice ==="rock") {
    if (computerChoice==="scissors") {
        // add win counts based on the outcomes
        userWinCount += 1;
        window.alert("Rock Wins "  + profileName + "!");
  } else {
        window.alert("Paper Wins");
      }
  }
  ```


##### Step 4 - Storage and Updates

Finally, we will use the bowtie.user.profile method _within the play function_ to store our play and win counts in the BowTie user profile:


// store the scores in bowtie
bowtie.user.profile({
  playCount: playCount,
  userWinCount: userWinCount
});
// update the elements on the page
updateUI();

_Note: I'm adding the bind to updateUI_ Now, we can use the updateUI function to to target where on the page we want to update the scores (our scoreboard):

```
function updateUI(){
  $("#profile_name").val(profileName);
  $("#scoreboard span.wins").text(userWinCount);
  $("#scoreboard span.plays").text(playCount);
}
```

Finally, we want to retrieve the scores from the bowtie profile for future sessions. We do this by calling userWinCount and playCount from the existing profile. _Note: We need to use 'parseInt' to identify the value as an integer when retrieved.

```
$(function(){
  bowtie.user.profile(function(profile){
    userWinCount = parseInt(profile.userWinCount || 0);
    playCount = parseInt(profile.playCount || 0);
    profileName = profile.name || "";
    // update the elements on the page
    updateUI();

  });
```

###1. Make the game sticky

The very last feature we will add is related to presentation only. I want to make the game sticky by asking a player who has already played once to 'Play Again?'

**Question** Where should the function go?

Answer: That's right - the updateUI function.

Since we are now tracking play counts we can determine if the playCount is greater than 0, and if so, use a little jquery to swap our Play button text as shown here:

```
if(playCount > 0){
  // show a play again button after playing once
  $("#play").text("Play Again?");
}
```


###1. Style Your App!

Now that we have a nearly complete MVP, let's try to quickly clean up the design and use some of the existing UI components to make the app super cool:

BowTie builds pages with the Jekyll static site generator. Jekyll compiles HTML paritals into static pages when you build the site. Since BowTie builds on push, we can make our changes, then push to build/deploy.

`index.html` includes two partials we can modify, and a few pieces of 'front matter' - which are variables accessible in the build.

```
{% include nav/nav-bootstrap.html %}
{% include sections/hero.html %}
```

```
bannerimg:  /img/yourimg.png
exclude_from_nav: true
```

To add a bit of unique flair to your site - swap out the bannerimg, explore the 'hero' section include, modify your nav, and replace the `/img/logo.png` file used in the example.

Wow! Now we are getting somewhere!

You can see my example site at [learntocode.bowtied.io](https://learntocode.bowtied.io/)
Download the source on [github](http://github.com/bowtie-io/learntocode)



### [MIT Licensed](LICENSE)
