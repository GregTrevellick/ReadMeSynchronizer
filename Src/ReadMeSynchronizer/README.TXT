PreRequisite:
=============

Having created the repo in GitHub, add to...

a) appveyor (see below)
b) bettercodehub (quick)
c) codacy (slower but more depth)
d) codefactor (sweet)
e) sonar (see below)



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






AppVeyor
========
AppVeyor generates a unique encryption key for every account.
“Secure” variables means you can safely put them into appveyor.yml that is visible to others. 
You need to use their secret key to decrypt secure variables which only happens on their build agents during a branch build.
https://ci.appveyor.com/tools/encrypt
	Enter c......................................a as "Value to encrypt" > "Encrypt" > AppVeyor displays token to use in place of real value (i.e. 94Py9ytqrmqFVtmUiyayJJ4Hgg2vjF1+YuRJldGGWO82/9zEens+sCjeh7wzc2Le)
Then edit the repo's appveyor.yml as follows:
	environment:
    	my_encrypted_sonarqube_token:
        	secure: 94Py9ytqrmqFVtmUiyayJJ4Hgg2vjF1+YuRJldGGWO82/9zEens+sCjeh7wzc2Le                  --publicly safe
	before_build:
		/d:"sonar.login=$env:my_encrypted_sonarqube_token" 






Sonar
=====
1) Add project 
2) Provide a token > switch to Use ExistingToken > c......................................a
3) Run analysis on your project > Specify primary lingo but no need to download or copy anything as the appveyor.yml file doesn't need editing
Note: No 'Save' or 'Submit' button - because it gets setup/defined by AppVeyor which invokes Sonar
