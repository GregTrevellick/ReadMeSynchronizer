PreRequisite:
=============

Having created the repo in GitHub, add to...

a) appveyor 
b) bettercodehub 
c) codacy 
d) codefactor 
e) sonar 



New badges:
===========

1) Add repo to Repos.ts (one entry for OpenInAppLauncher & VsixTwitterWidget but with sub-properties)
    Primarily need thew following:
     (a) appVeyorId
     (b) codacyId

2) Add repo to RepoMetaDatas.ts (towards the bottom, one entrfy for entire repo, no sub-properties for OpenInAppLauncher & VsixTwitterWidget)
    
3) Run Gulp task to update markdown badges

4) Commit/Push the AllBadges repo & check the new item on GitHub

5) Commit/Push the ReadMeSynchronizer repo & the new repo with its updated ReadMe file

