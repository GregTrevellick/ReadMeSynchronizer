PreRequisites:
==============
Having created the repo in GitHub, add to...
 a) appveyor (see below - this will also add to sonar (see below))
 b) bettercodehub
 c) codebeat (no C# support, hence limited number of repos, see settings tab for id)
 d) codacy (slower but more depth)
 e) codefactor
 f) lgtm
 todo) https://codecov.io



New Repos:
==========
0) Add to RepoNames.ts
1) Add repo to Repos.ts (one entry for OpenInAppLauncher & VsixTwitterWidget but with sub-properties)
    Primarily need the following:
     (a) appVeyorId (see webhook url in general tab)
     (b) codacyId
2) Add repo to RepoMetaDatas.ts (towards the bottom, one entry for entire repo, no sub-properties for OpenInAppLauncher & VsixTwitterWidget)  
3) Check any badge exclusions for the repo to \App\Markdown\BadgeExclusions.ts
4) Run Gulp task to Update_Markdown_Badges
5) Commit/Push the AllBadges repo & check the new item on GitHub
6) Commit/Push the ReadMeSynchronizer repo & the new repo with its updated ReadMe file



AppVeyor
========
AppVeyor generates a unique encryption key for every account. “Secure” variables means you can safely put them into appveyor.yml that is visible to others. You need to use their secret key to decrypt secure variables which only happens on their build agents during a branch build.
https://ci.appveyor.com/tools/encrypt
	Enter c......................................a as "Value to encrypt" > "Encrypt" > AppVeyor displays token to use in place of real value (94Py...)
Edit the appveyor.yml as follows:
	environment:
    	my_encrypted_sonarqube_token:
        	secure: 94Py9ytqrmqFVtmUiyayJJ4Hgg2vjF1+YuRJldGGWO82/9zEens+sCjeh7wzc2Le                  --publicly safe
	before_build:
		/d:"sonar.login=$env:my_encrypted_sonarqube_token" 



Sonar
=====
1A) Add project, that's all. We don't need a 'Save'/'Submit' button because it gets setup/defined by AppVeyor which invokes Sonar analysis.
  Note: 
    This fails:
     https://sonarcloud.io/dashboard?id=GregTrevellick_VsixBlazorMinimalProjectTemplate
     https://sonarcloud.io/component_measures?id=GregTrevellick_VsixBlazorMinimalProjectTemplate
    This works:
     https://sonarcloud.io/dashboard?id=VsixBlazorMinimalProjectTemplate
     https://sonarcloud.io/component_measures?id=VsixBlazorMinimalProjectTemplate

*** OR ***

1B) [Feb 2020 - Blazor Radiator]
    Log into sonarcloud.io using github
    Click 'Analyze New Project' plus button top right corner
    Pick from the Greg Trevellick organization - this will create https://sonarcloud.io/dashboard?id=GregTrevellick_AzureDevOpsBlazorRadiator (as opposed to the URLs above without "GregTrevellick_")
    You'll see 5 buttons - one big for Sonar auto-analysis and 4 smaller (e.g. Travis), so just click the big auto-button, this simply tells you to create an empty file in your repo called ".sonarcloud.properties"
     