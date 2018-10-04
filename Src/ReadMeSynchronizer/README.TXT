Add...
	https://github.com/GregTrevellick/HelloWorldBlazor
	https://github.com/GregTrevellick/Gregt.sidewafflev2
	https://github.com/GregTrevellick/HelloWorldTypescriptParcel
	https://github.com/GregTrevellick/MiscellaneousArtefacts
	https://github.com/GregTrevellick/HelloWorldTypescriptWebpack
	https://github.com/GregTrevellick/HelloWorldVstsExtension
	https://github.com/GregTrevellick/HelloWorldVsixToolBar
	https://github.com/GregTrevellick/HelloWorldVsixPopUp
	https://github.com/GregTrevellick/HelloWorldVsixToolWindowAsyncPackageExample
	https://github.com/GregTrevellick/HelloWorldWpfAsyncBindingPropertyExample
	https://github.com/GregTrevellick/AngularBasic
	https://github.com/GregTrevellick/VsixDotNetCorePoc
	https://github.com/GregTrevellick/Menees.VsTools.2017
	https://github.com/GregTrevellick/BrowserExtensionUsingAngularWorksInChromeNotInEdge
	https://github.com/GregTrevellick/More
	https://github.com/GregTrevellick/RenameProjectVsExtension
	https://github.com/GregTrevellick/OpenCoverExample
	https://github.com/GregTrevellick/awib




PreRequisites:
==============
Having created the repo in GitHub, add to...
 a) appveyor (see below - this will also add to sonar (see below))
 b) bettercodehub (quick)
 c) codacy (slower but more depth)
 d) codefactor (sweet)

New badges:
===========
1) Add repo to Repos.ts (one entry for OpenInAppLauncher & VsixTwitterWidget but with sub-properties)
    Primarily need the following:
     (a) appVeyorId
     (b) codacyId
2) Add repo to RepoMetaDatas.ts (towards the bottom, one entry for entire repo, no sub-properties for OpenInAppLauncher & VsixTwitterWidget)  
3) Run Gulp task to update markdown badges
4) Commit/Push the AllBadges repo & check the new item on GitHub
5) Commit/Push the ReadMeSynchronizer repo & the new repo with its updated ReadMe file

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
1) Add project, that's all. We don't need a 'Save'/'Submit' button because it gets setup/defined by AppVeyor which invokes Sonar analysis.
  Note: 
    This fails:
     https://sonarcloud.io/dashboard?id=GregTrevellick_VsixBlazorMinimalProjectTemplate
     https://sonarcloud.io/component_measures?id=GregTrevellick_VsixBlazorMinimalProjectTemplate
    This works:
     https://sonarcloud.io/dashboard?id=VsixBlazorMinimalProjectTemplate
     https://sonarcloud.io/component_measures?id=VsixBlazorMinimalProjectTemplate

