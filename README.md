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

## How does it work?
1. When you opens extension first time, it redirects to Todoist page in order to authorize extension in Todoist.
2. You have to authorize application (required permissions are only to read data - don't worry about writing anything to your account).
3. After authorizing, click in extension icon one more time - you project list will be downloaded from Todoist.
4. Choose what project you want to open at every Chrome startup.
5. Don't forget to do anything :)

## Installation
1. Download the zip or clone the repository. If you downloaded the zip - unpack it.
2. In Chrome menu choose "More tools" -> "Extensions".
3. In Extensions tab check "Developer mode".
4. Click "Load unpacked extension" and choose directory where you stored the files (this directory where manifest.json lies).
5. Follow the "How does it work?" section steps.
