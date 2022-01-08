# bitburner-scripts
###### Scripts to automate various parts of bitburner 


### HackNet Automation

``hacknet.ns`` => basic script to automate hacknet node upgrading and purchasing 

1 node delivers at given augmentations: 14K/node
1 node costs new: 300M 
1 Core costs 30M gives 800$

14 / 300M = 0.046
0.8 / 30 = 0.026   => not efficient to upgrade core > 12 when cost of node ~300M

!! script should check if upgrading is more expensive then adding a node by calculating cost/$/second and selecting the most efficient update
