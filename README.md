# Todoist-at-startup

Simple Google Chrome extension that opens [Todoist.com](https://todoist.com) selected project at Chrome startup.

## What is Todoist?

Todoist is a very nice, easy to work with, multiplatform application, which enables [getting things done](https://en.wikipedia.org/wiki/Getting_Things_Done).
Todoist allows to create projects, which de facto are task lists.

## Purpose of this extension

Very often I have to do some things as soon as I start my computer.
As Todoist allows creating tasks on Android (very good application), I place this kind of tasks into single project.
Unfortunatelly, usually I used to forget about opening Todoist and check what I had to do.
But Todoist publishes REST API (authorized by OAuth2), so I decided to write simple Chrome extension which opens my dedicated Todoist project at Chrome startup.

There are people, who rarely shut down theirs computers (therefore don't quit Chrome). This extension handles such a case by opening Chrome at 3.00 AM every day as well.

## How does it work?
0. When you open extension for the first time, it redirects to Todoist page in order to authorize extension in Todoist.
0. You have to authorize application (required permissions are only to read data - don't be afraid about writing anything to your account).
0. After authorizing, click in extension icon one more time - your project list will be downloaded from Todoist.
0. Choose what project you want to open at every Chrome startup.
0. Don't forget to do anything :)

## Installation
0. Download the zip or clone the repository. If you downloaded the zip - unpack it.
0. In Chrome menu choose "More tools" -> "Extensions".
0. In Extensions tab check "Developer mode".
0. Click "Load unpacked extension" and choose directory where you stored the files (this directory where manifest.json lies).
0. Follow the "How does it work?" section steps.
