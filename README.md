# bitburner-scripts
###### Scripts to automate various parts of bitburner 

While basic, these are easy to understand and get you started. 

### Takeover 
###### Bruteforce a server

-bruteforces access to ports, then nukes it

-copies ``grow.ns`` to server and executes it with maxmem / 2 - 1 threads 

-copies ``weaken.ns`` to server and executes it on 1 thread

-installs backdoor 

-starts grow.ns x4 on Home against server

-starts weaken.ns on Home against server

-starts hacking server from Home


### Worm

- iterates through all reachable hosts with scan
- if not hacked yet, it will take over host
- uses takeover.script 
- start with: run worm.ns
- -> very basic!

### HackNet Automation

**Please start 4 nodes before running this script: **

``hacknet.ns`` => basic script to automate hacknet node upgrading and purchasing 

1 node delivers at given augmentations: 14K/node
1 node costs new: 300M 
1 Core costs 30M gives 800$

14 / 300M = 0.046
0.8 / 30 = 0.026   => not efficient to upgrade core > 12 when cost of node ~300M

!! script should check if upgrading is more expensive then adding a node by calculating cost/$/second and selecting the most efficient update


### Stock Automation

Just make sure you have $$$$ and run stock.js
