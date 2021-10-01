https://obscuredc.github.io/ivy/rootkit
# ivy
it is a weird terminal emulator thing. if you look in the code theres a really simple api structure to it :>

### plans
for now, just add more commands. if you want a new command, open a issue and tell me about it.
I will accept pull requests for useful features.

### versions
##### versions types
ghostkit/rootkit: ghostkit is going to be more advanced, compared to user friendly rootkit. ghostkit will be released later.
##### versions numbers
* 100-199: alpha release versions
* 200-299: stable
* 300+: stable + many features
##### versions format
"ivy:\[ghost/root\]kit.xyz"
<br>where xyz is the versions numbers.

### games/applications
you can build something on top of ivy. here is a minifed example of a guess the number game: (run command inside of ivy using `exe as cpy`)
```
directjs~var gue=Math.floor(101*Math.random())+"";Commands.newNum=new Command("guess:newnum",(function(e){gue=Math.floor(101*Math.random())+"",pmessage("made new number","special","guess/newnum")}),"create a new number"),Commands.newNum.aC(),Commands.guessNum=new Command("guess:guessnum",(function(e){e==gue?pmessage("correct","alert","guess/guessnum"):pmessage("wrong","alert","guess/guessnum")}),"guess the number"),Commands.guessNum.aC(),Commands.getNum=new Command("guess:getnum",(function(e){pmessage(`num is &rarr;${gue}`,"normal","guess/getnum")})),Commands.getNum.aC();
```
