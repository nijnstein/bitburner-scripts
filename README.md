# bitburner-scripts
###### Scripts to automate various parts of bitburner 

### Takeover 
###### Bruteforce a server

-bruteforces access to ports, then nukes it

-copies ``grow.ns`` to server and executes it with maxmem / 2 - 1 threads 
-copies ``weaken.ns`` to server and executes it on 1 thread

-installs backdoor 

-starts grow.ns x4 on Home against server
-starts weaken.ns on Home against server
-starts hacking server from Home


### HackNet Automation

``hacknet.ns`` => basic script to automate hacknet node upgrading and purchasing 

1 node delivers at given augmentations: 14K/node
1 node costs new: 300M 
1 Core costs 30M gives 800$

14 / 300M = 0.046
0.8 / 30 = 0.026   => not efficient to upgrade core > 12 when cost of node ~300M

!! script should check if upgrading is more expensive then adding a node by calculating cost/$/second and selecting the most efficient update
