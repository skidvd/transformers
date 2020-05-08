# Transformers - The Transformation Company

## Solution Abstract

If you are not familiar with the assignment, you may wish to review it below [problem definition](https://github.com/skidvd/transformers#transformers-problem-definition).

The assignment specifically requests that a *web application* be built to play the game.  The specifications, 
rules and logic of the game play may easily be fulfilled within a Single Page Application (SPA) such is now and
has been common practice.  Yet, modern *web applications* often entail much more than that and are complex 
distributed systems relying on multiple platforms and often diverse technologies to collaborate as a cohesive unit
to fulfill their intended purposes.  Therefore, in order to stay somewhat true to this larger/more complex view, my
solution includes the following high-level architecture and components:

- An Angular 9 SPA that collects the user's input for the Transformers, organizes and orchestrates overall game play
- the Angular SPA uses NgRx to manage overall app and games state
- a single endpoint REST API is used between the Angular app and the Node backed to evaluate the outcome of individual 
Transformer battles
- A Node and Express based backend server is used to accept and respond to the battle REST API
- Once a war has been initiated, all battles are launched (based upon the order specified by the rules) and executed 
asynchronously and in parallel with each other.  Each individual battle's results are asynchronously updated and
reflected on the SPA until all have completed, and the war's outcome and results are displayed.
- After a war completes, for end-user efficiency, the SPA then presents the option to prepare for a 'Next War' that
that is initiated with all the Transformer information as configured from the previous war but also allows additional
additions, modifications and/or removals to that information as well.   

## Assumptions

I have made the following primary assumptions (some additional minor assumptions are documented only in the code):

- For better UX, any time that a Transformer **name** need to be compared, the comparison is performed in a case-insensitive manner
- For purposes of this exercise, it is sufficient to run both the UI and backend processes on the local machine.  Furthermore, this is the only manner in which this can presently be expected to work well
- For purposes of this exercise, the only browser that this was developed for and is supported on is Chrome; however, current and modern versions (as of this writing) may likely work - but they are not supported as they have not been tested/validated.
- For purposes of this exercise running with the development version/build is sufficient
- For purposes of this exercise, no security requirements are necessary: no SSL, authentication nor authorization are in place
- In the interest or readability and maximizing information, and as there are inconsistencies between the two ares in the instructions regarding output; I have not strictly followed the requested output format (I am including all of the requested information plus a bit more in a slightly different format).  I am hopeful that this is both acceptable and beneficial to the end user experience.      
- My development and testing has been on a Unix box and this is therefore, all that is presently supported.  However, there are no known limitations that would preclude operation on a Windows platform - this is officially unsupported though.
- While I typically do not like lingering console log stmts nor commented out src lines (that are not intentional comments) in committed code, I have left a few in this baseline that have been useful throughout development/debugging and/or that may be useful in the future (one such example is that the backend will log each non-special rule battles high-level result to the console as well as return it to the UI). 

## How to install, build and run

1. Prerequisites
    ```
   - You will need to have npm installed (I have a rather old version 6.14.4 presently)
   - You will need a current version of node installed (I have v12.16.3)
   - You will need to have yarn installed (I have version 1.21.1 presently)
   - You will need to have cloned this repository
   - You will need to have localhost ports 4000 and 4200 available and unused
    ```
2. Backend/Server
    ```
   - cd into <repository-dir>/backend 
   - npm install
   - npm start
    ```
3. UI
    ``` 
   - cd into <repository-dir>/frontend
   - yarn install
   - yarn start
    ```
4. Access the UI (http://localhost:4200/)
    ```
   - When the above have all completed and there are no errors, navigate in Chrome to (http://localhost:4200/) 
   - Follow the onscreen instructions and prompts to define your Transformers, run the battles/wars and review the results 
    ```   

## Transformers problem definition
Aequilibrium does love transforming... people, lives, teams, companies. And there’s no better
representation of transformation than Hasbro’s Transformers, the classic television series featuring
heroic Autobots raging their battle to destroy the evil forces of the Deceptions.

Please watch this video:
https://www.youtube.com/watch?v=nLS2N9mHWaw

Build a web application for the following:

The Transformers are at war and you are in charge of settling the score! You’re to evaluate who wins a
fight between the Autobots and the Decepticons. Here are the rules.

Each Transformer has the following criteria on their tech spec (see
http://www.ntfa.net/ntfa/techspecs/index.php?cat=Gen1&group=DeceptPZ&char=Predaking for an
example):
- Strength
- Intelligence
- Speed
- Endurance
- Rank
- Courage
- Firepower
- Skill

All of these criteria are ranked from 1 to 10.

The “overall rating” of a Transformer is the following formula:
(Strength + Intelligence + Speed + Endurance + Firepower)

Each Transformer must either be an Autobot or a Deception.

Your program should take input that describes a group of Transformers and based on that group
displays:
* a. The number of battles
* b. The winning team
* c. The surviving members of the losing team

The basic rules of the battle are:
- The teams should be sorted by rank and faced off one on one against each other in order to
determine a victor, the loser is eliminated
- A battle between opponents uses the following rules:
    - If any fighter is down 4 or more points of courage and 3 or more points of strength
compared to their opponent, the opponent automatically wins the face-off regardless of
overall rating (opponent has ran away)
    - Otherwise, if one of the fighters is 3 or more points of skill above their opponent, they win
the fight regardless of overall rating
    - The winner is the Transformer with the highest overall rating
- In the event of a tie, both Transformers are considered destroyed
- Any Transformers who don’t have a fight are skipped (i.e. if it’s a team of 2 vs. a team of 1, there’s
only going to be one battle)
- The team who eliminated the largest number of the opposing team is the winner

####Special rules:
- Any Transformer named Optimus Prime or Predaking wins his fight automatically regardless of
any other criteria
- In the event either of the above face each other (or a duplicate of each other), the game
immediately ends with all competitors destroyed

For example, given the following input:
```
Soundwave, D, 8,9,2,6,7,5,6,10
Bluestreak, A, 6,6,7,9,5,2,9,7
Hubcap: A, 4,4,4,4,4,4,4,4
```

The output should be:
```
1 battle
Winning team (Decepticons): Soundwave
Survivors from the losing team (Autobots): Hubcap
```
