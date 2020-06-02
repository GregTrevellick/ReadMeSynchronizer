PreRequisites:
==============
Having created the repo in GitHub, add to...
 a) appveyor (see below - this will also add to sonar (see below))
 b) bettercodehub
 c) codebeat (no C# support, hence limited number of repos, see settings tab for id)
 d) codacy (slower but more depth)
 e) codefactor
 f) codescene (max 5 repos)
 g) lgtm (Project Lists, enter full github repo url, click 'Follow')
 h) enable github actions to build the .sln
 todo) https://codecov.io



New Repos:
==========
1) Add to RepoNames.ts
2) Add repo to Repos.ts (one entry for OpenInAppLauncher & VsixTwitterWidget but with sub-properties)
    Primarily need the following:
     (a) appVeyorId (see webhook url in general tab)
     (b) codacyId
3) Add repo to RepoMetaDatas.ts (towards the bottom, one entry for entire repo, no sub-properties for OpenInAppLauncher & VsixTwitterWidget)  
4) Check any badge exclusions for the repo to \App\Markdown\BadgeExclusions.ts
5) Run Gulp task to Update_Markdown_Badges
6) Commit/Push the AllBadges repo & check the new item on GitHub
7) Commit/Push the ReadMeSynchronizer repo & the new repo with its updated ReadMe file



AppVeyor
========
AppVeyor generates a unique encryption key for every account. 
“Secure” variables means you can safely put them into appveyor.yml that is visible to others. 
You need to use their secret key to decrypt secure variables which only happens on their build agents during a branch build.
https://ci.appveyor.com/tools/encrypt
   Enter c......................................a as "Value to encrypt" > "Encrypt" > AppVeyor displays token to use in place of real value (94Py...)
Edit the appveyor.yml as follows:
	environment:
    	my_encrypted_sonarqube_token:
        	#secure: 94Py9ytqrmqFVtmUiyayJJ4Hgg2vjF1+YuRJldGGWO82/9zEens+sCjeh7wzc2Le                  #publicly safe
            secure: auSP7uJIC8Y5I0AW97f0ANIOLXxkszux38+nFJhry4PFvH1MBd1xfBFMcA30a8Z9                  #publicly safe
	before_build:
        - dotnet tool install -g dotnet-sonarscanner
        - dotnet sonarscanner begin /key:"AzureDevOpsBlazorRadiator" /d:"sonar.host.url=https://sonarcloud.io" /d:"sonar.login=%my_encrypted_sonarqube_token%" /o:"gregtrevellick-github"
    after_build:
        - dotnet sonarscanner end /d:"sonar.login=%my_encrypted_sonarqube_token%"

Sonar
=====
1) Log into sonarcloud.io using github
   Click 'Analyze New Project' plus button top right corner
   Scroll to the bottom and click 'Create manually' (this isn't recommended but is what we want because option 2 below fails for C#)
   For project key enter same value as in appveyor.yml (i.e. "AzureDevOpsBlazorRadiator" not "GregTrevellick_AzureDevOpsBlazorRadiator")
   Click "set up" button to initialise the project
   You then see a choice of 3 buttons (travis / other / manual) - don't bother clicking these (our next commit will trigger the sonar analysis)
   This will create https://sonarcloud.io/dashboard?id=AzureDevOpsBlazorRadiator 
*** AND ***
2) [Feb 2020 - Blazor Radiator - does not analyze C# yet]
    Log into sonarcloud.io using github
    Click 'Analyze New Project' plus button top right corner
    Pick from the Greg Trevellick organization - this will create https://sonarcloud.io/dashboard?id=GregTrevellick_AzureDevOpsBlazorRadiator (as opposed to the URLs above without "GregTrevellick_")
    You'll see 5 buttons - one big for Sonar auto-analysis and 4 smaller (e.g. Travis), so just click the big auto-button, this simply tells you to create an empty file in your repo called ".sonarcloud.properties"
Note: We set up both but only use badges from the first one in ReadMe.MD as this is the only one that covers C#